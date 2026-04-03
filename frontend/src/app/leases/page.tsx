'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';
import EscrowCard from '@/components/EscrowCard';
import CreateLeaseModal from '@/components/CreateLeaseModal';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserEscrows, useTotalEscrows } from '@/lib/hooks';

export default function LeasesPage() {
  const { isConnected, address } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: escrowAddresses, refetch } = useUserEscrows(address);
  const { data: totalEscrows } = useTotalEscrows();

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
              style={{ fontSize: '4rem', color: 'var(--color-primary-container)', fontVariationSettings: "'FILL' 1" }}
            >
              real_estate_agent
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Connect to View Leases</h2>
            <p style={{ color: 'var(--color-on-surface-variant)', maxWidth: '24rem' }}>
              Connect your wallet to manage your rental escrow leases, confirm agreements, and rate landlords.
            </p>
            <ConnectButton />
          </div>
        </AnimatedSection>
      </main>
    );
  }

  const escrows = (escrowAddresses as `0x${string}`[]) || [];
  const hasEscrows = escrows.length > 0;

  return (
    <main style={{ paddingTop: '7rem', paddingBottom: '0', minHeight: '100vh' }}>
      <div className="container-app">
        {/* Header */}
        <AnimatedSection>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="section-label">Escrow</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>Your Leases</h1>
              <p style={{ color: 'var(--color-on-surface-variant)', marginTop: '0.25rem' }}>
                {hasEscrows
                  ? `${escrows.length} active escrow${escrows.length > 1 ? 's' : ''}`
                  : 'Manage rental escrow contracts, confirmations, and ratings'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {totalEscrows !== undefined && (
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-surface-container-high)',
                    fontSize: '0.75rem',
                    color: 'var(--color-on-surface-variant)',
                    fontWeight: 600,
                  }}
                >
                  {totalEscrows.toString()} total on network
                </div>
              )}
              <motion.button
                className="btn-gradient"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setModalOpen(true)}
              >
                + Create New Lease
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* Escrow Cards or Empty State */}
        {hasEscrows ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}
          >
            {escrows.map((addr) => (
              <motion.div key={addr} variants={staggerItem}>
                <EscrowCard escrowAddress={addr} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <AnimatedSection>
            <div
              className="glass-card"
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '4rem',
                  color: 'var(--color-outline-variant)',
                  display: 'block',
                  marginBottom: '1.5rem',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                handshake
              </span>
              <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                No Active Leases
              </h3>
              <p
                style={{
                  color: 'var(--color-on-surface-variant)',
                  maxWidth: '28rem',
                  margin: '0 auto 2rem',
                  lineHeight: 1.6,
                }}
              >
                You don&apos;t have any escrow leases yet. Create a new lease to deposit funds into a
                secure smart contract escrow. Both tenant and landlord must confirm before funds can be released.
              </p>

              {/* How it works */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '48rem',
                  margin: '0 auto',
                  textAlign: 'left',
                }}
              >
                {[
                  { icon: 'edit_document', title: 'Create Lease', desc: 'Set deposit amount, duration, and landlord address' },
                  { icon: 'lock', title: 'Deposit Funds', desc: 'ETH is locked in the escrow contract' },
                  { icon: 'verified', title: 'Dual Confirmation', desc: 'Both parties confirm to release or refund' },
                  { icon: 'savings', title: 'Earn Yield', desc: 'Deposits earn interest via Aave while locked' },
                ].map((step) => (
                  <div
                    key={step.title}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(38, 42, 55, 0.3)',
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: 'var(--color-primary-container)', fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}
                    >
                      {step.icon}
                    </span>
                    <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}>{step.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-outline)', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                ))}
              </div>

              <motion.button
                className="btn-gradient"
                style={{ marginTop: '2rem', padding: '0.75rem 2rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setModalOpen(true)}
              >
                🔒 Create Your First Escrow
              </motion.button>
            </div>
          </AnimatedSection>
        )}
      </div>

      <Footer />

      {/* Create Lease Modal */}
      <CreateLeaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </main>
  );
}
