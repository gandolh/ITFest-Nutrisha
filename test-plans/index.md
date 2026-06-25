# Nutrisha — UI test plans

Plain-text plans describing **what** to verify in the UI. The **how** (bring-up,
fixtures, routes, conventions) lives in [`../playwright/README.md`](../playwright/README.md).

## How a run works

1. Bring up the test stack (backend + Flask LLM + frontend) per the Playwright hub.
2. Verify `/health` on `:8080` and `:5000`.
3. Walk each plan's cases in order, performing real interactions.
4. Screenshot key states to `playwright/screenshots/<plan-id>-<step>.png`.
5. Confirm round-trips both in the UI and via the backend API.
6. Record outcomes in [`RESULTS.md`](RESULTS.md); file durable findings.

## Plans

| ID    | Area                          | LLM needed |
| ----- | ----------------------------- | ---------- |
| TP-01 | Auth (register / login)       | no         |
| TP-02 | Recipes: search + generate    | yes        |
| TP-03 | Home: welcome / plan / stats  | no         |
| TP-04 | Chat assistant                | yes        |
| TP-05 | UI/UX audit (design, responsive, a11y) | no |
