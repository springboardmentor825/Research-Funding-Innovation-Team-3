\# Database Setup — InnovaFund Backend



This project uses PostgreSQL (via SQLAlchemy) and MongoDB, both run locally through Docker Compose. Non-standard ports are used to avoid clashing with any Postgres/Mongo you may already have installed.



\## 1. Start the databases



From the project root (where `docker-compose.yml` lives):



&#x20;   docker-compose up -d



This starts two containers:

\- `innovafund-postgres` — Postgres 16, exposed on host port \*\*5433\*\* (maps to container's 5432)

\- `innovafund-mongo` — MongoDB 7, exposed on host port \*\*27018\*\* (maps to container's 27017)



Check both are running:



&#x20;   docker ps



\## 2. Configure environment variables



Copy the example env file and fill it in:



&#x20;   cd backend

&#x20;   copy .env.example .env



The default values in `.env.example` already match the Docker Compose credentials above, so for local dev you usually don't need to change `DATABASE\_URL` or `MONGO\_URL` — only replace `SECRET\_KEY` with your own random string.



\## 3. Verify the connection



Start the backend:



&#x20;   uvicorn main:app --reload



Then check:



&#x20;   GET http://localhost:8000/health



A response of `{"status": "ok", "database": "connected"}` confirms Postgres is reachable. MongoDB isn't checked by `/health` yet — it's implicitly verified when you hit `/profile`.



\## Notes

\- `.env` is gitignored — never commit real secrets.

\- If you already run Postgres/Mongo locally on the default ports, the custom ports here (5433, 27018) avoid conflicts — no need to stop your existing services.

\- Container data persists in named Docker volumes (`postgres\_data`, `mongo\_data`), so restarting containers won't wipe data — use `docker-compose down -v` only if you intentionally want a clean slate.

