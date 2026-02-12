# Student Database 2022

## Description

The Student Database 2022 module stores and serves student-related documents and data for the 2022 academic year. It ingests institutional documents (syllabi, regulations, exam schedules, and administrative notices), generates semantic embeddings for retrieval, and exposes a local server for querying and programmatic access.

This module is intended for use in internal tools, search interfaces, and automated assistants that need semantic access to student documents from 2022.

---

## Features

- ✅ Semantic search over student documents (natural-language queries)
- ✅ Persistent local vector store using ChromaDB
- ✅ Transformer-based embeddings via sentence-transformers
- ✅ Simple ingestion pipeline for JSON/text documents
- ✅ Metadata preservation (source file, timestamps)
- ✅ Lightweight server for query and retrieval
- ✅ Configurable via environment variables

---

## Tech Stack

| Layer | Technology | Minimum Version |
|-------|------------|-----------------|
| Vector DB | ChromaDB | 0.4.0 |
| Embeddings | Sentence Transformers | 2.2.0 |
| Runtime | Python | 3.8+ |
| Dependencies | See `requirements.txt` | — |

---

## Project Structure

```
server/student_2022/
├── ingest.py                 # Ingest pipeline for student documents
├── student_2022_server.py    # Local server to serve queries
├── requirements.txt          # Python dependencies
├── README.md                 # This file
├── student_db_2022/          # Persistent ChromaDB storage
│   ├── chroma.sqlite3
│   └── [collection-id]/
└── data/                     # (optional) extracted/ocr/text files
```

---

## Installation

Prerequisites:

- Python 3.8+
- pip

Install dependencies:

```bash
cd server/student_2022
pip install -r requirements.txt
```

---

## Usage

### Ingest documents

Place JSON or text files into the module's data directory (or `json_data/` if present), then run:

```bash
python ingest.py
```

This will parse documents, generate embeddings, and store vectors in `student_db_2022/`.

### Start the server

Run the local server to accept queries:

```bash
python student_2022_server.py --data-dir ./student_db_2022
```

Common options may include `--host`, `--port`, and client-type flags depending on the server implementation.

---

## Configuration

Create a `.env` or `.chroma_env` file in the folder to configure runtime variables. Example:

```ini
# Database
CHROMA_DATA_DIR=./student_db_2022

# Server
SERVER_HOST=localhost
SERVER_PORT=8001

# Embedding model
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

Adjust variables to fit deployment environments. The ingestion script and server read environment values when available.


