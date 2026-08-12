# Research Funding & Innovation Intelligence Platform — Milestone 1

Independent implementation based only on the mentor specification.

## Objective
Build the Milestone 1 foundation of an AI-powered Research Funding & Innovation Intelligence Platform. The mentor specification requires project initialization, architecture/database/UI planning, frontend/backend setup, authentication and RBAC, research profile management, and publication/patent dataset integration.

## Milestone 1 scope
- FastAPI backend and React frontend
- PostgreSQL primary relational store
- MongoDB secondary document store for raw external records when available
- User registration/login, JWT bearer authentication and OAuth2 password-flow compatibility
- Four mentor-defined roles: Researcher, Startup Founder, Innovation Manager, Administrator
- Role-protected administrator APIs
- User profile and normalized research profile data
- Domains, interests, keywords, technology areas
- Academic information, research history, organization
- OpenAlex publication search and profile association
- Patent provider abstraction with a clearly labelled public-data snapshot fallback
- API documentation through FastAPI Swagger/OpenAPI
- Automated backend tests

Milestone 2 features such as funding recommendation, grant matching, research trend analysis and research intelligence dashboards are intentionally excluded.

## Architecture
```text
React.js
   │ REST/JSON + JWT
   ▼
FastAPI
   ├── Auth / RBAC
   ├── Research Profile Services
   ├── Publication Integration ── OpenAlex
   └── Patent Integration ─────── Provider abstraction
        │
        ├── PostgreSQL: users, profiles, normalized relationships
        └── MongoDB: raw external publication/patent payloads
```

## Technology stack
- Python 3.11+ / FastAPI
- SQLAlchemy + PostgreSQL
- MongoDB + PyMongo
- JWT (PyJWT) + FastAPI OAuth2PasswordBearer
- React.js + React Router + Vite
- Pytest
- Docker Compose

## Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 16+ and MongoDB 8+, or Docker Desktop
- Internet access for live OpenAlex queries

## Environment variables
Copy `.env.example` to `.env` and replace `JWT_SECRET` with a random secret of at least 32 characters. Never commit `.env`.

OpenAlex basic queries can be used without embedding a key; if a key is available it can be supplied through `OPENALEX_API_KEY`. The application never contains a credential in source code.

## PostgreSQL setup
Create a database/user matching the example connection string, or use Docker Compose.

## MongoDB setup
Run MongoDB locally on port 27017, or use Docker Compose. MongoDB stores raw external records when it is reachable; the normalized application data remains in PostgreSQL.

## Backend setup
```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cd ..
copy .env.example .env  # Windows; use cp on macOS/Linux
uvicorn app.main:app --app-dir backend --reload
```

Swagger: http://localhost:8000/docs
Health: http://localhost:8000/health

## Create an administrator
Registration intentionally creates Researcher accounts. Promote/create an administrator with environment variables rather than exposing a default credential:

```bash
# Set ADMIN_EMAIL, ADMIN_PASSWORD and optionally ADMIN_NAME in your shell.
python backend/scripts/create_admin.py
```

## Frontend setup
```bash
cd frontend
npm install
copy .env.example .env  # Windows; use cp on macOS/Linux
npm run dev
```

Frontend: http://localhost:5173

## Docker setup
```bash
set JWT_SECRET=replace-with-a-random-32-plus-character-secret
# PowerShell: $env:JWT_SECRET="replace-with-a-random-32-plus-character-secret"
docker compose up --build
```

The compose stack starts PostgreSQL, MongoDB, FastAPI and the React/Nginx build.

## API documentation
The running FastAPI application exposes Swagger/OpenAPI at `/docs` and ReDoc at `/redoc`.

Main endpoints:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login` (OAuth2 password form)
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET/PUT /api/v1/users/me/profile`
- `POST/GET/PUT /api/v1/profile`
- `POST /api/v1/profile/domains`
- `POST /api/v1/profile/interests`
- `POST /api/v1/profile/keywords`
- `POST /api/v1/profile/technology-areas`
- `POST /api/v1/profile/research-history`
- `GET /api/v1/publications/search`
- `POST/GET /api/v1/profile/publications`
- `GET /api/v1/patents/search`
- `POST/GET /api/v1/profile/patents`
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/{user_id}/role`
- `PATCH /api/v1/admin/users/{user_id}/status`

## Project structure
```text
backend/app/
  api/            HTTP routers
  core/           configuration and security
  db/             PostgreSQL and MongoDB setup
  dependencies/   authentication/authorization dependencies
  integrations/   OpenAlex and patent providers
  models/         SQLAlchemy models
  schemas/        Pydantic contracts
  services/       business logic
frontend/src/
  components/     reusable layout/route guards
  context/        auth state
  pages/          Milestone 1 screens
  services/       backend API client
  styles/         responsive styling
backend/tests/    automated backend tests
data/             clearly labelled public-data patent snapshot

docs/             architecture, database, API, testing and milestone docs
```

## Testing
```bash
cd backend
PYTHONPATH=. pytest -q
```
The test suite uses SQLite for isolated automated tests and mocks the external publication integration. Production/runtime configuration remains PostgreSQL + MongoDB.

## Known limitations
1. Live OpenAlex access depends on network availability; no credential is hardcoded.
2. Current OpenAlex documentation says API keys are free but required for API use at scale; basic queries are documented as usable without a key. Configure `OPENALEX_API_KEY` if your account/rate limit requires it.
3. PatentsView currently requires an API key and its documentation says new key grants are temporarily suspended. Therefore the project uses a provider abstraction and a clearly labelled local snapshot containing a real public patent record rather than pretending an unavailable API credential exists. Set `PATENTS_PROVIDER=patentsview` and `PATENTSVIEW_API_KEY` only when you have legitimate access.
4. The local patent snapshot is not a live patent search and is intentionally not represented as one.
5. Docker and external-network execution could not be exercised in this restricted build environment; the configuration is included for a normal developer machine.
6. No Milestone 2 functionality is included.
