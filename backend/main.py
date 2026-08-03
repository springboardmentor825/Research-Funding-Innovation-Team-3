import os

import requests
from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from auth import create_access_token, hash_password, verify_password
from database import engine, get_db
from dependencies import get_current_user, require_role
from models import Base, ResearchProfile, User
from schemas import (
    ResearchProfileCreate,
    ResearchProfileResponse,
    Token,
    UserCreate,
    UserLogin,
    UserResponse,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Research Funding & Innovation Intelligence Platform",
    version="0.1.0",
    description="Milestone 1 API: secure accounts, research profiles, and research data discovery.",
)

allowed_origins = os.getenv(
    "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PATENTSVIEW_API_KEY = os.getenv("PATENTSVIEW_API_KEY")


@app.get("/")
def read_root():
    return {
        "status": "running",
        "service": "Research Funding & Innovation Intelligence Platform API",
        "docs": "/docs",
    }


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database unavailable")


@app.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == str(user.email).lower()).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    new_user = User(
        full_name=user.full_name.strip(),
        email=str(user.email).lower(),
        password_hash=hash_password(user.password),
        role=user.role.value,
        organization=user.organization.strip() if user.organization else None,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(credentials.email).lower()).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return {"access_token": create_access_token({"sub": str(user.id), "role": user.role})}


@app.get("/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user


@app.get("/admin/users", response_model=list[UserResponse])
def list_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("administrator")),
):
    return db.query(User).order_by(User.created_at.desc()).all()


@app.post("/profile", response_model=ResearchProfileResponse)
def create_or_update_profile(
    profile_data: ResearchProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(ResearchProfile).filter(ResearchProfile.user_id == current_user.id).first()
    values = profile_data.model_dump()

    if profile:
        for field, value in values.items():
            setattr(profile, field, value.strip() if isinstance(value, str) else value)
    else:
        profile = ResearchProfile(
            user_id=current_user.id,
            **{field: value.strip() if isinstance(value, str) else value for field, value in values.items()},
        )
        db.add(profile)

    db.commit()
    db.refresh(profile)
    return profile


@app.get("/profile", response_model=ResearchProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    profile = db.query(ResearchProfile).filter(ResearchProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Research profile not found. Create one first.")
    return profile


@app.delete("/profile", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_profile(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    profile = db.query(ResearchProfile).filter(ResearchProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Research profile not found")
    db.delete(profile)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/publications/search")
def search_publications(
    query: str = Query(min_length=2, max_length=200), limit: int = Query(default=10, ge=1, le=25)
):
    """Search the OpenAlex public scholarly dataset."""
    try:
        response = requests.get(
            "https://api.openalex.org/works",
            params={"search": query, "per-page": limit},
            timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="OpenAlex is unavailable. Please try again shortly.")

    results = [
        {
            "title": work.get("title"),
            "publication_year": work.get("publication_year"),
            "doi": work.get("doi"),
            "cited_by_count": work.get("cited_by_count", 0),
            "authors": [
                authorship.get("author", {}).get("display_name")
                for authorship in work.get("authorships", [])
                if authorship.get("author", {}).get("display_name")
            ],
        }
        for work in response.json().get("results", [])
    ]
    return {"source": "OpenAlex", "query": query, "count": len(results), "results": results}


@app.get("/patents/search")
def search_patents(
    query: str = Query(min_length=2, max_length=200), limit: int = Query(default=10, ge=1, le=25)
):
    """Search PatentsView when the project API key has been configured."""
    if not PATENTSVIEW_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="Patent search needs PATENTSVIEW_API_KEY in backend/.env. See .env.example.",
        )

    try:
        response = requests.get(
            "https://search.patentsview.org/api/v1/patent/",
            headers={"X-Api-Key": PATENTSVIEW_API_KEY},
            params={
                "q": f'{{"_text_any":{{"patent_title":"{query}"}}}}',
                "f": '["patent_id","patent_title","patent_date"]',
                "o": f'{{"size":{limit}}}',
            },
            timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="PatentsView is unavailable. Please try again shortly.")

    return {"source": "PatentsView", "query": query, "data": response.json()}
