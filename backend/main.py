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