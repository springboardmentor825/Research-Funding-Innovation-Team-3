# InnovaFund — Research Funding & Innovation Intelligence Platform

An AI-powered platform that helps researchers, startups, universities, and innovation centers discover funding opportunities, analyze research trends, evaluate patent landscapes, and generate commercialization recommendations.

**Branch:** `saumyaa-dev`
**Status:** Milestone 1 (solo) complete — auth, research profiles, publication/patent search, and a working React frontend.

---

## Tech Stack

**Backend**
- Python 3.13 + FastAPI
- PostgreSQL (structured data — users)
- MongoDB (flexible schema — research profiles)
- SQLAlchemy (ORM for Postgres)
- PyMongo (MongoDB driver)
- JWT auth via `python-jose`, password hashing via `passlib` + `bcrypt`

**Frontend**
- React (Vite)
- Axios for API calls
- Plain CSS (gradient "modern SaaS" theme)

**Infra**
- Docker Compose (Postgres + MongoDB containers)

---

## Project Structure

```
Research-Funding-Innovation-Team-3/
├── docker-compose.yml
├── .gitignore
├── backend/
│   ├── main.py              # FastAPI app entrypoint, all routes
│   ├── database.py          # Postgres connection/session
│   ├── mongo_database.py    # MongoDB connection
│   ├── models.py            # SQLAlchemy User model
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── auth.py              # JWT + password hashing helpers
│   ├── publications.py      # OpenAlex publication search
│   ├── patents.py           # Patent search (stub — see Known Issues)
│   ├── requirements.txt
│   └── .env                 # Not committed — see Environment Variables below
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Profile.jsx
    │   └── services/
    │       └── api.js       # Axios wrapper for backend calls
    └── package.json
```

---

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker Desktop
- Git

### 1. Clone and switch to this branch
```
git clone https://github.com/springboardmentor825/Research-Funding-Innovation-Team-3.git
cd Research-Funding-Innovation-Team-3
git checkout saumyaa-dev
```

### 2. Start the databases
```
docker-compose up -d
```
This starts two containers:
- **Postgres** on host port `5433` (mapped from container's `5432`)
- **MongoDB** on host port `27018` (mapped from container's `27017`)

Verify both are running:
```
docker ps
```

> Note: non-default ports were used to avoid conflicts with any local Postgres/MongoDB installs on the dev machine. Adjust `docker-compose.yml` and `.env` together if you change these.

### 3. Backend setup
```
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (not committed to git):
```
DATABASE_URL=postgresql://innovafund_user:innovafund_pass@localhost:5433/innovafund_db
MONGO_URL=mongodb://localhost:27018
SECRET_KEY=your_own_random_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Run the server:
```
uvicorn main:app --reload
```
API available at `http://127.0.0.1:8000`, interactive docs at `http://127.0.0.1:8000/docs`.

### 4. Frontend setup
```
cd frontend
npm install
npm run dev
```
App available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/health` | DB connectivity check | No |
| POST | `/register` | Create a new user | No |
| POST | `/login` | Returns a JWT access token | No |
| POST | `/profile` | Create/update research profile (MongoDB upsert) | Yes (Bearer token) |
| GET | `/profile` | Fetch logged-in user's research profile | Yes (Bearer token) |
| GET | `/publications/search?query=&limit=` | Search publications via OpenAlex (live data) | No |
| GET | `/patents/search?query=&limit=` | Search patents (currently stub data) | No |

**Roles supported:** `Researcher`, `Startup Founder`, `Innovation Manager`, `Administrator`

**Auth flow:** Register → Login (returns JWT) → include `Authorization: Bearer <token>` header on protected routes.

---

## Known Issues / Not Yet Done

- **Patents endpoint** returns placeholder data. Real integration (USPTO ODP, Google Patents, or The Lens) needs an API key that hasn't been set up yet.
- **Google/GitHub sign-in buttons** on the login/register pages are visual placeholders only — not wired to real OAuth yet.
- **bcrypt version pin:** `passlib==1.7.4` breaks with `bcrypt>=5.0`. If reinstalling dependencies from a clean environment, make sure `bcrypt==4.0.1` is installed (already pinned in `requirements.txt`).
- Profile page frontend layout is still being refined for a more standard full-width dashboard look.

---

## Milestone Status

**Milestone 1 (Week 1–2, solo):** ✅ Complete
- Auth (register/login/JWT/RBAC roles)
- Research profile management (MongoDB)
- Publication dataset integration (OpenAlex, live)
- Patent dataset integration (stub)
- Frontend: login, register, profile pages, wired end-to-end to backend

**Milestone 2 (Week 3–4, team):** Upcoming
- Role: **Member 8 — QA, Integration & Documentation**
- Responsibilities: shared DB connection setup for the team, integration testing across funding discovery + trend intelligence modules, API contract tracking, milestone documentation
