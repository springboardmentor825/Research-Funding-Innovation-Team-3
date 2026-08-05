# ResearchSphere AI: AI-Powered Research Funding & Innovation Intelligence Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg?logo=postgresql)](https://www.postgresql.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248.svg?logo=mongodb)](https://www.mongodb.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg?logo=docker)](https://www.docker.com)

## Overview
**ResearchSphere AI** is an enterprise-grade AI-Powered Research Funding & Innovation Intelligence Platform designed to connect academic research, patents, innovation trends, and funding opportunities. By aggregating metadata from open academic repositories (OpenAlex, CrossRef, Semantic Scholar) and patent databases (USPTO, Google Patents, The Lens), ResearchSphere AI empowers researchers, tech startups, university tech transfer offices, and enterprise R&D teams to accelerate technology commercialization and secure strategic funding.

---

## Key Milestone 1 Features & Achievements
- **System Architecture & Design Docs**: Complete design documentation, ER diagrams, UI wireframes, and workflow specifications.
- **Enterprise Relational & Document Data Layer**: Hybrid persistence engine utilizing PostgreSQL 16 (11 tables) for structured entities and MongoDB 7 for raw external API payload caching.
- **FastAPI Clean Architecture**: Layered backend using Pydantic v2 schemas, SQLAlchemy 2.0 ORM models, Repository pattern, and Service layer abstractions.
- **JWT Authentication & RBAC**: OAuth2 Bearer token authentication with bcrypt password hashing and Role-Based Access Control (`researcher`, `startup_founder`, `innovation_manager`, `administrator`).
- **Research Profile Management**: Full CRUD operations for research domains, technology keywords, publication links, and patent references.
- **Dataset Integration Services**: Real-time connectors and caching services for OpenAlex, CrossRef, Semantic Scholar, USPTO, Google Patents, and The Lens.
- **Modern Glassmorphic React Frontend**: React + Vite UI with Tailwind CSS, Lucide icons, responsive navigation, dark theme, and 9 interactive screens.
- **Docker Containerization**: Multi-container setup orchestrating Backend, Frontend, PostgreSQL, and MongoDB.

---

## Tech Stack Overview

| Component | Technology / Library |
| :--- | :--- |
| **Frontend UI** | React, Vite, Tailwind CSS, Lucide React, Axios, React Router DOM |
| **Backend API** | Python 3.11+, FastAPI, Uvicorn, Pydantic v2, HTTPX |
| **Database** | PostgreSQL 16 (Primary Relational), MongoDB 7 (Raw API Payload Cache) |
| **ORM & Migrations**| SQLAlchemy 2.0, Alembic |
| **Security & Auth** | JWT (PyJWT / Python-Jose), Passlib (Bcrypt), OAuth2 Bearer Guards |
| **DevOps & Containers**| Docker, Docker Compose |

---

## Quick Start (Docker Compose)

```bash
# Clone repository
git clone https://github.com/Nithya21shree/InnovaFund-AI.git
cd InnovaFund-AI

# Start all containers (PostgreSQL, MongoDB, Backend, Frontend)
docker-compose up -d --build
```

Access services:
- **Frontend Portal**: `http://localhost:5173`
- **FastAPI OpenAPI Swagger**: `http://localhost:8000/docs`
- **Backend Health Check**: `http://localhost:8000/health`

---

## Documentation Suite

1. 📖 [**Project Planning & Workflows**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/PROJECT_PLANNING.md)
2. 🏗️ [**Architecture Guide**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/ARCHITECTURE_GUIDE.md)
3. 🗄️ [**Database Guide & ER Diagram**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/DATABASE_GUIDE.md)
4. 🎨 [**UI / UX Wireframes Guide**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/UI_UX_WIREFRAMES.md)
5. 📡 [**REST API Reference Guide**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/API_GUIDE.md)
6. 📁 [**Folder Structure Guide**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/FOLDER_STRUCTURE_GUIDE.md)
7. 🚀 [**Installation & Deployment Guide**](file:///c:/Users/mayan/OneDrive/Documents/GitHub/InnovaFund-AI/docs/INSTALLATION_GUIDE.md)
