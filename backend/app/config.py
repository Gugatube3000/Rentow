"""
RentEscrow Backend — Configuration

Loads environment variables for blockchain connectivity.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables or .env file."""

    # Blockchain RPC endpoint (Hardhat local by default)
    RPC_URL: str = "http://127.0.0.1:8545"

    # EscrowFactory contract address (set after deployment)
    FACTORY_ADDRESS: str = "0x0000000000000000000000000000000000000000"

    # Chain ID (31337 = Hardhat local, 11155111 = Sepolia)
    CHAIN_ID: int = 31337

    # CORS origins allowed
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Cached singleton settings instance."""
    return Settings()
