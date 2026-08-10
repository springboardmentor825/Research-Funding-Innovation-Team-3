from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, Float, DateTime
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    organization = Column(String(200))
    created_at = Column(TIMESTAMP, server_default=func.now())


class ResearchProfile(Base):
    __tablename__ = "research_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    research_domains = Column(Text)
    keywords = Column(Text)
    publications = Column(Text)
    patents = Column(Text)
    technology_areas = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())


#added for milestone 2

class FundingOpportunity(Base):
    __tablename__ = "funding_opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    agency = Column(String(200))
    domains = Column(Text)
    keywords = Column(Text)
    amount = Column(Float)
    deadline = Column(DateTime)
    past_success_rate = Column(Float, default=0.2)
    url = Column(String(500))
    created_at = Column(TIMESTAMP, server_default=func.now())


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    researcher_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    opportunity_id = Column(Integer, ForeignKey("funding_opportunities.id", ondelete="CASCADE"), nullable=False)
    score = Column(Float, nullable=False)
    domain_fit_score = Column(Float)
    deadline_score = Column(Float)
    amount_score = Column(Float)
    success_rate_score = Column(Float)
    eligible = Column(Integer, default=1)
    reasoning = Column(Text)
    generated_at = Column(TIMESTAMP, server_default=func.now())

    researcher = relationship("User")
    opportunity = relationship("FundingOpportunity")