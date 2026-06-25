# TP-02 — Recipes: search + generate

Run setup & fixtures: [../playwright/README.md](../playwright/README.md).

## Goal
Verify the core loop: add ingredients, search the backend, and generate new
recipes via the live LLM (Flask → Ollama Cloud → backend).

## Cases
1. **Add ingredient** — type "egg", add it; it appears as a chip in the
   Ingredient List.
2. **Search (empty DB)** — click Search; with a fresh DB, no recipes are found
   and a "Generate new recipes" button appears.
3. **Generate (live LLM)** — click Generate; after ~30s, recipe cards appear in
   "Found Recipes".
4. **Persistence** — `GET /recipes` returns the generated recipes.
5. **Parsing correctness** — each recipe has a clean title (no `**` markdown, no
   leading preamble), a description, ingredients, steps, and 4 nutrition numbers.

## Pass criteria
Generate returns 200 and recipes persist. Titles and bodies are cleanly parsed.

> Known FAIL as of last run: case 5 — titles include literal `**` and a junk
> "...recipe titles containing egg:" preamble; descriptions are truncated at the
> first character. See RESULTS.md F1/F2.
