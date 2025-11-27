# Ayanis

Lightweight NestJS API for user authentication and task management (users, tasks). Uses TypeORM + PostgreSQL and cookie-based sessions.

**Tech stack:** Node.js, NestJS, TypeScript, TypeORM, PostgreSQL, Docker (optional)

**Project structure (key folders):**

- `src/users` — user entity, auth service and controllers
- `src/tasks` — task entity, CRUD controller and service
- `src/guards` — auth guard (session-based)
- `src/app.module.ts` — global config and TypeORM setup

**API prefix:** `/api` (see `src/main.ts`)

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (local) or Docker to run the provided `docker-compose.yml`

---

## Quick start (development)

1. Install dependencies

```bash
npm install
```

2. Start a PostgreSQL instance (choose one):

- Using Docker Compose (recommended):

```bash
docker compose up -d
```

- Or run a local Postgres and ensure credentials match the environment variables below.

3. Create an environment file — this repo loads `.env.${NODE_ENV}`. For local development set `NODE_ENV=development` and create a file named `.env.development` (or set env vars directly).

Example `.env.development`:

```bash
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=postgres
COOKIE_KEY=replace_with_a_secure_key
```

4. Run the app in watch mode

```bash
npm run start:dev
```

The server listens on `http://localhost:3000` by default and serves the API under `http://localhost:3000/api`.

---

## Database / TypeORM

- The project uses `@nestjs/typeorm` with `synchronize: true`, so TypeORM will auto-create/update tables based on entities. This is convenient for development.

---

## Authentication

- Session-based authentication using `cookie-session`. After successful `signin`/`signup`, the server stores `userId` in the session cookie.
- Auth-protected endpoints use `AuthGuard` which checks `request.session.userId`.

---

## Important endpoints (examples)

- Signup: `POST /api/users/signup` — body `{ "email": "you@example.com", "password": "pass" }`
- Signin: `POST /api/users/signin` — body same as signup
- Signout: `POST /api/users/signout`
- Create task (authenticated): `POST /api/tasks` — body `{ "title": "...", "description": "..." }`
- List tasks (authenticated): `GET /api/tasks`
- Update task (authenticated): `PATCH /api/tasks/:id` — body `{ "title": "...", "description": "..." }`
- Delete task (authenticated): `DELETE /api/tasks/:id`

`You can try the requests in the request.http files under users and tasks`

---

## Running tests

- Simple tests to showcase e2e and unit testing with mocking

```bash
npm run test
npm run test:e2e
```
