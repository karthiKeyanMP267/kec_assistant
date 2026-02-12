# KEC Assistant

Full-stack assistant with a React chat UI, a Node-based API that fronts the OpenCode SDK, and three Python semantic-retrieval services (faculty policies, student 2022 corpus, student 2024 corpus).

## Repo Layout

- [client](client): React/Vite front-end chat UI.
- [server](server): Node API wrapper for OpenCode; Express-based MCP integration.
- [server/faculty](server/faculty/README.md): Faculty policy retrieval service (Chroma + sentence-transformers).
- [server/student_2022](server/student_2022/README.md): 2022 student document retrieval service.
- [server/student_2024](server/student_2024/README.md): 2024 student document retrieval service.

## Prerequisites

- Node.js 18+ (front-end and Node API)
- Python 3.8+ (for the three retrieval services)
- OpenCode CLI and provider API keys if you want LLM-backed chat

## Quick Start (UI + Node API)

From the repo root:

```bash
npm install
npm run dev
```

- Client: http://localhost:5173 (default Vite port)
- API: see terminal output for the Node server port (health endpoint is usually /api/health)

To build just the UI: `npm run build`

## Environment Variables (Node API)

Create a .env at the repo root (mirror .env.example if present):

- OPENAI_API_KEY, ANTHROPIC_API_KEY, GROQ_API_KEY, GOOGLE_API_KEY, MISTRAL_API_KEY
- Optional: OPENCODE_PORT, OPENCODE_EAGER_START, OPENCODE_STARTUP_TIMEOUT_MS, OPENCODE_BIN

The API reads these and passes them to OpenCode. Set OPENCODE_PORT if you need a fixed port; leave unset for auto.

## Python Retrieval Services

Each service has its own README with detailed instructions. Typical flow:

```bash
cd server/<module>
pip install -r requirements.txt
python ingest.py           # build embeddings
python <module>_server.py  # start service
```

- Faculty policies: see [server/faculty/README.md](server/faculty/README.md).
- Student corpus 2022: see [server/student_2022/README.md](server/student_2022/README.md).
- Student corpus 2024: see [server/student_2024/README.md](server/student_2024/README.md).

The vector stores live under each module’s folder (chroma.sqlite3 and collection directories). These files are large; store them with Git LFS or regenerate via `python ingest.py`.

## Scripts (root workspaces)

- `npm run dev`: starts Node API and React UI together (via workspaces)
- `npm run start`: starts Node API only
- `npm run lint`: runs client lint
- `npm run build`: builds client for production

## Troubleshooting

- OpenCode CLI not found: set OPENCODE_BIN to the executable path or add your npm global bin to PATH.
- Slow first response: set OPENCODE_EAGER_START=1 to pre-warm on server start.
- Port conflicts: set OPENCODE_PORT to an available port before running `npm run dev`.
