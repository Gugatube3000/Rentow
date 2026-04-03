/**
 * RentEscrow — Custom React Hooks
 *
 * Wagmi hooks for reading/writing to the EscrowFactory and RentEscrow contracts.
 * Also includes a backend API fetcher for indexed data.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  usePublicClient,
} from 'wagmi';
import { parseEther, formatEther, decodeEventLog } from 'viem';
import {
  ESCROW_FACTORY_ABI,
  RENT_ESCROW_ABI,
  ADDRESSES,
} from './contracts';

// ── Types ───────────────────────────────────────────────────

export interface EscrowDetails {
  address: `0x${string}`;
  tenant: string;
  landlord: string;
  amount: bigint;
  amountEth: string;
  confirmed: boolean;
  tenantConfirmed: boolean;
  landlordConfirmed: boolean;
  deadline: bigint;
  yieldPercent: bigint;
  averageRating: number;
  numRatings: bigint;
  balanceEth: string;
}

// ── Backend API URL ─────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── Factory Hooks ───────────────────────────────────────────

/**
 * Read all escrow addresses for a specific user from the Factory.
 */
export function useUserEscrows(userAddress?: `0x${string}`) {
  return useReadContract({
    address: ADDRESSES.ESCROW_FACTORY,
    abi: ESCROW_FACTORY_ABI,
    functionName: 'getEscrows',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
      refetchInterval: 10_000,
    },
  });
}

/**
 * Read total escrow count from the Factory.
 */
export function useTotalEscrows() {
  return useReadContract({
    address: ADDRESSES.ESCROW_FACTORY,
    abi: ESCROW_FACTORY_ABI,
    functionName: 'totalEscrows',
    query: {
      refetchInterval: 15_000,
    },
  });
}

/**
 * Create a new escrow via the Factory contract.
 */
export function useCreateEscrow() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, data: receipt } =
    useWaitForTransactionReceipt({ hash });

  const createEscrow = useCallback(
    (landlord: `0x${string}`, durationSeconds: number, yieldPercent: number, depositEth: string) => {
      writeContract({
        address: ADDRESSES.ESCROW_FACTORY,
        abi: ESCROW_FACTORY_ABI,
        functionName: 'createEscrow',
        args: [landlord, BigInt(durationSeconds), BigInt(yieldPercent)],
        value: parseEther(depositEth),
      });
    },
    [writeContract],
  );

  // Extract the new escrow address from the EscrowCreated event log
  let newEscrowAddress: string | null = null;
  if (receipt?.logs) {
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: ESCROW_FACTORY_ABI,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === 'EscrowCreated') {
          newEscrowAddress = (decoded.args as any).escrowAddress;
          break;
        }
      } catch {
        // not our event, skip
      }
    }
  }

  return {
    createEscrow,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    newEscrowAddress,
  };
}

// ── Individual Escrow Hooks ─────────────────────────────────

/**
 * Read all state from a single RentEscrow contract.
 */
