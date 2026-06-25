"""Flask LLM service.

Generates recipe details and chat responses via Ollama Cloud, and persists new
recipes through the Node/Fastify backend (which owns the SQLite database).
"""
from flask import Flask, request
from flask_cors import CORS, cross_origin

import backend_client
import ollama_client
from config import PORT
from recipe_parser import build_recipe_prompt, parse_recipe

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


def _generate_and_store_recipe(title: str, existing_titles: set[str]):
    """Generate a recipe for ``title`` and store it, skipping duplicates."""
    if title in existing_titles:
        return None
    response = ollama_client.generate(build_recipe_prompt(title))
    recipe = parse_recipe(title, response)
    return backend_client.add_recipe(recipe)


@app.route("/recipes/addRecipesByIngredients", methods=["POST"])
@cross_origin()
def add_recipes_by_ingredients():
    ingredients = request.json

    if not ingredients or len(ingredients) < 1:
        return "Please provide at least one ingredient.", 400

    prompt = (
        "Give me 3 recipe titles that contain the following ingredients: "
        + " ".join(ingredients)
        + "."
    )
    response = ollama_client.generate(prompt)
    titles = [line[3:] for line in response.split("\n") if line.strip()]

    existing_titles = backend_client.get_existing_titles()

    added = []
    for title in titles:
        recipe = _generate_and_store_recipe(title, existing_titles)
        if recipe is not None:
            added.append(recipe)

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
