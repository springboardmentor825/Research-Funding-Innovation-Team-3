# InnovaFund AI

Research Funding & Innovation Intelligence Platform - Milestone 1 foundation.

The platform helps researchers, startup founders, innovation managers, and administrators build a research profile and explore scholarly work before funding recommendations, patent intelligence, and commercialization scoring are added in later milestones.

## Milestone 1 delivered

- FastAPI backend with PostgreSQL and MongoDB services defined in Docker Compose
- Secure registration and login with JWT access tokens
- Role-aware access for researcher, startup founder, innovation manager, and administrator accounts
- Protected research-profile create, read, update, and delete workflows
- Live OpenAlex publication search endpoint and a ready-to-configure PatentsView integration
- React workspace for authentication, profile management, and publication discovery
- Environment templates and API documentation at `http://localhost:8000/docs`

## Quick start

### 1. Clone and switch to the feature branch

```powershell
git clone https://github.com/Nithya21shree/InnovaFund-AI.git
cd InnovaFund-AI
git switch feature/milestone-1-foundation
```

### 2. Start the databases

```powershell
docker compose up -d
```

PostgreSQL is available at `localhost:5433`; MongoDB is available at `localhost:27017`.

### 3. Run the backend

```powershell
Copy-Item backend/.env.example backend/.env
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
Set-Location backend
uvicorn main:app --reload
```

The API health endpoint is `http://localhost:8000/health`. Open `http://localhost:8000/docs` to explore and test the API.

### 4. Run the frontend

Open another terminal in the repository root:

```powershell
Copy-Item frontend/.env.example frontend/.env
Set-Location frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Environment values

`backend/.env` is ignored by Git. At a minimum, change `SECRET_KEY` before any shared or production deployment. Add `PATENTSVIEW_API_KEY` when the team has an API key to enable the patent endpoint.

| Service | Local address |
| --- | --- |
| React interface | `http://localhost:5173` |
| FastAPI API / Swagger docs | `http://localhost:8000` / `http://localhost:8000/docs` |
| PostgreSQL | `localhost:5433` |
| MongoDB | `localhost:27017` |

## Milestone 1 APIs

| Method | Endpoint | Purpose | Access |
| --- | --- | --- | --- |
| `POST` | `/register` | Create an account | Public |
| `POST` | `/login` | Receive a JWT access token | Public |
| `GET` | `/me` | Read the signed-in account | Authenticated |
| `GET` | `/admin/users` | List platform users | Administrator |
| `POST` | `/profile` | Create or update the caller's research profile | Authenticated |
| `GET` | `/profile` | Read the caller's research profile | Authenticated |
| `DELETE` | `/profile` | Delete the caller's research profile | Authenticated |
| `GET` | `/publications/search?query=...` | Search OpenAlex publications | Public |
| `GET` | `/patents/search?query=...` | Search PatentsView patents | Public, configured key |

## Team workflow

Do not commit directly to the shared baseline branch. Work in a personal feature branch, keep `.env` files out of Git, and open a pull request to `saumyaa-dev` once the team has reviewed the changes.
