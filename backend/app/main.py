from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import get_settings
from app.db.postgres import init_db, SessionLocal
from app.db.mongo import ping_mongo
from app.api import auth, profile, assets, admin, users, funding, trends
from app.services.funding import seed_funding_data

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        seed_funding_data(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.app_name,
    version="2.0.0",
    description="Research Funding & Innovation Intelligence Platform — Milestone 2",
    lifespan=lifespan
)

origins = [x.strip() for x in settings.cors_origins.split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(profile.router, prefix=settings.api_prefix)
app.include_router(assets.router, prefix=settings.api_prefix)
app.include_router(admin.router, prefix=settings.api_prefix)
app.include_router(users.router, prefix=settings.api_prefix)
app.include_router(funding.router, prefix=settings.api_prefix)
app.include_router(trends.router, prefix=settings.api_prefix)

from fastapi.responses import JSONResponse, RedirectResponse

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

@app.get("/health", tags=["System"])
def health():
    return {
        "status": "ok",
        "postgresql": "configured",
        "mongodb": "up" if ping_mongo() else "unavailable",
        "milestone": "2"
    }

@app.exception_handler(Exception)
async def unhandled(request, exc):
    return JSONResponse(status_code=500, content={"detail": str(exc)})
