from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime, date

# User & Auth Schemas
class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = Field("researcher", pattern="^(researcher|startup_founder|innovation_manager|administrator)$")
    organization: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = "researcher"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    full_name: str
    email: str
    role: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Publication & Patent Schemas
class PublicationCreate(BaseModel):
    title: str
    authors: Optional[str] = None
    doi: Optional[str] = None
    journal_or_venue: Optional[str] = None
    publication_year: Optional[int] = None
    citation_count: int = 0
    external_source: str

class PublicationResponse(PublicationCreate):
    id: int
    fetched_at: datetime

    class Config:
        from_attributes = True

class PatentCreate(BaseModel):
    patent_number: str
    title: str
    assignee: Optional[str] = None
    filing_date: Optional[date] = None
    status: str = "Granted"
    external_source: str

class PatentResponse(PatentCreate):
    id: int
    fetched_at: datetime

    class Config:
        from_attributes = True

# Profile Schemas
class ProfileUpdate(BaseModel):
    title: Optional[str] = None
    bio: Optional[str] = None
    technology_areas: Optional[str] = None
    research_domains: Optional[List[str]] = None
    keywords: Optional[List[str]] = None

class ProfileResponse(BaseModel):
    id: int
    user_id: int
    title: Optional[str] = None
    bio: Optional[str] = None
    technology_areas: Optional[str] = None
    research_domains: List[str] = []
    keywords: List[str] = []
    publications: List[PublicationResponse] = []
    patents: List[PatentResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True

# Audit Log & Notification Schemas
class AuditLogResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    action: str
    resource: str
    details: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True