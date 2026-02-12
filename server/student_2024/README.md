# Student Database 2024

## Description

The Student Database 2024 module provides semantic access to student-related documents collected during the 2024 academic year. It supports ingestion of extracted text, OCR results, and structured JSON, generates embeddings for semantic retrieval, and exposes a local service for querying and programmatic use.

This module is intended for internal search tools, chat assistants, and automated workflows that need fast semantic lookup across course materials, notices, and administrative documents.

---

## Features

- ✅ Semantic search (natural language queries)
- ✅ Persistent storage using ChromaDB
- ✅ Transformer-based embeddings (sentence-transformers)
- ✅ Supports OCR and extracted text ingestion
- ✅ Metadata preservation (source path, extraction timestamp)
- ✅ Reusable ingestion tools in `tools/` for customization
- ✅ Configurable via environment variables and CLI flags

---

## Tech Stack

| Layer | Technology | Minimum Version |
|-------|------------|-----------------|
| Vector DB | ChromaDB | 0.4.0 |
| Embeddings | Sentence Transformers | 2.2.0 |
| Runtime | Python | 3.8+ |
| Utilities | numpy, pillow, chromadb | see `requirements.txt` |

---

## Project Structure

```
server/student_2024/
├── ingest.py                 # Ingestion runner (uses tools/)
├── student_2024_server.py    # Local server for queries
├── requirements.txt          # Python dependencies
├── README.md                 # This file
├── storage/                  # Storage (chroma sqlite, blobs)
│   └── chroma.sqlite3
├── student_db_2024/          # Alternative DB path used by tools
├── data/                     # raw/extracted/ocr/text folders
│   ├── extracted/
│   ├── ocr/
│   └── text/
└── tools/
    ├── document_retriver.py  # helper to load/retrieve docs
    └── ingest.py             # reusable ingestion utilities
```

---

## Installation

Prerequisites:

- Python 3.8+
- pip

Install dependencies:

```bash
cd server/student_2024
pip install -r requirements.txt
```

---

## Usage

### Ingest documents

Place OCR/extracted/text/JSON files under `data/` then run:

```bash
python ingest.py
```

This will process files, generate embeddings, and write to `storage/` or `student_db_2024/` depending on config.

### Start the server

```bash
python student_2024_server.py --data-dir ./student_db_2024
```

Common options: `--host`, `--port`, `--data-dir`, `--model`.

---

## Configuration

Create a `.env` or `.chroma_env` in this folder to set runtime values. Example:

```ini
# Database storage
CHROMA_DATA_DIR=./student_db_2024

# Server
SERVER_HOST=localhost
SERVER_PORT=8002

# Embedding model
EMBEDDING_MODEL=all-MiniLM-L6-v2

# Ingestion options
BATCH_SIZE=32
```

The ingestion scripts and server will read these environment variables when present.

