# TP-04 — Chat assistant

Run setup & fixtures: [../playwright/README.md](../playwright/README.md).

## Goal
Verify the chat assistant reaches the live LLM and returns a response.

## Cases
1. **Launcher** — a floating chat button is visible bottom-right on `/recipes`.
2. **Open panel** — clicking it opens the chat panel with an input.
3. **Send + reply (live LLM)** — send a prompt; a coherent model reply appears.
4. **Endpoint** — `POST :5000/chat` returns 200 with a non-empty string.

## Pass criteria
Chat opens, sends, and shows a model reply.

> Last run: case 4 verified directly (200, coherent reply). Cases 2–3 not
> confirmed via UI — the launcher click did not open the panel through the MCP
> selector; needs a follow-up with the panel's actual control. See RESULTS.md F6.
