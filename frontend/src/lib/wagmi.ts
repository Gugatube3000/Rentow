/**
 * Wagmi + RainbowKit configuration
 *
 * Explicitly registers MetaMask so the browser extension is detected
 * and invoked directly instead of falling through to WalletConnect deep-links.
 */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { sepolia, mainnet, arbitrum, base } from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  '0df27d3581177af00b8e7345b597c5ae';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, injectedWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'RentEscrow',
    projectId,
  },
);

const chains = [sepolia, mainnet, arbitrum, base] as const;

export const config = createConfig({
  connectors,
  chains,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});
