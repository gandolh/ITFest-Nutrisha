# TP-05 — UI/UX audit (design, responsive, a11y)

Run setup & fixtures: [../playwright/README.md](../playwright/README.md).

## Goal
Audit design fidelity, responsive behavior, states, and accessibility — not just
"it rendered".

## Cases
1. **Desktop layout** — Home and Recipes look intentional: spacing, alignment,
   typographic hierarchy.
2. **Empty states** — empty Ingredient List, empty Found Recipes, and empty
   Recipe panel communicate what to do (vs. blank panels).
3. **Loading state** — during the ~30s generate, the UI shows progress (spinner
   / disabled button / skeleton) rather than appearing frozen.
4. **Recipe cards** — titles and descriptions render cleanly (no raw markdown,
   no mid-word truncation).
5. **Responsive** — at 390px width the 3-column layout stacks into a usable
   single column.
6. **Accessibility** — icon-only buttons (+ / − / search / chat) have
   accessible names; heading levels are sensible; contrast is adequate.

## Pass criteria
Layout is intentional at desktop and mobile; states are communicated; cards are
clean; controls are labeled.

> Last run: multiple FAILs — see RESULTS.md F2 (card content), F3 (responsive),
> F4 (empty/loading states), F7 (a11y labels).
