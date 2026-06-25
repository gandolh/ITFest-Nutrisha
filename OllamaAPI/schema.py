"""JSON Schema for LLM recipe generation.

The model is constrained to emit JSON matching this schema, so no free-text
parsing is needed. The shape mirrors the backend/shared ``Recipe`` type.
"""

_INGREDIENT = {
    "type": "object",
    "properties": {
        "amount": {"type": "string"},
        "name": {"type": "string"},
    },
    "required": ["amount", "name"],
}

_STEP = {
    "type": "object",
    "properties": {
        "order": {"type": "integer"},
        "description": {"type": "string"},
    },
    "required": ["order", "description"],
}

_RECIPE = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "calories": {"type": "integer"},
        "protein": {"type": "integer"},
        "fat": {"type": "integer"},
        "carbohydrate": {"type": "integer"},
        "ingredients": {"type": "array", "items": _INGREDIENT},
        "steps": {"type": "array", "items": _STEP},
    },
    "required": [
        "title",
        "description",
        "calories",
        "protein",
        "fat",
        "carbohydrate",
        "ingredients",
        "steps",
    ],
}

RECIPES_SCHEMA = {
    "type": "object",
    "properties": {
        "recipes": {"type": "array", "items": _RECIPE},
    },
    "required": ["recipes"],
}
