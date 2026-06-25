# Playwright hub — how to run the UI audit

This is the "how to run" companion to the test plans in
[`../test-plans/`](../test-plans/index.md). The plans say *what* to verify; this
file says *how* to bring the app up and drive it.

## Architecture (3 services + LLM)

| Service            | Port | Stack                         | Start from           |
| ------------------ | ---- | ----------------------------- | -------------------- |
| Frontend           | 5173 | React + Vite                  | repo root            |
| Backend (CRUD)     | 8080 | Fastify + SQLite              | repo root            |
| LLM service        | 5000 | Flask + Ollama Cloud          | `OllamaAPI/`         |
| Ollama Cloud       | —    | `gemma4:cloud` (remote)       | (external, API key)  |

The frontend talks to the backend (`:8080`) for CRUD and to the Flask service
(`:5000`) for recipe generation + chat. Flask persists generated recipes back
through the backend; it does **not** touch the database directly.

> If port 5173 is taken, Vite falls back to 5174 — check the dev server output
> and use the printed URL.

## Bring up a test stack

Use a **throwaway SQLite DB** so the audit never touches real data:

```bash
# 1. Backend on a disposable DB
DATABASE_PATH=./packages/backend/data/audit.db npm run dev:backend

# 2. LLM service (needs OllamaAPI/.env with a real OLLAMA_API_KEY)
cd OllamaAPI
python -m venv .venv && ./.venv/Scripts/python.exe -m pip install -r requirements.txt
./.venv/Scripts/python.exe app.py

# 3. Frontend
npm run dev:frontend
```

Verify health before driving the UI:

```bash
curl -s http://localhost:8080/health   # {"status":"ok"}
curl -s http://localhost:5000/health   # {"status":"ok"}
```

## Fixtures

- **Fresh DB** starts empty (no users, no recipes). The first ingredient Search
  returns no matches, which is the intended trigger for "Generate new recipes".
- **Test user** (create via Register UI or `POST /auth/login`):
  `playwright@test.co` / `password123`.
- **LLM is live** when `OLLAMA_API_KEY` is set. A `generate` call takes ~30s
  (3 recipes); a `chat` call ~5–15s. Without a key the LLM routes will error —
  run only the non-LLM plans (TP-01, TP-03) in that case.

## Routes

| URL          | Screen                                          |
| ------------ | ----------------------------------------------- |
| `/`          | Home — welcome card, Today's Plan, Home Stats   |
| `/recipes`   | Recipes — ingredient list, search, generate, chat |
| `/login`     | Login (Google OAuth — needs `VITE_GOOGLE_CLIENT_ID`) |
| `/register`  | Register form                                   |

## Conventions

- **Screenshots** → `screenshots/<plan-id>-<step>.png` (gitignored). MCP tools
  drop shots at the repo root; move them into `screenshots/` at the end.
- **Selectors**: this MCP build rejects `[ref=…]` targets — use plain CSS
  (`input[placeholder="…"]`, `button:has-text("…")`).
- **Benign console noise**: the Login page throws
  *"Missing required parameter client_id"* unless `VITE_GOOGLE_CLIENT_ID` is set
  — expected in audit runs without OAuth configured.
- **Verify round-trips two ways**: confirm a UI action in the UI *and* via the
  backend API (e.g. `curl http://localhost:8080/recipes` after a generate).

## Tear down

```bash
# stop the three dev servers, then:
rm -f packages/backend/data/audit.db packages/backend/data/audit.db-*
rm -rf .playwright-mcp
```
