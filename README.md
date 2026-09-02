# Research Funding & Innovation Intelligence Platform

AI-powered platform designed to identify relevant funding opportunities, analyze research and publication trends, evaluate patent landscapes, discover emerging technologies, and generate actionable commercialization recommendations.

---

## 📌 Executive Feature Overview

### 🔹 1. Authentication & RBAC (Milestone 1)
- **Authentication**: JWT Bearer token authentication and OAuth2 password-flow compatibility with multi-provider login support.
- **Role-Based Access Control**: Supports `Researcher`, `Startup Founder`, `Innovation Manager`, and `Platform Administrator` roles.
- **Research Profile Management**: Research domains, keywords, publications, patents, technology areas, and academic history tracking.

### 🔹 2. Funding Discovery & Grant Matching Engine (Milestone 2)
- **Funding Opportunity Discovery**: Multi-source funding opportunities (Government Grants, Research Councils, Innovation Funds, Accelerators, Venture Programs).
- **5-Criteria Grant Matching Rules Engine**: Evaluates Research Domain Fit (35%), Career Stage Match (25%), Geographical Eligibility (25%), Funding Type Preference (15%), and Strict Deadline Validation.
- **Dynamic Rules Tuning**: Real-time adjustment of criteria weights via API (`PUT /api/grants/matching-rules`).
- **Research Intelligence & Trend Analysis**: Publication trend analysis, emerging topic detection, research hotspots, and citation analytics.

### 🔹 3. Patent Intelligence, Technology Maturity & Innovation Scoring (Milestone 3)
- **Patent Landscape & Prior Art Intelligence**: Deep patent landscape search, patent clustering, filing velocity, prior art similarity scoring, assignee breakdown, and conflict detection.
- **Technology Intelligence Engine**: Emerging technology identification, technology lifecycle stages (`Emerging`, `Growth`, `Mature`, `Declining`), and Technology Readiness Levels (**TRL 1–9**).
- **Mentor-Standard Innovation Scoring Model**: Multi-parameter score (0–100) calculated using the mentor-defined 5-pillar weighted model:
  - **Research Novelty**: 30%
  - **Patent Strength**: 20%
  - **Technology Maturity**: 15%
  - **Market Potential**: 20%
  - **Funding Relevance**: 15%
- **Commercialization & Technology Transfer Engine**: Automated technology transfer recommendations (Licensing vs Spin-off / Startup creation, TRL 1–9 roadmap, and industry partnership suggestions).

---

## 🛠️ Technology Stack

| Tier | Component | Technology Used |
| :--- | :--- | :--- |
| **Frontend** | UI & Dashboard | React 18, Vite, Vanilla CSS / Tailwind CSS, Lucide / React Icons |
| **Backend API** | Microservices & REST | Python 3.11+, FastAPI, Pydantic V2, Uvicorn, SQLAlchemy |
| **Databases** | Relational & Document | PostgreSQL 16 (SQLite fallback for dev/testing), MongoDB 7+ |
| **Integrations** | Academic & Patent APIs | OpenAlex, CrossRef, Semantic Scholar, USPTO, arXiv |
| **DevOps** | Containerization | Docker, Docker Compose, PyTest |

---

## 📁 Repository Structure

```text
Research_Funding_Innovation/
├── backend/
│   ├── app/
│   │   ├── api/            # Route handlers (auth, profile, assets, funding, trends, admin)
│   │   ├── core/           # Configuration, security, JWT helpers
│   │   ├── db/             # Database session and MongoDB connectors
│   │   ├── dependencies/   # Role-based and auth dependencies
│   │   ├── integrations/   # OpenAlex and Patent API integrations
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── services/       # Core business logic
│   ├── routers/            # Milestone 1-3 router integrations (auth, grants, tech, scoring, patents)
│   ├── services/           # Grant matching, technology intelligence, and scoring services
│   ├── repositories/       # User, profile, and audit log repositories
│   ├── tests/              # Pytest automated test suite
│   ├── main.py             # Root backend entry point
│   └── run_member6_full.py # Member 6 Milestone 3 end-to-end verification script
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API clients
│   │   ├── components/     # Modals (GrantMatching, TechIntelligence, InnovationScoring, Commercialization)
│   │   ├── context/        # Auth state context
│   │   ├── pages/          # Dashboards (Funding, Research, Patents, Technology, Recommendations)
│   │   └── styles/         # Modern design tokens and responsive glassmorphic styles
│   └── package.json
└── docker-compose.yml
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ / 20+
- PostgreSQL & MongoDB (optional: SQLite fallback is pre-configured for instant local demo)

### Backend Setup
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
- **Interactive Swagger Docs**: http://localhost:8000/docs
- **Health Endpoint**: http://localhost:8000/health

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- **Web Application**: http://localhost:5173

### Docker Compose
```bash
docker compose up --build
```

---

## 🧪 Testing & Verification

### Run Automated Backend Tests
```bash
cd backend
pytest -q
```

### Run Member 6 Milestone 3 Full Verification Suite
```bash
cd backend
python run_member6_full.py
```

### Build Frontend Bundle
```bash
cd frontend
npm run build
```

---

## 🔒 Data Source Transparency
1. **Academic Literature**: Live queries interface with OpenAlex and academic public endpoints when network access is available; fallback datasets ensure resilient local demonstration.
2. **Patent Intelligence**: Representative public patent data and provider abstractions model USPTO / Lens structures for offline, testable validation.
3. **Security**: Application secrets and JWT keys are configured via environment variables and never committed to source control.
