# TP-01 — Auth (register / login)

Run setup & fixtures: [../playwright/README.md](../playwright/README.md).

## Goal
Verify a user can register and that the account is persisted to SQLite, and that
login validates credentials.

## Cases
1. **Register** — fill first/last name, email, password + confirm, height,
   weight; submit. Expect redirect to `/login`.
2. **Persistence** — `GET /users` returns the new user with a UUID id, a bcrypt
   password hash, and a seeded 7-day meal plan.
3. **Login (wrong password)** — `POST /auth/login` with a bad password returns
   400.
4. **Login page render** — `/login` renders the form (note: crashes with
   "Missing required parameter client_id" when `VITE_GOOGLE_CLIENT_ID` is unset).

## Pass criteria
Register redirects and the user exists in the DB via the API. Wrong-password
login returns 400. Login-page OAuth crash is acceptable only when OAuth is
intentionally unconfigured.
