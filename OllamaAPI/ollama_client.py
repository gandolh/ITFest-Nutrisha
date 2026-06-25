"""Thin wrapper around the Ollama client, configured for Ollama Cloud.

Authentication uses an API key passed as a Bearer token, so the same code works
against Ollama Cloud (https://ollama.com) or a local Ollama instance (where the
key may be left empty).
"""
from ollama import Client

from config import OLLAMA_API_KEY, OLLAMA_HOST, OLLAMA_MODEL

_headers = {"Authorization": f"Bearer {OLLAMA_API_KEY}"} if OLLAMA_API_KEY else None
_client = Client(host=OLLAMA_HOST, headers=_headers)


def generate(prompt: str) -> str:
    """Generate a completion for ``prompt`` and return the response text."""
    result = _client.generate(model=OLLAMA_MODEL, prompt=prompt)
    return result.get("response", "")
