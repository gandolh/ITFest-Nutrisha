# TP-03 — Home: welcome / plan / stats

Run setup & fixtures: [../playwright/README.md](../playwright/README.md).

## Goal
Verify the Home screen renders its three sections without errors.

## Cases
1. **Render** — `/` shows the welcome card (time-of-day greeting + image),
   "Today's Plan", and "Home Stats".
2. **No console errors** — page loads with 0 console errors.

## Pass criteria
All three sections render; console is clean.

> Note: Today's Plan shows hardcoded sample data (Cereal / Steak / Sleep) and
> Home Stats is empty for a logged-out user — see RESULTS.md F5.
