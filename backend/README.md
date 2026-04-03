# RentEscrow Backend API

Read-only REST API that indexes on-chain escrow data for the RentEscrow frontend.
All write transactions (create, confirm, release, rate) happen client-side via the user's wallet.

## Architecture

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application & CORS setup
│   ├── config.py             # Environment variable configuration
│   ├── routers/
│   │   ├── __init__.py
│   │   └── escrows.py        # /api/escrows endpoints
│   └── services/
│       ├── __init__.py
│       └── blockchain.py     # Web3 blockchain reads
├── abis/                     # Contract ABI JSON files
│   ├── EscrowFactory.json
│   └── RentEscrow.json
├── requirements.txt
├── Dockerfile
├── .env.example
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your RPC_URL and deployed FACTORY_ADDRESS
```

### 3. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

### 4. Docker deployment

```bash
docker build -t rentescrow-api .
docker run -p 8000:8000 --env-file .env rentescrow-api
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/health` | Detailed health + blockchain status |
| `GET` | `/docs` | Interactive Swagger UI |
| `GET` | `/api/escrows` | List all escrow addresses |
| `GET` | `/api/escrows/stats` | Platform statistics |
| `GET` | `/api/escrows/user/{wallet}` | Escrows for a wallet |
| `GET` | `/api/escrows/{address}` | Full escrow details |

## Deployment

This backend can be deployed on:
- **Railway** — Connect your GitHub repo, set env vars
- **Render** — Use the Dockerfile or Python buildpack
- **Fly.io** — `fly launch` with the Dockerfile
- **Any VPS** — Docker or direct uvicorn

Set `CORS_ORIGINS` to your frontend's deployed URL.
