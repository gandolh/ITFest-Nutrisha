"""Client for the Node/Fastify backend, which owns the SQLite database.

This service no longer connects to the database directly. Recipes are read and
written through the backend's REST API.
"""
import requests

from config import BACKEND_URL


def get_existing_titles() -> set[str]:
    """Return the set of recipe titles already stored in the backend."""
    resp = requests.get(f"{BACKEND_URL}/recipes", timeout=30)
    resp.raise_for_status()
    return {recipe.get("title") for recipe in resp.json()}


def add_recipe(recipe: dict) -> dict:
    """Persist a new recipe via the backend and return the stored recipe."""
    resp = requests.post(f"{BACKEND_URL}/recipes", json=recipe, timeout=30)
    resp.raise_for_status()
    return resp.json()
