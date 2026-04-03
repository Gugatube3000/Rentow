"""
RentEscrow Backend — Escrow Router

REST API endpoints for reading escrow data from the blockchain.
Write operations (create, confirm, release, rate) happen client-side
via wallet signing — the backend is read-only.
"""

from fastapi import APIRouter, HTTPException
from app.services.blockchain import BlockchainService

router = APIRouter(prefix="/api/escrows", tags=["Escrows"])

# Lazy-initialised service (created on first request)
_service: BlockchainService | None = None


def _get_service() -> BlockchainService:
    global _service
    if _service is None:
        _service = BlockchainService()
    return _service


# ── Endpoints ────────────────────────────────────────────────


@router.get("/")
async def list_escrows():
    """List all escrow contract addresses."""
    svc = _get_service()
    try:
        addresses = svc.get_all_escrows()
        return {
            "total": len(addresses),
            "escrows": addresses,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_stats():
    """Platform-wide statistics."""
    svc = _get_service()
    try:
        total = svc.get_total_escrows()
        connected = svc.is_connected()
        return {
            "connected": connected,
            "totalEscrows": total,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user/{wallet}")
async def get_user_escrows(wallet: str):
    """Get all escrows for a specific wallet address."""
    svc = _get_service()
    try:
        addresses = svc.get_user_escrows(wallet)
        # Fetch details for each escrow
        details = [svc.get_escrow_details(addr) for addr in addresses]
        return {
            "wallet": wallet,
            "total": len(details),
            "escrows": details,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{address}")
async def get_escrow_details(address: str):
    """Get full details of a specific escrow contract."""
    svc = _get_service()
    try:
        details = svc.get_escrow_details(address)
        if "error" in details:
            raise HTTPException(status_code=404, detail=details["error"])
        return details
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
