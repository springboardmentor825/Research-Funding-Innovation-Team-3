from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRole(str, Enum):
    researcher = "researcher"
    startup_founder = "startup_founder"
    innovation_manager = "innovation_manager"
    administrator = "administrator"


class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: UserRole
    organization: Optional[str] = Field(default=None, max_length=200)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    organization: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ResearchProfileCreate(BaseModel):
    research_domains: Optional[str] = Field(default=None, max_length=2000)
    keywords: Optional[str] = Field(default=None, max_length=2000)
    publications: Optional[str] = Field(default=None, max_length=5000)
    patents: Optional[str] = Field(default=None, max_length=5000)
    technology_areas: Optional[str] = Field(default=None, max_length=2000)


class ResearchProfileResponse(ResearchProfileCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
