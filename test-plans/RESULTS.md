# UI audit results

**Latest run: 2026-06-25** — full stack (Fastify :8080 + Flask LLM :5000 +
Vite :5174), live `gemma4:cloud`.

## Outcome

| Plan  | Area                       | Result            |
| ----- | -------------------------- | ----------------- |
| TP-01 | Auth                       | PASS              |
| TP-02 | Recipes search + generate  | PASS w/ findings  |
| TP-03 | Home                       | PASS w/ findings  |
| TP-04 | Chat assistant             | PASS (endpoint) / not confirmed (UI) |
| TP-05 | UI/UX audit                | FAIL              |

## What works (verified live)

- Registration persists to SQLite (UUID id, bcrypt hash, seeded meal plan).
- Wrong-password login returns 400.
- Ingredient add + Search round-trips to the backend.
- **Generate**: `POST :5000/recipes/addRecipesByIngredients` → Ollama Cloud →
  4 recipes persisted via the backend, returned 200 in ~32s.
- **Chat**: `POST :5000/chat` → coherent `gemma4:cloud` reply, 200.
- Home and Recipes render with 0 console errors.

## Evidence (playwright/screenshots/)

- `TP-03-home.png` — Home, clean.
- `TP-02-recipes-empty.png` — Recipes initial empty state.
- `TP-02-search-empty.png` — Search with no matches → Generate button.
- `TP-02-generated-recipes.png` — generated cards (shows F1/F2).
- `TP-05-recipes-mobile.png` — 390px width (shows F3).

## Findings

| ID | Sev | Area | Description | Where |
| -- | --- | ---- | ----------- | ----- |
| F1 | High | LLM parse | Recipe **titles** mis-parsed for gemma4: include literal `**…**` and a junk first "card" `"...recipe titles containing egg:"`. Original `titles = [x[3:] for x in response]` assumes a `"1. "` numbered list; gemma4 returns a preamble + `**bold**` titles. | `OllamaAPI/app.py` (`add_recipes_by_ingredients`), `recipe_parser.py` |
| F2 | High | LLM parse | Recipe **descriptions** lose their first 1–3 chars ("ic Fluffy…", "ourmet…", "ssic…") and run all sections together; `**` markers leak into output. Brittle `response.find("**Description:**")` offset math. | `OllamaAPI/recipe_parser.py` |
| F3 | High | Responsive | At 390px the 3-column layout does not stack — columns stay side-by-side, text wraps to one char per line, content unusable. | `packages/frontend` Recipes layout (SimpleGrid/Grid cols) |
| F4 | Med | States | Empty Ingredient List, empty Found Recipes, and empty Recipe panel are blank — no empty-state guidance. (Correction: a loading indicator **does** exist — the Generate button shows a dots `<Loader>` and is `disabled` while generating; my initial "no loading state" note was wrong, observed only post-completion.) | Recipes components (`RecipesCard.tsx`) |
| F5 | Med | Data | Home "Today's Plan" shows hardcoded sample data (Cereal/Steak/Sleep); Home Stats empty when logged out — not wired to real user data. | Home components |
| F6 | Low | Test gap | Chat panel open/send not confirmed through the UI (launcher click didn't open panel via MCP selector). Endpoint verified directly. | TP-04 follow-up |
| F7 | Low | a11y | Icon-only buttons (+ / − / Search / chat) lack accessible names in the snapshot; verify labels/aria. | shared components |

## Resolution (2026-06-25, same day)

- **F1+F2 — FIXED.** Generation rewritten to a single JSON call: the model
  returns `{recipes: [...]}` with explicit field names; `generate_json()` strips
  code fences; `recipe_parser.py` deleted. Verified live — clean titles,
  descriptions, integer macros, structured ingredients/steps.
- **F3 — FIXED.** `SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}` + removed fixed
  heights in both `Recipes.tsx` and `Home.tsx`. Verified: stacks cleanly at
  390px. Also fixed a stray `<h1>` wrapping the whole Recipes page.
- **F4 — FIXED.** Empty-state hints added to all three Recipes panels. (Loading
  state already existed; original note corrected above.)
- **F5 — FIXED.** `AuthContext` rehydrates `curentUser` from localStorage;
  `TodayPlan` reads `curentUser.mealPlan[today]`; BarChart `dataKey` `month`→`day`;
  logged-out cards show "Log in to see…". Also corrected the frontend
  `MealPlanDay` type (lunch/dinner/snacks were mistyped).

## Remaining follow-ups

- **F6** — re-confirm chat panel open/send through the UI (endpoint verified).
- **F7** — dedicated a11y pass: accessible names on icon-only buttons.
