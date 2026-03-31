'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp, fadeInLeft, fadeInRight, viewportConfig } from '@/lib/animations';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function DashboardPage() {
  const { isConnected, address } = useAccount();

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
              your escrow positions, and earn yield on Aave.
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
            { label: 'Total Supplied', value: '—', color: 'var(--color-primary-container)', sub: 'No positions yet' },
            { label: 'Total Yield Earned', value: '—', color: 'var(--color-success)', sub: 'Supply assets to earn' },
            { label: 'Active Escrows', value: '0', color: 'var(--color-secondary)', sub: 'Create a new lease' },
            { label: 'Health Factor', value: '—', color: 'var(--color-primary)', sub: 'Supply collateral to view' },
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

        {/* ── Two Column: Positions + Aave Markets ─ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
          className="dashboard-grid"
        >
          {/* Supplied Positions */}
          <AnimatedSection variants={fadeInLeft}>
            <div className="glass-card" style={{ padding: '1.5rem', overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.125rem' }}>
                  Your Positions
                </h3>
                <motion.button
                  className="btn-gradient"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + Supply
                </motion.button>
              </div>

              {/* Empty state */}
              <div
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
                  account_balance
                </span>
                <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No positions yet</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-outline)' }}>
                  Supply assets to Aave to start earning yield on your deposits.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Aave Markets */}
          <AnimatedSection variants={fadeInRight}>
            <div className="glass-card" style={{ padding: '1.5rem', overflow: 'hidden' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  marginBottom: '1.5rem',
                }}
              >
                Aave Markets
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  fontSize: '0.7rem',
                  color: 'var(--color-outline)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                <span>Asset</span>
                <span>Supply APY</span>
                <span>Borrow APY</span>
                <span>TVL</span>
              </div>

              {/* Empty state */}
              <div
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
                  sync
                </span>
                <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Fetching live market data...</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-outline)' }}>
                  Market data will be fetched from Aave V3 once the protocol is connected.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Active Escrow Leases ─────────────────── */}
        <AnimatedSection>
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.125rem' }}>
                Active Escrow Leases
              </h3>
              <motion.button
                className="btn-gradient"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + New Lease
              </motion.button>
            </div>

            {/* Empty state */}
            <div
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
