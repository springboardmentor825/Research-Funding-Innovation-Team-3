from datetime import date, datetime, timezone
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Table, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.postgres import Base

profile_publications = Table("profile_publications", Base.metadata,
    Column("profile_id", ForeignKey("research_profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("publication_id", ForeignKey("publications.id", ondelete="CASCADE"), primary_key=True))
profile_patents = Table("profile_patents", Base.metadata,
    Column("profile_id", ForeignKey("research_profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("patent_id", ForeignKey("patents.id", ondelete="CASCADE"), primary_key=True))

class Publication(Base):
    __tablename__ = "publications"
    id: Mapped[int] = mapped_column(primary_key=True)
    source: Mapped[str] = mapped_column(String(80), default="OpenAlex")
    external_id: Mapped[str] = mapped_column(String(500), unique=True, index=True)
    title: Mapped[str] = mapped_column(Text)
    doi: Mapped[str | None] = mapped_column(String(500), index=True)
    publication_date: Mapped[date | None] = mapped_column(Date)
    venue: Mapped[str | None] = mapped_column(String(300))
    citation_count: Mapped[int] = mapped_column(Integer, default=0)
    authors_json: Mapped[str | None] = mapped_column(Text)
    metadata_json: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    profiles: Mapped[list["ResearchProfile"]] = relationship(secondary=profile_publications, back_populates="publications")

class Patent(Base):
    __tablename__ = "patents"
    id: Mapped[int] = mapped_column(primary_key=True)
    source: Mapped[str] = mapped_column(String(80))
    external_id: Mapped[str] = mapped_column(String(300), unique=True, index=True)
    title: Mapped[str] = mapped_column(Text)
    assignee: Mapped[str | None] = mapped_column(String(500))
    filing_date: Mapped[date | None] = mapped_column(Date)
    classification: Mapped[str | None] = mapped_column(String(300))
    technology_domain: Mapped[str | None] = mapped_column(String(300))
    citation_count: Mapped[int] = mapped_column(Integer, default=0)
    metadata_json: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    profiles: Mapped[list["ResearchProfile"]] = relationship(secondary=profile_patents, back_populates="patents")
