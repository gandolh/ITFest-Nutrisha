"""Thin wrapper around the Ollama client, configured for Ollama Cloud.

Authentication uses an API key passed as a Bearer token, so the same code works
against Ollama Cloud (https://ollama.com) or a local Ollama instance (where the
key may be left empty).
"""
from ollama import Client

from config import OLLAMA_API_KEY, OLLAMA_HOST, OLLAMA_MODEL

_headers = {"Authorization": f"Bearer {OLLAMA_API_KEY}"} if OLLAMA_API_KEY else None
_client = Client(host=OLLAMA_HOST, headers=_headers)


def generate(prompt: str, fmt: dict | str | None = None) -> str:
    """Generate a completion for ``prompt`` and return the response text.

    Pass ``fmt="json"`` (or a JSON Schema dict) to request JSON output.
    """
    result = _client.generate(model=OLLAMA_MODEL, prompt=prompt, format=fmt)
    return result.response


def generate_json(prompt: str, schema: dict | None = None) -> str:
    """Generate JSON output and strip any markdown code fences.

    Ollama Cloud returns JSON wrapped in ```json ... ``` fences and does not
    strictly enforce the schema, so we request JSON and clean the fences here;
    the caller's prompt is the authoritative description of the JSON shape.
    """
    text = generate(prompt, fmt=schema or "json").strip()
    if text.startswith("```"):
        # Drop the opening fence line (``` or ```json) and the closing fence.
        text = text.split("\n", 1)[1] if "\n" in text else text
        if text.endswith("```"):
            text = text[: -3]
        text = text.strip().removeprefix("json").strip()
    return text
