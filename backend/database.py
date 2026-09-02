import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from pymongo import MongoClient
from config import settings

logger = logging.getLogger(__name__)

# Try PostgreSQL first; if unavailable, fallback to local SQLite for instant developer setup
try:
    engine = create_engine(
        settings.POSTGRES_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20
    )
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    logger.info("Connected to PostgreSQL database successfully.")
except Exception:
    logger.info("PostgreSQL service not detected on port 5433. Auto-fallback activated: Using local SQLite database (funding_innovation_platform.db).")
    engine = create_engine(
        "sqlite:///./funding_innovation_platform.db",
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def auto_migrate_schema(target_engine):
    """Auto-healing schema migration for developer SQLite & PostgreSQL environments"""
    try:
        with target_engine.connect() as conn:
            try:
                conn.execute(text("SELECT source_id FROM funding_opportunities LIMIT 1"))
            except Exception:
                try:
                    conn.execute(text("ALTER TABLE funding_opportunities ADD COLUMN source_id INTEGER REFERENCES funding_sources(id) ON DELETE SET NULL"))
                    if hasattr(conn, 'commit'):
                        conn.commit()
                    logger.info("Auto-healing schema migration: Successfully added 'source_id' column to funding_opportunities.")
                except Exception as ex:
                    logger.debug(f"Migration note: {ex}")
            
            # Auto-rename password_hash to hashed_password if existing DB used old column name
            try:
                conn.execute(text("SELECT password_hash FROM users LIMIT 1"))
                try:
                    conn.execute(text("ALTER TABLE users RENAME COLUMN password_hash TO hashed_password"))
                    if hasattr(conn, 'commit'):
                        conn.commit()
                    logger.info("Auto-healing schema migration: Successfully renamed 'password_hash' to 'hashed_password' in users table.")
                except Exception as ex:
                    logger.debug(f"User table column rename note: {ex}")
            except Exception:
                pass
    except Exception:
        pass

auto_migrate_schema(engine)


# MongoDB PyMongo Client
try:
    mongo_client = MongoClient(settings.MONGO_URL, serverSelectionTimeoutMS=1000)
    mongo_client.admin.command('ping')
    mongo_db = mongo_client[settings.MONGO_DB_NAME]
    logger.info("Connected to MongoDB database successfully.")
except Exception:
    logger.info("MongoDB service not detected on port 27017. Running in standalone SQLite mode.")
    mongo_client = None
    mongo_db = None


# Dependency to get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper to get MongoDB instance
def get_mongo_db():
    return mongo_db