'use client';

import { motion } from 'framer-motion';
import { heroTextReveal, staggerContainer, staggerItem, fadeInUp } from '@/lib/animations';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="hero-glow"
      style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Live Badge */}
        <motion.div variants={staggerItem} style={{ marginBottom: '2rem' }}>
          <span
            className="status-badge"
            style={{
              background: 'rgba(38, 42, 55, 0.5)',
              border: '1px solid rgba(60, 73, 78, 0.2)',
            }}
          >
            <span className="pulse-dot" style={{ background: 'var(--color-primary)' }} />
            <span className="section-label" style={{ fontSize: '0.7rem' }}>
              Live on Ethereum Mainnet
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroTextReveal}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
            color: 'var(--color-on-surface)',
          }}
        >
          Secure Your Deposit.{' '}
          <br />
          <span className="gradient-text">Earn While You Wait.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={staggerItem}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-on-surface-variant)',
            maxWidth: '40rem',
            margin: '0 auto',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          The first decentralized escrow protocol that turns your rental security
          deposits into yield-bearing assets. Safe for tenants, seamless for
          landlords.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <Link href="/dashboard">
            <motion.button
              className="btn-gradient"
              style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Launch App
            </motion.button>
          </Link>
          <Link href="/network">
            <motion.button
              className="btn-ghost"
              style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
