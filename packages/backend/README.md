# @nutrisha/backend

Fastify + TypeScript backend backed by a local **SQLite** database. This is a
port of the original Spring Boot service (`/auth`, `/users`, `/recipes`
endpoints), preserving the same routes, status codes, and behavior so the
existing frontend works unchanged.

## Requirements

- Node.js >= 20.11

No external database server is needed — data is stored in a local SQLite file
(created automatically on first run, default `./data/nutrisha.db`).

## Configuration

Copy `.env.example` to `.env` and adjust as needed. Defaults: server on port
`8080`, SQLite file at `./data/nutrisha.db`.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start with hot reload (`tsx watch`)  |
| `npm run build` | Type-check and compile to `dist/`    |
| `npm start`     | Run the compiled server              |
| `npm run lint`  | Type-check only (`tsc --noEmit`)     |

Run from the repo root with `npm run dev:backend`.

## Endpoints

- `POST /auth/login`, `POST /auth/register`, `POST /auth/google`
- `GET|POST /users`, `GET|PUT|DELETE /users/:id`, `POST /users/getStats`
- `GET|POST /recipes`, `GET|PUT|DELETE /recipes/:id`, `POST /recipes/byIngredients`
- `GET /health`
