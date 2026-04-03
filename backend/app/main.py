"""
RentEscrow Backend — FastAPI Application

Read-only REST API that indexes on-chain escrow data for the frontend.
All write transactions (create, confirm, release, rate) happen client-side
via the user's wallet.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers import escrows

# ── App Setup ────────────────────────────────────────────────

settings = get_settings()

app = FastAPI(
    title="RentEscrow API",
    description="Read-only REST API for the RentEscrow on-chain escrow protocol",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ─────────────────────────────────────────────────────

origins = [o.strip() for o in settings.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────────────

app.include_router(escrows.router)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "service": "RentEscrow API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    """Detailed health check."""
    from app.services.blockchain import BlockchainService

    try:
        svc = BlockchainService()
        connected = svc.is_connected()
    except Exception:
        connected = False

    return {
        "status": "healthy" if connected else "degraded",
        "blockchain_connected": connected,
        "chain_id": settings.CHAIN_ID,
        "factory_address": settings.FACTORY_ADDRESS,
    }
