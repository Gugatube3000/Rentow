/**
 * Wagmi + RainbowKit configuration
 */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet, arbitrum, base } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'RentEscrow',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '0df27d3581177af00b8e7345b597c5ae',
  chains: [sepolia, mainnet, arbitrum, base],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});
