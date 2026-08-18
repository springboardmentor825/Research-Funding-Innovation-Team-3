from datetime import datetime
from sqlalchemy import String, Text, DateTime, ForeignKey, Table, Column, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.postgres import Base

profile_funding = Table(
    "profile_funding",
    Base.metadata,
    Column("profile_id", Integer, ForeignKey("research_profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("funding_id", Integer, ForeignKey("funding_opportunities.id", ondelete="CASCADE"), primary_key=True)
)

class FundingOpportunity(Base):
    __tablename__ = "funding_opportunities"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    description: Mapped[str] = mapped_column(Text)
    source_type: Mapped[str] = mapped_column(String(100), index=True)
    agency: Mapped[str] = mapped_column(String(255), index=True)
    amount: Mapped[str] = mapped_column(String(100), default="Undisclosed")
    deadline: Mapped[str] = mapped_column(String(100), default="Rolling")
    eligibility_criteria: Mapped[str] = mapped_column(Text, default="")
    tags: Mapped[list] = mapped_column(JSON, default=list)
    application_url: Mapped[str] = mapped_column(String(500), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    profiles = relationship("ResearchProfile", secondary=profile_funding, back_populates="funding_opportunities")
