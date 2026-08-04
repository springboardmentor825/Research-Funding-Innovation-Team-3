from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str
    organization: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    organization: Optional[str] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
class ResearchProfileCreate(BaseModel):
    research_domains: Optional[str] = None
    keywords: Optional[str] = None
    publications: Optional[str] = None
    patents: Optional[str] = None
    technology_areas: Optional[str] = None

class ResearchProfileResponse(BaseModel):
    id: int
    user_id: int
    research_domains: Optional[str] = None
    keywords: Optional[str] = None
    publications: Optional[str] = None
    patents: Optional[str] = None
    technology_areas: Optional[str] = None

    class Config:
        from_attributes = True