import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

# The Docker Compose service exposes PostgreSQL on host port 5433.  Keeping a
# safe local default makes a fresh clone work as soon as the containers start.
DATABASE_URL = os.getenv(
    "POSTGRES_URL",
    "postgresql://postgres:postgres@localhost:5433/funding_innovation_platform",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
