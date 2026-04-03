# RentEscrow

> **Secure Your Deposit. Earn While You Wait.**

The first decentralized escrow protocol that turns your rental security deposits into yield-bearing assets via Aave. Safe for tenants, seamless for landlords.

## 🏗️ Architecture

```
RentEscrow-main/
├── frontend/         # Next.js 16 + Wagmi + RainbowKit
├── backend/          # Python FastAPI read-only indexer API
├── blockchain/       # Solidity contracts + Hardhat
└── run_scenario.py   # Demo scenario script
```

### Frontend (Next.js)
- Wallet connection via RainbowKit + Wagmi
- On-chain escrow creation, confirmation, release, and rating
- Live blockchain data via wagmi hooks
- Glassmorphic dark-mode UI

### Backend (FastAPI)
- Read-only REST API for indexing escrow data
- Web3.py blockchain integration
- Dockerized for deployment
- See [backend/README.md](./backend/README.md)

### Smart Contracts (Solidity)
- **EscrowFactory.sol** — Creates and tracks escrow instances
- **RentEscrow.sol** — Individual escrow with dual-confirm, refund, and rating

## 🚀 Quick Start

### 1. Start Local Blockchain (optional, for testing)
```bash
cd blockchain
npm install
npx hardhat node
# In a new terminal:
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Start Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with FACTORY_ADDRESS from step 1
uvicorn app.main:app --reload --port 8000
```

### 3. Start Frontend
```bash
cd frontend
npm install
# Create .env.local with:
# NEXT_PUBLIC_FACTORY_ADDRESS=0x...
# NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

## 🔗 Environment Variables

### Frontend (.env.local)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FACTORY_ADDRESS` | Deployed EscrowFactory address |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID |

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `RPC_URL` | Blockchain RPC endpoint |
| `FACTORY_ADDRESS` | Deployed EscrowFactory address |
| `CHAIN_ID` | Network chain ID |
| `CORS_ORIGINS` | Allowed frontend origins |

## 📋 Escrow Lifecycle

1. **Create** — Tenant deploys a new escrow via Factory, depositing ETH
2. **Confirm** — Both tenant and landlord confirm the lease
3. **Release** — Funds are released to landlord (minus yield to tenant)
4. **Rate** — Tenant rates the landlord (1-5 stars)
5. **Refund** — If not confirmed by deadline, tenant can reclaim funds

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Wagmi 3, RainbowKit 2, Framer Motion
- **Backend**: Python 3.12, FastAPI, Web3.py
- **Contracts**: Solidity 0.8.20, Hardhat
- **Networks**: Ethereum Sepolia Testnet, Hardhat Local
