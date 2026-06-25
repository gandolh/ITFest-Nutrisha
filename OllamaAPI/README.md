# OllamaAPI

Flask service that generates recipe details and chat responses using **Ollama
Cloud**. It does not access the database directly — new recipes are persisted
through the Node/Fastify backend, which owns the SQLite database.

## Structure

| File                | Responsibility                                              |
| ------------------- | ----------------------------------------------------------- |
| `app.py`            | Flask app and HTTP routes                                   |
| `config.py`         | Environment / `.env` configuration                          |
| `ollama_client.py`  | Ollama Cloud client (Bearer API key)                        |
| `recipe_parser.py`  | Parse the LLM template response into a structured recipe    |
| `backend_client.py` | Read/write recipes via the Node backend REST API            |

## Setup

```bash
cd OllamaAPI
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # then fill in OLLAMA_API_KEY
python app.py
```

## Configuration

See `.env.example`:

- `OLLAMA_HOST` / `OLLAMA_API_KEY` / `OLLAMA_MODEL` — Ollama Cloud access
- `BACKEND_URL` — Node/Fastify backend base URL (default `http://localhost:8080`)
- `PORT` — Flask port (default `5000`)

## Endpoints

- `POST /recipes/addRecipesByIngredients` — generate 3 recipes from a list of
  ingredients and store them via the backend
- `POST /chat` — free-form chat with the model
- `GET /health`
