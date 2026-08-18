from datetime import datetime, timezone
from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.postgres import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    bio: Mapped[str | None] = mapped_column(Text)
    phone: Mapped[str | None] = mapped_column(String(40))
    user: Mapped["User"] = relationship(back_populates="profile")

class Organization(Base):
    __tablename__ = "organizations"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    organization_type: Mapped[str | None] = mapped_column(String(100))
    website: Mapped[str | None] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text)
    profiles: Mapped[list["ResearchProfile"]] = relationship(back_populates="organization")

class ResearchProfile(Base):
    __tablename__ = "research_profiles"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    academic_title: Mapped[str | None] = mapped_column(String(160))
    degree: Mapped[str | None] = mapped_column(String(160))
    institution: Mapped[str | None] = mapped_column(String(200))
    academic_profile_url: Mapped[str | None] = mapped_column(String(500))
    research_summary: Mapped[str | None] = mapped_column(Text)
    organization_id: Mapped[int | None] = mapped_column(ForeignKey("organizations.id", ondelete="SET NULL"))
    user: Mapped["User"] = relationship(back_populates="research_profile")
    organization: Mapped[Organization | None] = relationship(back_populates="profiles")
    domains: Mapped[list["ResearchDomain"]] = relationship(cascade="all, delete-orphan", back_populates="profile")
    interests: Mapped[list["ResearchInterest"]] = relationship(cascade="all, delete-orphan", back_populates="profile")
    keywords: Mapped[list["Keyword"]] = relationship(cascade="all, delete-orphan", back_populates="profile")
    technology_areas: Mapped[list["TechnologyArea"]] = relationship(cascade="all, delete-orphan", back_populates="profile")
    history: Mapped[list["ResearchHistory"]] = relationship(cascade="all, delete-orphan", back_populates="profile")
    publications: Mapped[list["Publication"]] = relationship(secondary="profile_publications", back_populates="profiles")
    patents: Mapped[list["Patent"]] = relationship(secondary="profile_patents", back_populates="profiles")
    funding_opportunities: Mapped[list["FundingOpportunity"]] = relationship(secondary="profile_funding", back_populates="profiles")

class ResearchDomain(Base):
    __tablename__ = "research_domains"
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("research_profiles.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(160))
    profile: Mapped[ResearchProfile] = relationship(back_populates="domains")
    __table_args__ = (UniqueConstraint("profile_id", "name", name="uq_domain_profile_name"),)

class ResearchInterest(Base):
    __tablename__ = "research_interests"
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("research_profiles.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(200))
    profile: Mapped[ResearchProfile] = relationship(back_populates="interests")
    __table_args__ = (UniqueConstraint("profile_id", "name", name="uq_interest_profile_name"),)

class Keyword(Base):
    __tablename__ = "keywords"
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("research_profiles.id", ondelete="CASCADE"))
    value: Mapped[str] = mapped_column(String(120))
    profile: Mapped[ResearchProfile] = relationship(back_populates="keywords")
    __table_args__ = (UniqueConstraint("profile_id", "value", name="uq_keyword_profile_value"),)

class TechnologyArea(Base):
    __tablename__ = "technology_areas"
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("research_profiles.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(160))
    profile: Mapped[ResearchProfile] = relationship(back_populates="technology_areas")
    __table_args__ = (UniqueConstraint("profile_id", "name", name="uq_tech_profile_name"),)

class ResearchHistory(Base):
    __tablename__ = "research_history"
    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("research_profiles.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text)
    start_year: Mapped[int | None] = mapped_column(Integer)
    end_year: Mapped[int | None] = mapped_column(Integer)
    profile: Mapped[ResearchProfile] = relationship(back_populates="history")
