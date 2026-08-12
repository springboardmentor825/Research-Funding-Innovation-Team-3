"""
Database connection setup for InnovaFund-AI.
Uses PostgreSQL via SQLAlchemy.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# In production, load this from an environment variable / secrets manager.
# Example: postgresql://user:password@localhost:5432/innovafund_db
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/innovafund_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a DB session and closes it after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
