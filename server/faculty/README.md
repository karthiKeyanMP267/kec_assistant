# Faculty

## Description

The Faculty Management Module is a semantic document retrieval system for managing institutional faculty policies and procedures. It enables intelligent, natural language-based querying of policy documents through ChromaDB vector embeddings and MCP integration.

The system ingests JSON policy documents, generates semantic embeddings using transformer models, and provides a FastMCP-compatible interface for querying. It's designed for institutional use cases such as leave management, promotion criteria, and travel allowance policies.

---

## Features

✅ **Semantic Search** — Query policies using natural language  
✅ **Persistent Storage** — Local ChromaDB for offline access  
✅ **Real-time Embedding** — Transformer-based vector search with sub-100ms latency  
✅ **MCP Integration** — Full Model Context Protocol compatibility  
✅ **Multiple Client Types** — Persistent, HTTP, cloud, and ephemeral modes  
✅ **Batch Processing** — Efficient ingestion of multiple documents  
✅ **Metadata Preservation** — Source tracking and audit trails  
✅ **Multi-Model Support** — Choice of embedding models (OpenAI, Cohere, Jina, etc.)  
✅ **Error Resilience** — Graceful handling of malformed documents  
✅ **SSL/TLS Support** — Secure HTTP client connections  

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Vector Database** | ChromaDB | ≥0.4.0 |
| **Embeddings** | Sentence Transformers | ≥2.2.0 |
| **Server Framework** | FastMCP | ≥0.1.0 |
| **ML Engine** | PyTorch | ≥2.0.0 |
| **Numerical Computing** | NumPy | ≥1.23.0 |
| **Protocol** | Model Context Protocol (MCP) | ≥0.9.0 |
| **Runtime** | Python | 3.8+ |

---

## Project Structure

```
server/faculty/
│
├── faculty_server.py          # FastMCP server (970 lines)
│   ├─ ChromaDB connection management
│   ├─ MCP protocol implementation
│   ├─ Vector query processing
│   └─ Client routing & authentication
│
├── ingest.py                  # ETL pipeline (240 lines)
│   ├─ JSON document parsing
│   ├─ Embedding generation
│   ├─ ChromaDB collection management
│   └─ Metadata extraction
│
├── requirements.txt           # Python dependencies
│
├── README.md                  # This documentation
│
├── faculty_db/                # Persistent storage
│   ├── chroma.sqlite3
│   └── [collection-id]/       # Vector embeddings
│
└── json_data/                 # Source documents
    ├── Circular - 188 Leave Norms.json
    ├── Faculty Quality Improvement Programme.json
    ├── NTS promotion norms.json
    ├── TA & DA Rules for Function.json
    ├── TA & DA Rules for Outside Travel.json
    └── Teaching Promotion Norms.json
```

---

## Installation

### Step 1: Prerequisites

Verify Python 3.8+ is installed:
```bash
python --version
pip --version
```

### Step 2: Navigate to Module

```bash
cd server/faculty
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

**Duration:** 3-5 minutes (includes ~500MB model download on first run)

### Step 4: Verify Installation

```bash
python -c "import chromadb; from sentence_transformers import SentenceTransformer; from fastmcp import FastMCP; print('✓ ALL OK')"
```

---

## Usage

### Ingest Policy Documents

Loads JSON files and generates embeddings:

```bash
python ingest.py
```

**Output:**
```
Loading sentence transformer model: all-MiniLM-L6-v2
Initializing ChromaDB at: ./faculty_db
Created collection: policy_documents

Found 6 JSON files
  - Loading: Circular - 188 Leave Norms.json
  - Loading: Faculty Quality Improvement Programme.json
  [...]
Total documents loaded: 247
Generating embeddings...
✓ Ingestion complete
```

### Start the Server

#### Persistent Mode (Recommended)

```bash
python faculty_server.py --client-type persistent --data-dir ./faculty_db
```

**Use for:** Single-machine deployment, local development

#### HTTP Mode

```bash
python faculty_server.py --client-type http --host localhost --port 8000
```

**Use for:** Distributed systems, multiple clients



### Environment Variables

Create `.chroma_env`:

```bash
# Database
CHROMA_CLIENT_TYPE=persistent
CHROMA_DATA_DIR=./faculty_db

# Server
CHROMA_HOST=localhost
CHROMA_PORT=8000
CHROMA_SSL=true

# Cloud (optional)
CHROMA_TENANT=production
CHROMA_DATABASE=faculty_db
CHROMA_API_KEY=sk_prod_xxxxx

# Embedding
EMBEDDING_MODEL=all-MiniLM-L6-v2
COLLECTION_NAME=policy_documents
```

### Server Parameters

```bash
python faculty_server.py [OPTIONS]
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `--client-type` | str | `persistent` | persistent, ephemeral, http, or cloud |
| `--data-dir` | str | `./faculty_db` | Data directory for persistent storage |
| `--host` | str | `localhost` | HTTP server host |
| `--port` | int | `8000` | HTTP server port |
| `--ssl` | bool | `true` | Enable SSL/TLS |



