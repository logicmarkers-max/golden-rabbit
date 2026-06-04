# Golden Rabbit - Backend (Starter)

This is a minimal Node.js + Express starter for the Golden Rabbit project. It includes:

- Basic Express server
- PostgreSQL `pg` pool connection (configure via `DATABASE_URL`)
- Authentication routes (register/login) using bcrypt + JWT
- A simple products route returning mock data

Quickstart
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:

```powershell
cd golden-rabbit-backend
npm install
```

3. Start development server:

```powershell
npm run dev
```

API endpoints
- GET /api/health - health check
- POST /api/auth/register - register user (requires `email`, `password`)
- POST /api/auth/login - login (returns JWT)
- GET /api/products - list products (mock)

Database & migrations
1. Set `DATABASE_URL` in `.env` to point to your Postgres database (e.g. `postgresql://user:password@localhost:5432/golden_rabbit_db`).
2. Run migrations:

```powershell
npm run migrate
```

This creates `users`, `refresh_tokens`, and `products` tables.

Notes
- The authentication endpoints expect a PostgreSQL database if `DATABASE_URL` is set. If you don't have a DB yet, use the endpoints as references and wire your DB later.
- Replace `JWT_SECRET` with a strong random value in production.

Next steps I can take for you:
- Add a migration script and example SQL schema for Postgres
- Implement more APIs (cart, orders) and tests
- Wire CI and Dockerfile

