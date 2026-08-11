from pydantic import BaseModel, EmailStr
from typing import Literal

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal["Researcher", "Startup Founder", "Innovation Manager", "Administrator"] = "Researcher"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

from typing import List, Optional

class ResearchProfileCreate(BaseModel):
    research_domains: List[str] = []
    keywords: List[str] = []
    publications: List[str] = []
    patents: List[str] = []
    technology_areas: List[str] = []
    organization: Optional[str] = None

class ResearchProfileOut(ResearchProfileCreate):
    user_id: int
    email: str