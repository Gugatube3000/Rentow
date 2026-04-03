"""
RentEscrow Backend — Blockchain Service

Reads on-chain data from the EscrowFactory and individual RentEscrow contracts
via Web3.py.
"""

import json
import os
from pathlib import Path
from web3 import Web3
from web3.exceptions import ContractLogicError

from app.config import get_settings

# ── ABI Loading ──────────────────────────────────────────────

ABI_DIR = Path(__file__).parent.parent / "abis"


def _load_abi(filename: str) -> list:
    """Load a contract ABI from the abis/ directory."""
    path = ABI_DIR / filename
    with open(path) as f:
        return json.load(f)


# ── Service ──────────────────────────────────────────────────


class BlockchainService:
    """
    Stateless service that reads blockchain data.
    All methods are read-only (no private keys needed).
    """

    def __init__(self):
        settings = get_settings()
        self.w3 = Web3(Web3.HTTPProvider(settings.RPC_URL))
        self.factory_address = Web3.to_checksum_address(settings.FACTORY_ADDRESS)

        # Load ABIs
        self.factory_abi = _load_abi("EscrowFactory.json")
        self.escrow_abi = _load_abi("RentEscrow.json")

        # Factory contract instance
        self.factory = self.w3.eth.contract(
            address=self.factory_address,
            abi=self.factory_abi,
        )

    def is_connected(self) -> bool:
        """Check if the Web3 provider is connected."""
        return self.w3.is_connected()

    # ── Factory Reads ────────────────────────────────────────

    def get_all_escrows(self) -> list[str]:
        """Return all deployed escrow addresses."""
        return self.factory.functions.getAllEscrows().call()

    def get_user_escrows(self, wallet: str) -> list[str]:
        """Return escrow addresses linked to a particular wallet."""
        addr = Web3.to_checksum_address(wallet)
        return self.factory.functions.getEscrows(addr).call()

    def get_total_escrows(self) -> int:
        """Total number of escrows ever created."""
        return self.factory.functions.totalEscrows().call()

    # ── Individual Escrow Reads ──────────────────────────────

    def get_escrow_details(self, escrow_address: str) -> dict:
        """
        Read all state from a single RentEscrow contract.
        Returns a dict with all relevant fields.
        """
        addr = Web3.to_checksum_address(escrow_address)
        contract = self.w3.eth.contract(address=addr, abi=self.escrow_abi)

        try:
            tenant = contract.functions.tenant().call()
            landlord = contract.functions.landlord().call()
            amount = contract.functions.amount().call()
            confirmed = contract.functions.confirmed().call()
            tenant_confirmed = contract.functions.tenantConfirmed().call()
            landlord_confirmed = contract.functions.landlordConfirmed().call()
            deadline = contract.functions.deadline().call()
            yield_percent = contract.functions.yieldPercent().call()
            total_rating = contract.functions.totalRating().call()
            num_ratings = contract.functions.numRatings().call()

            # Compute average rating (contract stores it * 100)
            avg_rating = 0.0
            if num_ratings > 0:
                avg_rating = round(
                    contract.functions.getAverageRating().call() / 100.0, 2
                )

            # Check contract balance
            balance = self.w3.eth.get_balance(addr)

            return {
                "address": escrow_address,
                "tenant": tenant,
                "landlord": landlord,
                "amount": str(amount),
                "amountEth": str(Web3.from_wei(amount, "ether")),
                "confirmed": confirmed,
                "tenantConfirmed": tenant_confirmed,
                "landlordConfirmed": landlord_confirmed,
                "deadline": deadline,
                "yieldPercent": yield_percent,
                "totalRating": total_rating,
                "numRatings": num_ratings,
                "averageRating": avg_rating,
                "balanceWei": str(balance),
                "balanceEth": str(Web3.from_wei(balance, "ether")),
            }
        except ContractLogicError as e:
            return {"address": escrow_address, "error": str(e)}
        except Exception as e:
            return {"address": escrow_address, "error": f"Failed to read: {str(e)}"}
