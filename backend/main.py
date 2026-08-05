import requests
import os
from models import ResearchProfile
from schemas import ResearchProfileCreate, ResearchProfileResponse
from dependencies import get_current_user, require_role
from models import User
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, User
from schemas import UserCreate, UserLogin, UserResponse, Token
from auth import hash_password, verify_password, create_access_token

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Research Funding & Innovation Intelligence Platform")

VALID_ROLES = {"researcher", "startup_founder", "innovation_manager", "administrator"}

@app.get("/")
def read_root():
    return {"status": "Funding & Innovation Platform API is running"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user.role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail=f"Invalid role. Must be one of {VALID_ROLES}")

    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
        role=user.role,
        organization=user.organization,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {"access_token": token, "token_type": "bearer"}
@app.get("/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/admin/users", response_model=list[UserResponse])
def list_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("administrator")),
):
    return db.query(User).all()
@app.post("/profile", response_model=ResearchProfileResponse)
def create_or_update_profile(
    profile_data: ResearchProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = db.query(ResearchProfile).filter(ResearchProfile.user_id == current_user.id).first()

    if existing:
        for field, value in profile_data.dict().items():
            setattr(existing, field, value)
        db.commit()
        db.refresh(existing)
        return existing

    new_profile = ResearchProfile(user_id=current_user.id, **profile_data.dict())
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@app.get("/profile", response_model=ResearchProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(ResearchProfile).filter(ResearchProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Research profile not found. Create one first.")
    return profile
@app.get("/publications/search")
def search_publications(query: str, limit: int = 10):
    url = "https://api.openalex.org/works"
    params = {"search": query, "per-page": limit}
    response = requests.get(url, params=params, timeout=10)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch data from OpenAlex")

    data = response.json()
    results = []
    for work in data.get("results", []):
        results.append({
            "title": work.get("title"),
            "publication_year": work.get("publication_year"),
            "doi": work.get("doi"),
            "cited_by_count": work.get("cited_by_count"),
            "authors": [a["author"]["display_name"] for a in work.get("authorships", [])],
        })

    return {"query": query, "count": len(results), "results": results}
PATENTSVIEW_API_KEY = os.getenv("PATENTSVIEW_API_KEY")

@app.get("/patents/search")
def search_patents(query: str, limit: int = 10):
    if not PATENTSVIEW_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="Patent search not yet configured. Add PATENTSVIEW_API_KEY to .env once you receive it.",
        )

    url = "https://search.patentsview.org/api/v1/patent/"
    headers = {"X-Api-Key": PATENTSVIEW_API_KEY}
    params = {
        "q": f'{{"_text_any":{{"patent_title":"{query}"}}}}',
        "f": '["patent_id","patent_title","patent_date"]',
        "o": f'{{"size":{limit}}}',
    }
    response = requests.get(url, headers=headers, params=params, timeout=10)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Failed to fetch patent data: {response.text}")

    return response.json()


#added the research profile delte api


@app.delete("/profile")
def delete_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(ResearchProfile).filter(
        ResearchProfile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Research profile not found."
        )

    db.delete(profile)
    db.commit()

    return {"message": "Research profile deleted successfully."}   

    #to list all research profiles

@app.get("/profiles", response_model=list[ResearchProfileResponse])
def list_profiles(
    db: Session = Depends(get_db),
):
    return db.query(ResearchProfile).all()


#to search by research domain

@app.get("/profiles/domain/{domain}", response_model=list[ResearchProfileResponse])
def search_by_domain(
    domain: str,
    db: Session = Depends(get_db),
):
    profiles = db.query(ResearchProfile).filter(
        ResearchProfile.research_domains.ilike(f"%{domain}%")
    ).all()

    return profiles


# to search by keyword

@app.get("/profiles/keyword/{keyword}", response_model=list[ResearchProfileResponse])
def search_by_keyword(
    keyword: str,
    db: Session = Depends(get_db),
):
    profiles = db.query(ResearchProfile).filter(
        ResearchProfile.keywords.ilike(f"%{keyword}%")
    ).all()

    return profiles