import os
from fastapi import FastAPI
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Research Funding & Innovation Intelligence Platform")

engine = create_engine(os.getenv("POSTGRES_URL"))

@app.get("/")
def read_root():
    return {"status": "Funding & Innovation Platform API is running"}

@app.get("/health")
def health_check():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}