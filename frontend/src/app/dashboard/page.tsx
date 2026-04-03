'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight, viewportConfig } from '@/lib/animations';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';
import EscrowCard from '@/components/EscrowCard';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserEscrows, useTotalEscrows } from '@/lib/hooks';
import Link from 'next/link';

export default function DashboardPage() {
  const { isConnected, address } = useAccount();
  const { data: escrowAddresses } = useUserEscrows(address);
  const { data: totalEscrows } = useTotalEscrows();

  const escrows = (escrowAddresses as `0x${string}`[]) || [];

  if (!isConnected) {
    return (
      <main style={{ paddingTop: '10rem', minHeight: '100vh', textAlign: 'center' }}>
        <AnimatedSection>
          <div
            className="glass-card"
            style={{
              maxWidth: '32rem',
              margin: '0 auto',
              padding: '4rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '4rem',
                color: 'var(--color-primary-container)',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              account_balance_wallet
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Connect Your Wallet
            </h2>
            <p style={{ color: 'var(--color-on-surface-variant)', maxWidth: '24rem' }}>
              Connect your wallet to access the RentEscrow dashboard, manage
              your escrow positions, and track your leases.
            </p>
            <ConnectButton />
          </div>
        </AnimatedSection>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '7rem', paddingBottom: '0', minHeight: '100vh' }}>
      <div className="container-app">
        {/* Header */}
        <AnimatedSection>
          <div style={{ marginBottom: '2rem' }}>
            <span className="section-label">Dashboard</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>
              Welcome back
            </h1>
            <p
              style={{
                color: 'var(--color-on-surface-variant)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                marginTop: '0.25rem',
              }}
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        </AnimatedSection>

        {/* ── Portfolio Overview ────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {[
            {
              label: 'Your Escrows',
              value: escrows.length.toString(),
              color: 'var(--color-primary-container)',
              sub: escrows.length > 0 ? 'Active positions' : 'Create your first lease',
            },
            {
              label: 'Network Escrows',
              value: totalEscrows !== undefined ? totalEscrows.toString() : '—',
              color: 'var(--color-secondary)',
              sub: 'Total on the platform',
            },
            {
              label: 'Yield Protocol',
              value: 'Aave V3',
              color: 'var(--color-success)',
              sub: 'Integration planned',
            },
            {
              label: 'Network',
              value: 'Sepolia',
              color: 'var(--color-primary)',
              sub: 'Ethereum Testnet',
            },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="glass-card"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}
            >
              <span className="section-label" style={{ fontSize: '0.65rem', color: 'var(--color-on-surface-variant)' }}>
                {s.label}
              </span>
              <span className="stat-value" style={{ color: s.color, fontSize: '1.5rem' }}>
                {s.value}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', fontStyle: 'italic' }}>
                {s.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Quick Actions ─────────────────────────── */}
        <AnimatedSection>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <Link href="/leases" style={{ textDecoration: 'none' }}>
              <motion.div
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="icon-box"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: 'var(--color-primary-container)',
                    flexShrink: 0,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
                    add_circle
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Create Escrow</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                    Lock ETH in a secure contract
                  </p>
                </div>
              </motion.div>
            </Link>

            <Link href="/network" style={{ textDecoration: 'none' }}>
              <motion.div
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(82, 3, 213, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="icon-box"
                  style={{
                    background: 'rgba(205, 189, 255, 0.1)',
                    color: 'var(--color-secondary)',
                    flexShrink: 0,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
                    lan
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Explore Network</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                    View infrastructure & architecture
                  </p>
                </div>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>

        {/* ── Active Escrow Leases ─────────────────── */}
        <AnimatedSection>
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.125rem' }}>
                Recent Escrows
              </h3>
              {escrows.length > 0 && (
                <Link href="/leases">
                  <motion.button
                    className="btn-ghost"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All →
                  </motion.button>
                </Link>
              )}
            </div>

            {escrows.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {escrows.slice(0, 3).map((addr) => (
                  <EscrowCard key={addr} escrowAddress={addr} />
                ))}
              </div>
            ) : (
              <div
                className="glass-card"
                style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: 'var(--color-on-surface-variant)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '3rem', color: 'var(--color-outline-variant)', display: 'block', marginBottom: '1rem' }}
                >
                  handshake
                </span>
                <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No active leases</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-outline)' }}>
                  Create a new escrow lease to get started. Your deposits will be secured on-chain.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      <Footer />

      <style jsx>{`
        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
