# @nutrisha/backend

Fastify + TypeScript + MongoDB backend. This is a port of the original Spring
Boot service (`/auth`, `/users`, `/recipes` endpoints), preserving the same
routes, status codes, and behavior so the existing frontend works unchanged.

## Requirements

- Node.js >= 20.11
- A running MongoDB instance (defaults to `mongodb://127.0.0.1:27017`,
  database `nutrition_assistant`)

## Configuration

Copy `.env.example` to `.env` and adjust as needed. Defaults mirror the old
Spring Boot setup: server on port `8080`, local MongoDB.

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
