from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas import PublicationResponse, PatentResponse
from services.dataset_service import DatasetService
from dependencies import get_current_user
from models import User

router = APIRouter(prefix="/datasets", tags=["Publication & Patent Dataset Integration"])

@router.get("/publications/search", response_model=List[PublicationResponse])
def search_publications(
    query: str = Query("artificial intelligence", min_length=2),
    source: str = Query("all", pattern="^(all|openalex|crossref|semantic_scholar|arxiv)$"),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db)
):
    service = DatasetService(db)
    if source == "openalex":
        return service.search_openalex(query, limit)
    elif source == "crossref":
        return service.search_crossref(query, limit)
    elif source == "semantic_scholar":
        return service.search_semantic_scholar(query, limit)
    elif source == "arxiv":
        return service.search_arxiv(query, limit)
    else:
        # Aggregated search across all scientific repositories for maximum yield
        each_limit = max(10, limit // 2)
        results = (
            service.search_arxiv(query, limit=each_limit) +
            service.search_openalex(query, limit=each_limit) +
            service.search_crossref(query, limit=each_limit) +
            service.search_semantic_scholar(query, limit=each_limit)
        )
        return results[:limit]

@router.get("/patents/search", response_model=List[PatentResponse])
def search_patents(
    query: str = Query("quantum computing", min_length=2),
    source: str = Query("all", pattern="^(all|uspto|google_patents|the_lens)$"),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db)
):
    service = DatasetService(db)
    if source == "uspto":
        return service.search_uspto(query, limit)
    elif source == "google_patents":
        return service.search_google_patents(query, limit)
    elif source == "the_lens":
        return service.search_the_lens(query, limit)
    else:
        each_limit = max(10, limit // 2)
        results = (
            service.search_google_patents(query, limit=each_limit) +
            service.search_uspto(query, limit=each_limit) +
            service.search_the_lens(query, limit=each_limit)
        )
        return results[:limit]
