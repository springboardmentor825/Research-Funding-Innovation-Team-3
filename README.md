# Research Funding & Innovation Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests Status](https://img.shields.io/badge/tests-33%2F33%20passing%20(100%25)-success.svg)]()
[![Python Version](https://img.shields.io/badge/python-3.11%20%7C%203.12%20%7C%203.13-blue.svg)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)]()

An enterprise-grade, AI-powered platform designed for research institutions, universities, deep-tech startups, and innovation offices. The system enables automated funding opportunity discovery, research and publication trend analytics, patent landscape intelligence, technology readiness assessment, and commercialization pathway recommendation.

---

## 📑 Table of Contents
- [System Architecture & Capabilities](#-system-architecture--capabilities)
- [Milestones & Core Feature Breakdown](#-milestones--core-feature-breakdown)
- [Technology Stack](#️-technology-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [API Documentation & Endpoints](#-api-documentation--endpoints)
- [Test Suite & Quality Assurance](#-test-suite--quality-assurance)
- [Configuration & Environment Variables](#-configuration--environment-variables)
- [License & Contributions](#-license--contributions)

---

## 🏛 System Architecture & Capabilities

```mermaid
graph TD
    A[React 18 SPA Frontend] -->|REST / JWT Auth| B[FastAPI Backend Gateway]
    B --> C[Auth & RBAC Module]
    B --> D[Grant Matching Engine]
    B --> E[Patent & Technology Intelligence Engine]
    B --> F[Innovation Scoring & Commercialization Engine]
    
    C --> G[(PostgreSQL / SQLite Base)]
    D --> G
    E --> G
    F --> G
    
    D --> H[Multi-Source Academic APIs: OpenAlex / arXiv / CrossRef]
    E --> I[Patent Databases: USPTO / Lens / WIPO]
    B --> J[(MongoDB Document Store)]
```

The platform unifies three critical intelligence domains into a single high-performance pipeline:
1. **Grant Intelligence**: Matches research profiles to global grant and funding opportunities using a multi-criteria weighted scoring algorithm.
2. **IP & Patent Intelligence**: Analyzes patent landscape, citation networks, competitor activity, and technology lifecycle maturity stages.
3. **Innovation & Commercialization Engine**: Evaluates commercial readiness through a 5-pillar Innovation Scoring model (0–100) and produces actionable technology transfer roadmaps (Licensing vs. Startup Spin-off).

---

## 🎯 Milestones & Core Feature Breakdown

### 🔹 Milestone 1: Authentication, RBAC & Researcher Profiles
* **Secure Authentication**: OAuth2 Password flow and JWT Bearer token authentication with SHA-256 password hashing.
* **Role-Based Access Control (RBAC)**: Fine-grained permissions across four distinct personas:
  * `Researcher`
  * `Startup Founder`
  * `Innovation Manager`
  * `Administrator`
* **Comprehensive Research Profiles**: Rich researcher profiles containing domains of expertise, keywords, academic publications, patent holdings, technology areas, and career history.

### 🔹 Milestone 2: Multi-Source Funding Discovery & Grant Matching Engine
* **Multi-Source Opportunity Aggregation**: Automatic aggregation of grants across government councils, research foundations, enterprise innovation funds, and venture programs.
* **5-Criteria Weighted Matching Rules Engine**:
  * **Research Domain Fit**: 35%
  * **Career Stage Eligibility**: 25%
  * **Geographical Eligibility**: 25%
  * **Funding Type Preference**: 15%
  * **Strict Deadline Filtering**: Automated exclusion of expired funding calls.
* **Research Trend Analytics**: Topic emergence analysis, hotspot detection, and citation velocity modeling.

### 🔹 Milestone 3: Patent Landscape, Technology Readiness & Commercialization
* **Patent Landscape Intelligence**: Keyword & semantic patent searching, filing velocity tracking, patent clustering, prior art overlap analysis, and key assignee profiling.
* **Technology Lifecycle & Readiness Engine**: Classifies domain maturity across 4 lifecycle stages (`Emerging`, `Growth`, `Mature`, `Declining`) with Technology Readiness Level mapping (**TRL 1–9**).
* **5-Pillar Weighted Innovation Scoring (0–100)**:
  * **Research Novelty**: 30%
  * **Patent Strength**: 20%
  * **Market Potential**: 20%
  * **Technology Maturity**: 15%
  * **Funding Relevance**: 15%
* **Technology Transfer & Commercialization Advisor**: Automated generation of commercialization recommendations, licensing terms, spin-off roadmaps, and industry partnership identification.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React 18, Vite, Modern Responsive Glassmorphic CSS, React Icons, Lucide Icons, Axios |
| **Backend API** | Python 3.11+, FastAPI, Pydantic V2, Uvicorn, SQLAlchemy 2.0 ORM |
| **Databases** | PostgreSQL 16 (Relational), SQLite (Zero-config local fallback), MongoDB 7+ (Document store) |
| **Integrations** | OpenAlex, CrossRef, Semantic Scholar, arXiv, USPTO, WIPO Provider Abstractions |
| **DevOps & QA** | PyTest (100% Suite Pass), Docker, Docker Compose |

---

## 📁 Repository Structure

```text
Research_Funding_Innovation/
├── backend/
│   ├── app/
│   │   ├── api/             # API v1 route controllers (auth, profile, assets, funding, trends, admin)
│   │   ├── core/            # Security, JWT tokens, application configuration
│   │   ├── db/              # SQLAlchemy declarative base, session makers, engine configuration
│   │   ├── dependencies/    # Auth token decoding and role-based permissions guards
│   │   ├── integrations/    # External academic and patent API clients
│   │   ├── models/          # Modular model re-exports
│   │   ├── schemas/         # Pydantic request and response schemas
│   │   └── services/        # Business logic for auth, assets, profile, and funding
│   ├── routers/             # Integrated routers for grants, technology, scoring, and patents
│   ├── services/            # Grant matching, technology intelligence, and innovation scoring engines
│   ├── tests/               # Pytest automated test suites
│   ├── database.py          # Unified database connection & migration manager
│   ├── models.py            # Canonical SQLAlchemy ORM models registry
│   ├── main.py              # Root backend entrypoint
│   ├── test_member6_backend.py # Standalone verification runner for patent & tech routes
│   └── test_pub_search.py   # Standalone verification runner for publication discovery
├── frontend/
│   ├── src/
│   │   ├── api/             # Backend API client interfaces
│   │   ├── components/      # UI components (Modals, scoring gauges, patent charts, grant cards)
│   │   ├── context/         # React Auth context and session management
│   │   ├── pages/           # Platform dashboards (Funding, Research, Patents, Technology, Scoring)
│   │   └── styles/          # Responsive styling and CSS design system
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started & Installation

### Prerequisites
* **Python 3.11+** installed
* **Node.js 18+ / 20+** and `npm` installed
* *(Optional)* PostgreSQL & MongoDB running locally (The platform includes automated SQLite fallback for instant setup).

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Launch FastAPI backend server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

* **Interactive Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **ReDoc Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
* **System Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### 2. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```

* **Web Application UI**: [http://localhost:5173](http://localhost:5173)

---

## 📖 API Documentation & Endpoints

### 🔐 Authentication & Profile (`/api/v1`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user account | No |
| `POST` | `/api/v1/auth/login` | Authenticate user and receive JWT bearer token | No |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/v1/profile` | Retrieve comprehensive researcher profile | Yes |
| `PUT` | `/api/v1/profile` | Update profile details and research domain | Yes |
| `POST` | `/api/v1/profile/keywords` | Add research interest keywords | Yes |
| `POST` | `/api/v1/profile/research-history` | Record academic/career milestone | Yes |

### 💰 Funding & Grant Matching (`/api` & `/api/v1`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/grants/opportunities` | Search funding opportunities with filters | No |
| `POST` | `/api/grants/match` | Calculate grant match score against a researcher profile | Yes |
| `PUT` | `/api/grants/matching-rules` | Dynamically update grant matching criteria weights | Admin |
| `GET` | `/api/v1/funding/recommendations` | Get personalized grant recommendations | Yes |
| `POST` | `/api/v1/funding/{id}/bookmark` | Bookmark funding opportunity | Yes |

### 🔬 IP, Technology Intelligence & Scoring (`/api` & `/api/v1`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/patents/search` | Search patents by query, provider, and domain | No |
| `GET` | `/api/patents/clusters` | Retrieve patent landscape cluster intelligence | No |
| `GET` | `/api/patents/trends` | Fetch patent filing velocity and trends | No |
| `GET` | `/api/technology/emerging` | Discover high-growth emerging technologies | No |
| `GET` | `/api/technology/maturity` | Retrieve TRL level and lifecycle stage | No |
| `GET` | `/api/technology/competitors` | Competitor patent holdings and market shares | No |
| `POST` | `/api/scoring/calculate` | Calculate 5-pillar Innovation Score (0–100) | No |
| `POST` | `/api/commercialization/recommendations` | Generate technology transfer & startup advisory | No |

---

## 🧪 Test Suite & Quality Assurance

The backend repository contains a test suite verifying data integrity, relationship mappings, permissions, and business logic.

```bash
# Run complete test suite (33 tests)
cd backend
pytest -v
```

### Test Suite Summary:
```text
test_member6_backend.py::test_endpoints PASSED                           [  3%]
test_pub_search.py::test_publications PASSED                             [  6%]
tests/test_assets.py::test_publication_search_mock PASSED                [  9%]
tests/test_assets.py::test_publication_save_duplicate PASSED             [ 12%]
tests/test_assets.py::test_patent_search_and_save PASSED                 [ 15%]
tests/test_assets.py::test_publication_empty_search PASSED               [ 18%]
tests/test_assets.py::test_publication_provider_failure PASSED           [ 21%]
tests/test_assets.py::test_patent_provider_failure PASSED                [ 24%]
tests/test_auth.py::test_registration_and_duplicate PASSED               [ 27%]
tests/test_auth.py::test_login_and_me PASSED                             [ 30%]
tests/test_auth.py::test_bad_password_and_tokens PASSED                  [ 33%]
tests/test_auth.py::test_admin_rbac PASSED                               [ 36%]
tests/test_auth.py::test_researcher_cannot_admin PASSED                  [ 39%]
tests/test_funding.py::test_funding_list_and_search PASSED               [ 42%]
tests/test_funding.py::test_personalized_recommendations_and_alerts PASSED [ 45%]
tests/test_funding.py::test_admin_create_funding_opportunity PASSED      [ 48%]
tests/test_funding.py::test_bookmark_profile_funding PASSED              [ 51%]
tests/test_health.py::test_health PASSED                                 [ 54%]
tests/test_innovation_scoring_and_patents.py::test_patent_search_endpoint PASSED [ 57%]
tests/test_innovation_scoring_and_patents.py::test_patent_clusters_endpoint PASSED [ 60%]
tests/test_innovation_scoring_and_patents.py::test_patent_trends_endpoint PASSED [ 63%]
tests/test_innovation_scoring_and_patents.py::test_technology_emerging_endpoint PASSED [ 66%]
tests/test_innovation_scoring_and_patents.py::test_technology_maturity_endpoint PASSED [ 69%]
tests/test_innovation_scoring_and_patents.py::test_technology_competitors_endpoint PASSED [ 72%]
tests/test_innovation_scoring_and_patents.py::test_scoring_calculate_endpoint PASSED [ 75%]
tests/test_innovation_scoring_and_patents.py::test_scoring_get_by_project_id PASSED [ 78%]
tests/test_innovation_scoring_and_patents.py::test_commercialization_recommendations PASSED [ 81%]
tests/test_profile.py::test_profile_crud_and_components PASSED           [ 84%]
tests/test_profile.py::test_invalid_history PASSED                       [ 87%]
tests/test_profile.py::test_cross_user_isolation PASSED                  [ 90%]
tests/test_trends.py::test_get_trends_topics PASSED                      [ 93%]
tests/test_trends.py::test_get_trends_hotspots PASSED                    [ 96%]
tests/test_trends.py::test_get_trends_citations PASSED                   [100%]

================= 33 passed, 0 failed in 79.91s =================
```

### Standalone Runners:
```bash
# Verify patent and technology routes
python test_member6_backend.py

# Verify publication discovery and academic sources
python test_pub_search.py
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in the `backend/` directory to customize platform settings:

```env
# Application Settings
PROJECT_NAME="Research Funding & Innovation Intelligence Platform"
VERSION="1.0.0"
ENVIRONMENT="development"

# Security & Authentication
SECRET_KEY="your-secure-jwt-secret-key"
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Database Configuration (PostgreSQL / SQLite)
DATABASE_URL="sqlite:///./research_platform.db"
# DATABASE_URL="postgresql://user:password@localhost:5432/research_db"

# Document Database Configuration (MongoDB)
MONGO_URL="mongodb://localhost:27017"
MONGO_DB_NAME="research_innovation_db"
```

---

## 📄 License & Attribution

Distributed under the **MIT License**. See `LICENSE` for more information. Developed for the Research Funding & Innovation Intelligence Platform project.
