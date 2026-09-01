# 🚀 InnovaFund-AI: AI-Powered Research Funding & Innovation Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/springboardmentor825/Research-Funding-Innovation-Team-3)
[![Python](https://img.shields.io/badge/python-3.11%20%7C%203.14-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)
[![Tests](https://img.shields.io/badge/PyTest-11%2F11%20Passing-success.svg)](https://docs.pytest.org/)

**InnovaFund-AI** is an enterprise-grade AI-powered platform designed to unify research grant discovery, automated eligibility matching, patent landscape intelligence, emerging technology detection, and commercialization recommendations into one intelligent dashboard.

---

## 📌 Executive Feature Overview

### 🔹 1. Authentication & RBAC (Milestone 1)
- **Firebase Social SSO**: Real Google & GitHub OAuth integration with forced account selection.
- **Role-Based Access Control**: Supports `Researcher`, `Startup Founder`, `Innovation Manager`, and `Platform Administrator` roles.
- **JWT Authorization**: Bearer token authentication protecting REST API routes.

### 🔹 2. Grant Matching Engine (Milestone 2 — Member 2 Deliverable)
- **5-Criteria Rules Engine**: Evaluates Research Domain (35%), Career Stage (25%), Geographical Eligibility (25%), Funding Mechanism (15%), and Strict Deadline validation.
- **Dynamic Rules Tuning**: Real-time adjustment of criteria weights via API (`PUT /api/grants/matching-rules`).
- **Auto-Healing DB Migration**: Auto-migrates database schemas on startup without manual SQL commands.

### 3. Technology Intelligence Engine (Milestone 3 — Member 2 Deliverable)
- **Emerging Technology Identification**: Identifies high-growth tech domains (*Generative AI, Quantum Computing, Solid-State Batteries*) from patent filing velocity and publication signals.
- **Technology Maturity Analysis**: Classifies technology lifecycle stages (`Emerging`, `Growth`, `Mature`, `Declining`) and Technology Readiness Levels (**TRL 1–9**).
- **Innovation Score Integration**: Supplies **Technology Maturity Score (0-100)** as **15% of the weighted score** to Member 4's Innovation Model.
- **Competitor Activity Tracking**: Monitors top patent assignees and market share percentages.

### 🔹 4. Multi-Source Search & Aggregation & Recommendations
- **Publications Dataset**: Live arXiv API integration + OpenAlex + CrossRef + Semantic Scholar returning up to **100+ real records per search** with automatic initial load, active DOI links, and one-click CSV export.
- **Patents Dataset**: Aggregated search across USPTO Public Data, Google Patents, and The Lens IP returning up to **100+ real patent records** with status filtering and CSV export.
- **AI Grant Recommendations UI**: Dedicated Recommendations Dashboard featuring match score badges, potential funding value stats, filter controls, and grant bookmarking.

---

## 🛠️ Technology Stack

| Tier | Component | Technology Used |
| :--- | :--- | :--- |
| **Frontend** | UI & Dashboard | React 18, Vite, Tailwind CSS, Lucide / Heroicons |
| **Backend API** | Microservices | Python 3.11 / 3.14, FastAPI, Pydantic V2, Uvicorn |
| **Databases** | Relational & Document | PostgreSQL 16 (SQLite fallback), MongoDB 7 |
| **Integrations** | Academic & Patent APIs | arXiv Open API, OpenAlex, CrossRef, Semantic Scholar, USPTO |
| **DevOps** | Containerization | Docker, Docker Compose, PyTest, GitHub Actions |

---

## 📁 Repository Structure

```text
InnovaFund-AI/
├── .agents/                 # Antigravity IDE Agent Rules & Workflows
├── .vscode/                 # Workspace Settings, Debuggers & Recommended Extensions
├── backend/                 # FastAPI Microservices Backend
│   ├── models.py            # SQLAlchemy Database Models (Grants, Tech Domains, Users)
│   ├── schemas.py           # Pydantic Request/Response Schemas
│   ├── main.py              # Application Entry Point & Router Registration
│   ├── database.py          # PostgreSQL / SQLite Engine & Auto-Migration
│   ├── repositories/        # Database Access Abstraction Layer
│   ├── routers/             # API Controllers (Auth, Grants, Tech, Datasets, Profiles)
│   ├── services/            # Business Logic (Grant Matching, Tech Intelligence, Datasets)
│   └── tests/               # PyTest Test Suites (100% Passing)
├── docs/                    # Technical Documentation & User Guides
│   ├── API_GUIDE.md         # REST API Endpoint Reference
│   ├── SYSTEM_ARCHITECTURE.md # Architecture & Modularity Overview
│   ├── DATABASE_DESIGN.md   # Schema Specs & Migration Rules
│   ├── INSTALLATION_GUIDE.md# Setup Instructions (Local & Docker)
│   ├── PROJECT_PLANNING.md  # Milestone Roadmap & Delivery Matrix
│   └── MEMBER_2_GRANT_MATCHING_TECH_INTELLIGENCE.md # Member 2 Technical Specifications
├── frontend/                # React 18 + Vite Web Application
│   ├── src/                 # React Components, Contexts, Pages & API Clients
│   ├── public/              # Static Assets
│   └── Dockerfile           # Frontend Container Spec
├── docker-compose.yml       # Docker Multi-Container Orchestrator
└── README.md                # Project Overview & Quickstart Guide
```

---

## 🚀 Quickstart Guide

### Option A: Running with Docker (Recommended)

1. Open **Docker Desktop**.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Open Web App: `http://localhost:5173`  
   API Documentation: `http://localhost:8000/docs`

---

### Option B: Running Locally

#### 1. Backend Setup:
```bash
# Navigate to root & activate Python environment
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload
```
*Backend running on `http://127.0.0.1:8000`*

#### 2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```
*Frontend running on `http://localhost:5173`*

---

## 🧪 Running Automated Test Suite

To run all automated backend unit & integration tests:

```bash
python -m pytest backend/tests/test_grant_matching.py backend/tests/test_technology_intelligence.py
```

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for details.
