from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Research Funding & Innovation Intelligence Platform"
    environment: str = "development"
    api_prefix: str = "/api/v1"
    cors_origins: str = "http://localhost:5173"
    database_url: str = "postgresql+psycopg://rfip:rfip@localhost:5432/rfip"
    mongodb_url: str = "mongodb://localhost:27017"
    mongodb_database: str = "rfip"
    jwt_secret: str = "CHANGE_ME_IN_ENV"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    openalex_base_url: str = "https://api.openalex.org"
    openalex_api_key: str | None = None
    patents_provider: str = "local"
    patentsview_base_url: str = "https://search.patentsview.org/api/v1"
    patentsview_api_key: str | None = None
    local_patent_dataset: str = "data/patents_public_sample.json"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
