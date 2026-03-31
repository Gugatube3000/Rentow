import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/components/Web3Provider';
import Navbar from '@/components/Navbar';
import DynamicBackground from '@/components/DynamicBackground';

export const metadata: Metadata = {
  title: 'RentEscrow | Secure Your Deposit. Earn While You Wait.',
  description:
    'The first decentralized escrow protocol that turns your rental security deposits into yield-bearing assets via Aave. Safe for tenants, seamless for landlords.',
  keywords: ['RentEscrow', 'DeFi', 'Escrow', 'Aave', 'Web3', 'Rental', 'Yield', 'Blockchain'],
  openGraph: {
    title: 'RentEscrow | Decentralized Rental Escrow',
    description: 'Secure your rental deposit on-chain and earn yield while you wait.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Web3Provider>
          {/* Dynamic animated background from the frame sequence */}
          <DynamicBackground />
          <Navbar />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
