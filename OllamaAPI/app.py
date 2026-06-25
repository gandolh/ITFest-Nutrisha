"""Flask LLM service.

Generates recipe details and chat responses via Ollama Cloud, and persists new
recipes through the Node/Fastify backend (which owns the SQLite database).
"""
import json

from flask import Flask, request
from flask_cors import CORS, cross_origin

import backend_client
import ollama_client
from config import PORT
from schema import RECIPES_SCHEMA

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/recipes/addRecipesByIngredients", methods=["POST"])
@cross_origin()
def add_recipes_by_ingredients():
    ingredients = request.json

    if not ingredients or len(ingredients) < 1:
        return "Please provide at least one ingredient.", 400

    # Single JSON call returning 3 complete recipes. The prompt spells out the
    # exact field names so no free-text parsing is needed; the schema is passed
    # as a hint and code fences are stripped by generate_json().
    prompt = (
        "Generate 3 distinct recipes that use these ingredients: "
        + ", ".join(ingredients)
        + ".\nReturn ONLY a JSON object of the form:\n"
        '{"recipes": [{"title": string, "description": string, '
        '"calories": integer, "protein": integer, "fat": integer, '
        '"carbohydrate": integer, '
        '"ingredients": [{"amount": string, "name": string}], '
        '"steps": [{"order": integer, "description": string}]}]}\n'
        "Use exactly these field names."
    )
    response = ollama_client.generate_json(prompt, RECIPES_SCHEMA)

    try:
        recipes = json.loads(response).get("recipes", [])
    except (json.JSONDecodeError, AttributeError):
        return "Failed to generate recipes.", 502

    # Drop any recipe whose title already exists, then persist the rest.
    existing_titles = backend_client.get_existing_titles()
    added = []
    for recipe in recipes:
        if recipe.get("title") in existing_titles:
            continue
        added.append(backend_client.add_recipe(recipe))

    return added


@app.route("/chat", methods=["POST"])
@cross_origin()
def chat():
    prompt = request.json["prompt"]
    return ollama_client.generate(prompt)


@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