export function useEscrowDetails(escrowAddress?: `0x${string}`) {
  const enabled = !!escrowAddress;
  const commonArgs = {
    address: escrowAddress,
    abi: RENT_ESCROW_ABI,
    query: { enabled, refetchInterval: 8_000 },
  } as const;

  const tenant = useReadContract({ ...commonArgs, functionName: 'tenant' });
  const landlord = useReadContract({ ...commonArgs, functionName: 'landlord' });
  const amount = useReadContract({ ...commonArgs, functionName: 'amount' });
  const confirmed = useReadContract({ ...commonArgs, functionName: 'confirmed' });
  const tenantConfirmed = useReadContract({ ...commonArgs, functionName: 'tenantConfirmed' });
  const landlordConfirmed = useReadContract({ ...commonArgs, functionName: 'landlordConfirmed' });
  const deadline = useReadContract({ ...commonArgs, functionName: 'deadline' });
  const yieldPercent = useReadContract({ ...commonArgs, functionName: 'yieldPercent' });
  const numRatings = useReadContract({ ...commonArgs, functionName: 'numRatings' });
  const avgRating = useReadContract({ ...commonArgs, functionName: 'getAverageRating' });

  const client = usePublicClient();
  const [balanceEth, setBalanceEth] = useState('0');

  useEffect(() => {
    if (escrowAddress && client) {
      client.getBalance({ address: escrowAddress }).then((b) => {
        setBalanceEth(formatEther(b));
      });
    }
  }, [escrowAddress, client, confirmed.data]);

  const isLoading =
    tenant.isLoading || landlord.isLoading || amount.isLoading || confirmed.isLoading;

  const details: EscrowDetails | null =
    enabled && tenant.data && landlord.data && amount.data !== undefined
      ? {
          address: escrowAddress!,
          tenant: tenant.data as string,
          landlord: landlord.data as string,
          amount: amount.data as bigint,
          amountEth: formatEther((amount.data as bigint) || BigInt(0)),
          confirmed: (confirmed.data as boolean) || false,
          tenantConfirmed: (tenantConfirmed.data as boolean) || false,
          landlordConfirmed: (landlordConfirmed.data as boolean) || false,
          deadline: (deadline.data as bigint) || BigInt(0),
          yieldPercent: (yieldPercent.data as bigint) || BigInt(0),
          averageRating: avgRating.data ? Number(avgRating.data) / 100 : 0,
          numRatings: (numRatings.data as bigint) || BigInt(0),
          balanceEth,
        }
      : null;

  return { details, isLoading };
}

/**
 * Confirm a lease (callable by tenant or landlord).
 */
export function useConfirmLease(escrowAddress?: `0x${string}`) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const confirmLease = useCallback(() => {
    if (!escrowAddress) return;
    writeContract({
      address: escrowAddress,
      abi: RENT_ESCROW_ABI,
      functionName: 'confirmLease',
    });
  }, [escrowAddress, writeContract]);

  return { confirmLease, isPending, isConfirming, isSuccess, error };
}

/**
 * Release funds (only after both parties confirm).
 */
export function useReleaseFunds(escrowAddress?: `0x${string}`) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const releaseFunds = useCallback(() => {
    if (!escrowAddress) return;
    writeContract({
      address: escrowAddress,
      abi: RENT_ESCROW_ABI,
      functionName: 'releaseFunds',
    });
  }, [escrowAddress, writeContract]);

  return { releaseFunds, isPending, isConfirming, isSuccess, error };
}

/**
 * Refund (only tenant, only before confirmation, after deadline).
 */
export function useRefund(escrowAddress?: `0x${string}`) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const refund = useCallback(() => {
    if (!escrowAddress) return;
    writeContract({
      address: escrowAddress,
      abi: RENT_ESCROW_ABI,
      functionName: 'refund',
    });
  }, [escrowAddress, writeContract]);

  return { refund, isPending, isConfirming, isSuccess, error };
}

/**
 * Rate a landlord (1-5, only tenant, only after confirmation).
 */
export function useRateLandlord(escrowAddress?: `0x${string}`) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const rateLandlord = useCallback(
    (score: number) => {
      if (!escrowAddress) return;
      writeContract({
        address: escrowAddress,
        abi: RENT_ESCROW_ABI,
        functionName: 'rateLandlord',
        args: [BigInt(score)],
      });
    },
    [escrowAddress, writeContract],
  );

  return { rateLandlord, isPending, isConfirming, isSuccess, error };
}

// ── Backend API Hooks ───────────────────────────────────────

/**
 * Fetch escrow details from the backend API (fallback/indexer).
 */
export function useBackendEscrows(wallet?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!wallet) return;
    setLoading(true);
    fetch(`${API_BASE}/api/escrows/user/${wallet}`)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [wallet]);

  return { data, loading, error };
}
