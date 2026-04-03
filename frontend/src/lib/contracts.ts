/**
 * Smart contract ABIs and addresses for RentEscrow
 */

// ── EscrowFactory ABI ─────────────────────────────────────
export const ESCROW_FACTORY_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'escrowAddress', type: 'address' },
      { indexed: true, name: 'tenant', type: 'address' },
      { indexed: true, name: 'landlord', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'durationSeconds', type: 'uint256' },
      { indexed: false, name: 'yieldPercent', type: 'uint256' },
    ],
    name: 'EscrowCreated',
    type: 'event',
  },
  {
    inputs: [
      { name: '_landlord', type: 'address' },
      { name: '_durationSeconds', type: 'uint256' },
      { name: '_yieldPercent', type: 'uint256' },
    ],
    name: 'createEscrow',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllEscrows',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_user', type: 'address' }],
    name: 'getEscrows',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalEscrows',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ── RentEscrow Contract ABI ───────────────────────────────
export const RENT_ESCROW_ABI = [
  {
    inputs: [
      { name: '_landlord', type: 'address' },
      { name: '_durationSeconds', type: 'uint256' },
      { name: '_yieldPercent', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'by', type: 'address' },
      { indexed: false, name: 'tenantConfirmed', type: 'bool' },
      { indexed: false, name: 'landlordConfirmed', type: 'bool' },
    ],
    name: 'Confirmed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Deposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'by', type: 'address' },
      { indexed: false, name: 'score', type: 'uint256' },
    ],
    name: 'Rated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'value', type: 'uint256' }],
    name: 'Refunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: false, name: 'yield', type: 'uint256' },
    ],
    name: 'Released',
    type: 'event',
  },
  // View functions
  {
    inputs: [],
    name: 'amount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'confirmed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deadline',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAverageRating',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumRatings',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'landlord',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'landlordConfirmed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numRatings',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tenant',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tenantConfirmed',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalRating',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'yieldPercent',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Write functions
  {
    inputs: [],
    name: 'confirmLease',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'score', type: 'uint256' }],
    name: 'rateLandlord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'releaseFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ── ERC-20 Minimal ABI (for approve flow) ─────────────────
export const ERC20_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ── Aave V3 Pool ABI (core functions) ─────────────────────
export const AAVE_POOL_ABI = [
  {
    inputs: [
      { name: 'asset', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'onBehalfOf', type: 'address' },
      { name: 'referralCode', type: 'uint16' },
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'asset', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'interestRateMode', type: 'uint256' },
      { name: 'referralCode', type: 'uint16' },
      { name: 'onBehalfOf', type: 'address' },
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'asset', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'to', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserAccountData',
    outputs: [
      { name: 'totalCollateralBase', type: 'uint256' },
      { name: 'totalDebtBase', type: 'uint256' },
      { name: 'availableBorrowsBase', type: 'uint256' },
      { name: 'currentLiquidationThreshold', type: 'uint256' },
      { name: 'ltv', type: 'uint256' },
      { name: 'healthFactor', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ── Contract Addresses ────────────────────────────────────
// These are set via environment variables for flexibility across networks
export const ADDRESSES = {
  // EscrowFactory — the main entry point
  ESCROW_FACTORY: (process.env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    '0x5FbDB2315678afecb367f032d93F642f64180aa3') as `0x${string}`,

  // Aave V3 on Sepolia
  AAVE_POOL: '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951' as `0x${string}`,
  AAVE_UI_DATA_PROVIDER: '0x69529987FA4A075D0C00B0128fa848dc71c9032e' as `0x${string}`,

  // Test tokens on Sepolia
  USDC: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8' as `0x${string}`,
  DAI: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357' as `0x${string}`,
  WETH: '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c' as `0x${string}`,
} as const;

// ── Token metadata ────────────────────────────────────────
export const TOKENS = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: ADDRESSES.USDC,
    decimals: 6,
    icon: '💵',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: ADDRESSES.DAI,
    decimals: 18,
    icon: '🟡',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: ADDRESSES.WETH,
    decimals: 18,
    icon: '⟠',
  },
] as const;
