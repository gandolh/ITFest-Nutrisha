"""Runtime configuration loaded from environment / .env."""
import os

from dotenv import load_dotenv

load_dotenv()

# Ollama Cloud: host + bearer API key. Model is configurable.
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "https://ollama.com")
OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY", "")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma3")

# The Node/Fastify backend that owns the SQLite database. This service no longer
# touches the database directly; it reads/writes recipes through the backend.
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8080")

# Flask server
PORT = int(os.getenv("PORT", "5000"))
