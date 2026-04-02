'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   SLIDE DATA
   ───────────────────────────────────────────── */

interface Slide {
  id: number;
  label: string;
  title: string;
  content: React.ReactNode;
}

/* ─── Reusable Components ─── */

const GlassCard = ({ children, style, className = '' }: any) => (
  <div
    className={`pitch-glass ${className}`}
    style={{
      background: 'rgba(49, 52, 66, 0.45)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(60, 73, 78, 0.2)',
      borderRadius: '1.25rem',
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionLabel = ({ children }: any) => (
  <span
    style={{
      fontFamily: 'var(--font-headline)',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.18em',
      color: '#00d4ff',
      display: 'block',
      marginBottom: '1rem',
    }}
  >
    {children}
  </span>
);

const GradientText = ({ children, style }: any) => (
  <span
    style={{
      background: 'linear-gradient(135deg, #00d4ff, #a8e8ff, #cdbdff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      ...style,
    }}
  >
    {children}
  </span>
);

const IconBox = ({ icon, bg = 'rgba(0,212,255,0.12)', color = '#00d4ff', size = '3.5rem' }: any) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '1rem',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <span className="material-symbols-outlined" style={{ color, fontSize: `calc(${size} * 0.5)` }}>
      {icon}
    </span>
  </div>
);

const StatCard = ({ label, value, color, sub }: any) => (
  <GlassCard style={{ padding: '1.25rem', textAlign: 'center' as const }}>
    <div style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#859398', marginBottom: '0.5rem' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.75rem', color, lineHeight: 1.2 }}>{value}</div>
    <div style={{ fontSize: '0.65rem', color: '#859398', fontStyle: 'italic' as const, marginTop: '0.35rem' }}>{sub}</div>
  </GlassCard>
);

const RoadmapRow = ({ icon, status, title, desc }: any) => {
  const isLive = status === 'Live';
  const isBeta = status === 'Beta';
  return (
    <div style={{ display: 'flex', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'flex-start' }}>
      <span className="material-symbols-outlined" style={{ color: isLive ? '#00ff88' : isBeta ? '#ffd54f' : '#859398', marginTop: '0.1rem', fontSize: '1.4rem' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' as const }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1rem', color: '#dfe2f3' }}>{title}</span>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em',
            padding: '0.2rem 0.6rem', borderRadius: '9999px',
            background: isLive ? 'rgba(0,255,136,0.1)' : isBeta ? 'rgba(255,213,79,0.1)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${isLive ? 'rgba(0,255,136,0.25)' : isBeta ? 'rgba(255,213,79,0.25)' : 'rgba(255,255,255,0.08)'}`,
            color: isLive ? '#00ff88' : isBeta ? '#ffd54f' : '#859398',
          }}>{status}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#859398' }}>{desc}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SLIDES
   ───────────────────────────────────────────── */

const slides: Slide[] = [
  /* ── 1  TITLE & HOOK ── */
  {
    id: 1,
    label: 'Title',
    title: 'RentEscrow',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '2rem', padding: '2rem' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
          <div style={{ width: '6rem', height: '6rem', borderRadius: '2rem', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(0,212,255,0.15)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#00d4ff', fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}
        >
          <GradientText>RentEscrow</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#bbc9cf', maxWidth: '36rem', lineHeight: 1.5 }}
        >
          Secure Your Deposit.<br />
          <span style={{ color: '#dfe2f3', fontWeight: 600 }}>Earn While You Wait.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', background: 'rgba(38,42,55,0.6)', border: '1px solid rgba(60,73,78,0.25)' }}
        >
          <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#00ff88', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#00d4ff' }}>Live on Ethereum Mainnet</span>
        </motion.div>
      </div>
    ),
  },

  /* ── 2  THE PROBLEM ── */
  {
    id: 2,
    label: 'Problem',
    title: 'The Problem',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '3rem', gap: '3rem', maxWidth: '60rem', margin: '0 auto' }}>
        <div>
          <SectionLabel>The Problem</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#dfe2f3' }}>
            <span style={{ color: '#00d4ff' }}>$45 Billion</span> in rental deposits<br />sit dead every year.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { icon: 'account_balance', color: '#ffb4ab', title: 'Dead Money', desc: 'Deposits earn the landlord interest — tenants get nothing back.' },
            { icon: 'visibility_off', color: '#ffd54f', title: 'Zero Transparency', desc: "Where is your money? Wire it and pray. You'll never know." },
            { icon: 'dangerous', color: '#ff6b6b', title: 'Fraud & Theft', desc: '$504M lost to rental scams in the US alone (FTC, 2024).' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <GlassCard style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <IconBox icon={item.icon} bg={`${item.color}15`} color={item.color} size="3rem" />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.1rem', color: '#dfe2f3', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ color: '#bbc9cf', fontSize: '0.875rem', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  /* ── 3  THE SOLUTION (with laptop mockup) ── */
  {
    id: 3,
    label: 'Solution',
    title: 'The Solution',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '3rem', maxWidth: '72rem', margin: '0 auto' }}>
        {/* Left: Text */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <SectionLabel>The Solution</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.15, marginBottom: '2rem' }}>
            Your deposit protects itself<br /><GradientText style={{ fontWeight: 700 }}>and makes you money.</GradientText>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: 'lock', color: '#00d4ff', title: 'Smart Escrow', desc: 'Multi-signature vaults with dual-verification release.' },
              { icon: 'query_stats', color: '#cdbdff', title: 'Yield Generation', desc: 'Deposits deployed to Aave V3 for real returns.' },
              { icon: 'verified_user', color: '#a8e8ff', title: 'Security Shield', desc: 'GoPlus forensics on every wallet, every time.' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <IconBox icon={f.icon} bg={`${f.color}18`} color={f.color} size="2.75rem" />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.95rem', color: '#dfe2f3', marginBottom: '0.15rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#859398', lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ flex: 1, minWidth: '320px', maxWidth: '520px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pitch/laptop-hero.png"
            alt="RentEscrow Landing Page"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.12))' }}
          />
        </motion.div>
      </div>
    ),
  },

  /* ── 4  PRODUCT WALKTHROUGH — FEATURES (with laptop) ── */
  {
    id: 4,
    label: 'Features',
    title: 'Core Features',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '3rem', maxWidth: '72rem', margin: '0 auto' }}>
        {/* Left: Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ flex: 1, minWidth: '320px', maxWidth: '520px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pitch/laptop-features.png"
            alt="RentEscrow Features"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.12))' }}
          />
        </motion.div>

        {/* Right: Feature breakdown */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <SectionLabel>Product Walkthrough</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.15, marginBottom: '2rem' }}>
            Three pillars of<br /><GradientText>rental trust.</GradientText>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { num: '01', title: 'Smart Escrow Vaults', desc: 'Your deposit goes into an immutable Solidity smart contract. Non-custodial — nobody can touch it. Both tenant and landlord must confirm before funds release.', color: '#00d4ff' },
              { num: '02', title: 'Automated Yield on Aave', desc: 'While locked, your deposit is deployed to Aave V3 lending pools. Market-rate yields returned directly to the tenant when the lease ends.', color: '#cdbdff' },
              { num: '03', title: 'GoPlus Threat Intelligence', desc: 'Every wallet is scanned for phishing, blacklists, and malicious on-chain history before any transaction is allowed.', color: '#a8e8ff' },
            ].map(f => (
              <div key={f.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: '1.5rem', color: f.color, lineHeight: 1, minWidth: '2rem' }}>{f.num}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.95rem', color: '#dfe2f3', marginBottom: '0.3rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#859398', lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ── 5  LIVE DASHBOARD (with laptop) ── */
  {
    id: 5,
    label: 'Dashboard',
    title: 'Live Dashboard',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '3rem', maxWidth: '72rem', margin: '0 auto' }}>
        {/* Left: Text */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          <SectionLabel>Live Product</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            The dashboard is<br /><GradientText>production-ready.</GradientText>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: 'wallet', label: 'Connect Wallet', desc: 'MetaMask, Coinbase, WalletConnect — one click.' },
              { icon: 'assignment', label: 'Manage Leases', desc: 'Track active, pending, and completed escrows.' },
              { icon: 'monitoring', label: 'Network Status', desc: 'Live gas, block height, and chain analytics.' },
              { icon: 'pie_chart', label: 'Yield Statistics', desc: 'Real-time APY from Aave V3 lending pools.' },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: '#00d4ff' }}>{f.icon}</span>
                <div>
                  <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.85rem', color: '#dfe2f3' }}>{f.label}</span>
                  <p style={{ fontSize: '0.75rem', color: '#859398', lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dashboard laptop */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ flex: 1.2, minWidth: '340px', maxWidth: '560px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pitch/laptop-dashboard.png"
            alt="RentEscrow Dashboard"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 60px rgba(82,3,213,0.15))' }}
          />
        </motion.div>
      </div>
    ),
  },

  /* ── 6  YIELD ENGINE ── */
  {
    id: 6,
    label: 'Yield',
    title: 'Yield Generation',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2.5rem', maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>Yield Engine</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3', marginBottom: '0.5rem' }}>
            Your Deposit <GradientText>Works For You</GradientText>
          </h2>
          <p style={{ color: '#859398', fontSize: '0.9rem' }}>Live data from DefiLlama Yields API → Aave V3 Ethereum pools</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <StatCard label="Aave V3 Market Size" value="$20.39B" color="#00d4ff" sub="Live DefiLlama data" />
          <StatCard label="Top Supply APY" value="4.70%" color="#a8e8ff" sub="Real-time yields" />
          <StatCard label="Smart Contracts" value="Verified" color="#cdbdff" sub="Immutable escrow" />
          <StatCard label="Network" value="Ethereum" color="#dfe2f3" sub="Secured by the EVM" />
        </div>

        <GlassCard style={{ padding: '2rem', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff6b6b', marginBottom: '1rem' }}>Traditional Deposit</div>
              {['0% return to tenant', 'Held in bank account', 'Landlord earns interest', 'No transparency'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.85rem', color: '#859398' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#ff6b6b' }}>close</span>{item}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00ff88', marginBottom: '1rem' }}>RentEscrow</div>
              {['~4.7% APY via Aave', 'Held in smart contract', 'Tenant earns yield', 'Fully auditable on-chain'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.85rem', color: '#dfe2f3' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#00ff88' }}>check_circle</span>{item}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    ),
  },

  /* ── 7  SECURITY SHIELD ── */
  {
    id: 7,
    label: 'Security',
    title: 'Security Shield',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2.5rem', maxWidth: '60rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>Trust Layer</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            Every wallet is scanned<br />before every transaction.
          </h2>
        </div>

        {/* Visual security scan - NOT terminal code */}
        <GlassCard style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(0,255,136,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: '#00ff88' }}>verified_user</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, color: '#dfe2f3', fontSize: '1.1rem' }}>Landlord Wallet Verified</div>
              <div style={{ fontSize: '0.8rem', color: '#859398' }}>0x742d...4AcE · Trust Score: <span style={{ color: '#00ff88', fontWeight: 700 }}>92/100</span></div>
            </div>
            <GlassCard style={{ padding: '0.4rem 1rem', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.8rem', color: '#00ff88' }}>SAFE</span>
            </GlassCard>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { icon: 'phishing', label: 'Phishing', result: 'Not detected', safe: true },
              { icon: 'block', label: 'Blacklist', result: 'Clean', safe: true },
              { icon: 'history', label: 'On-chain History', result: 'No threats', safe: true },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.08)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: '#00ff88' }}>check_circle</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.8rem', color: '#dfe2f3' }}>{c.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#859398' }}>{c.result}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#859398', fontStyle: 'italic', maxWidth: '36rem', margin: '0 auto' }}>
          Powered by <span style={{ color: '#ffd54f', fontWeight: 600 }}>GoPlus Security API</span> — the industry standard for Web3 threat intelligence.
        </p>
      </div>
    ),
  },

  /* ── 8  TECH STACK ── */
  {
    id: 8,
    label: 'Tech',
    title: 'Tech Stack',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2rem', maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>Architecture</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            Built with <GradientText>Battle-Tested</GradientText> Infrastructure
          </h2>
        </div>

        {/* Architecture layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Frontend', icons: [{ name: 'Next.js 16', c: '#00d4ff' }, { name: 'React 19', c: '#00d4ff' }, { name: 'Wagmi v3', c: '#00d4ff' }, { name: 'RainbowKit', c: '#00d4ff' }, { name: 'Framer Motion', c: '#00d4ff' }], bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.12)' },
            { label: 'Smart Contracts', icons: [{ name: 'Solidity 0.8.20', c: '#cdbdff' }, { name: 'Hardhat', c: '#cdbdff' }, { name: 'RentEscrow.sol', c: '#cdbdff' }, { name: 'Ethereum EVM', c: '#cdbdff' }], bg: 'rgba(82,3,213,0.06)', border: 'rgba(82,3,213,0.12)' },
            { label: 'Backend & APIs', icons: [{ name: 'FastAPI (Python)', c: '#00ff88' }, { name: 'GoPlus Security', c: '#ffd54f' }, { name: 'DefiLlama Yields', c: '#a8e8ff' }, { name: 'Aave V3 Protocol', c: '#cdbdff' }], bg: 'rgba(0,255,136,0.04)', border: 'rgba(0,255,136,0.1)' },
          ].map(layer => (
            <GlassCard key={layer.label} style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: layer.bg, border: `1px solid ${layer.border}` }}>
              <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#859398', minWidth: '7rem' }}>{layer.label}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {layer.icons.map(t => (
                  <span key={t.name} style={{ padding: '0.35rem 0.75rem', borderRadius: '9999px', background: 'rgba(10,14,26,0.5)', border: '1px solid rgba(60,73,78,0.2)', fontSize: '0.75rem', fontWeight: 600, color: t.c }}>
                    {t.name}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Key highlights */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'code', label: 'Open Source', desc: 'MIT Licensed' },
            { icon: 'cloud_upload', label: 'Deployed', desc: 'Vercel Edge' },
            { icon: 'security', label: 'Audited', desc: 'Non-custodial' },
            { icon: 'speed', label: 'Performant', desc: '< 2s load time' },
          ].map(h => (
            <GlassCard key={h.label} style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#a8e8ff' }}>{h.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.75rem', color: '#dfe2f3' }}>{h.label}</div>
                <div style={{ fontSize: '0.65rem', color: '#859398' }}>{h.desc}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },

  /* ── 9  TARGET AUDIENCE & ROADMAP ── */
  {
    id: 9,
    label: 'Roadmap',
    title: 'Audience & Roadmap',
    content: (
      <div style={{ display: 'flex', height: '100%', padding: '2.5rem', gap: '2rem', maxWidth: '72rem', margin: '0 auto' }}>
        {/* Left: Audience */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', minWidth: '280px' }}>
          <div>
            <SectionLabel>Product / Market Fit</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: '#dfe2f3' }}>
              Where RentEscrow <GradientText>Thrives</GradientText>
            </h2>
          </div>
          {[
            { icon: 'public', title: 'Cross-border Students', desc: 'Trustless escrow replaces blind faith with wire transfers.', color: '#00d4ff' },
            { icon: 'group', title: 'Roommate Groups', desc: 'Pool funds into a single contract before signing.', color: '#cdbdff' },
            { icon: 'flag', title: 'First-time Renters', desc: 'Milestone-based releases — funds move only when keys are in hand.', color: '#a8e8ff' },
          ].map(p => (
            <GlassCard key={p.title} style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: p.color }}>{p.icon}</span>
              <div>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.9rem', color: '#dfe2f3', marginBottom: '0.15rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.75rem', color: '#bbc9cf', lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.15) 50%, transparent 100%)', margin: '2rem 0' }} />

        {/* Right: Roadmap */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '280px' }}>
          <SectionLabel>Roadmap</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: '#dfe2f3', marginBottom: '0.75rem' }}>
            Platform Readiness
          </h2>
          <GlassCard style={{ padding: '1rem 1.5rem' }}>
            <RoadmapRow icon="rocket_launch" status="Live" title="Core Escrow" desc="EVM infrastructure deployed on Ethereum." />
            <RoadmapRow icon="wallet" status="Live" title="Wallet Integration" desc="RainbowKit + MetaMask fully operational." />
            <RoadmapRow icon="handshake" status="Beta" title="Lease Creation" desc="UX for milestone-based lease agreements." />
            <RoadmapRow icon="gavel" status="Upcoming" title="Dispute Resolution" desc="On-chain arbitration protocol." />
            <RoadmapRow icon="lan" status="Upcoming" title="Multi-chain" desc="Deploy to Base L2 for sub-cent gas fees." />
          </GlassCard>
        </div>
      </div>
    ),
  },

  /* ── 10  CONCLUSION ── */
  {
    id: 10,
    label: 'Q&A',
    title: 'Thank You',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '2.5rem', padding: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.25, maxWidth: '32rem' }}>
            &ldquo;Stop trusting bank wires<br />to <GradientText>strangers.</GradientText>&rdquo;
          </h2>
        </motion.div>

        <p style={{ color: '#bbc9cf', fontSize: '1.1rem', maxWidth: '28rem', lineHeight: 1.6 }}>
          Use immutable smart contracts to protect your capital and build genuine trust.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://rentow-xi.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <GlassCard style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', border: '1px solid rgba(0,212,255,0.2)' }}>
              <span className="material-symbols-outlined" style={{ color: '#00d4ff', fontSize: '1.2rem' }}>language</span>
              <span style={{ fontWeight: 600, color: '#a8e8ff', fontSize: '0.9rem' }}>rentow-xi.vercel.app</span>
            </GlassCard>
          </a>
          <a href="https://github.com/Gugatube3000/Rentow" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <GlassCard style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ color: '#dfe2f3', fontSize: '1.2rem' }}>code</span>
              <span style={{ fontWeight: 600, color: '#dfe2f3', fontSize: '0.9rem' }}>GitHub Repository</span>
            </GlassCard>
          </a>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ width: '6rem', height: '6rem', borderRadius: '2rem', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#00d4ff', fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          </div>
          <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headline)', fontWeight: 700, color: '#859398' }}>
            Thank you — Questions?
          </p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────
   PRESENTATION ENGINE
   ───────────────────────────────────────────── */

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const [printMode, setPrintMode] = useState(false);
  const total = slides.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next >= total) return total - 1;
        return next;
      });
    },
    [total],
  );

  const handleDownload = useCallback(() => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintMode(false), 500);
    }, 300);
  }, []);

  /* keyboard controls */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'f' || e.key === 'F') {
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  /* touch swipe */
  useEffect(() => {
    let startX = 0;
    const touchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const touchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) go(diff > 0 ? 1 : -1);
    };
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend', touchEnd);
    return () => { window.removeEventListener('touchstart', touchStart); window.removeEventListener('touchend', touchEnd); };
  }, [go]);

  const slide = slides[current];

  /* ── Print Mode ── */
  if (printMode) {
    return (
      <div className="pitch-print-root">
        {slides.map((s) => (
          <div key={s.id} className="pitch-print-slide">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(0,212,255,0.06) 0%, rgba(82,3,213,0.04) 50%, transparent 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              {s.content}
            </div>
          </div>
        ))}
        <style>{`
          .pitch-print-root {
            background: #0a0e1a;
            color: #dfe2f3;
            font-family: var(--font-body);
          }
          .pitch-print-slide {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: #0a0e1a;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }
          .pitch-print-slide:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          @media print {
            @page { size: landscape; margin: 0; }
            html, body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body * { visibility: hidden; }
            .pitch-print-root, .pitch-print-root * { visibility: visible; }
            .pitch-print-root { position: absolute; left: 0; top: 0; }
            .pitch-print-slide {
              position: relative;
              width: 100vw;
              height: 100vh;
              page-break-after: always;
              break-after: page;
              page-break-inside: avoid;
              break-inside: avoid;
            }
          }
          .pitch-glass { transition: none; }
        `}</style>
      </div>
    );
  }

  /* ── Slideshow Mode ── */
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0e1a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: '#dfe2f3',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(0,212,255,0.06) 0%, rgba(82,3,213,0.04) 50%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.03)', zIndex: 10 }}>
        <motion.div
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00d4ff, #5203d5)', borderRadius: '0 2px 2px 0' }}
        />
      </div>

      {/* Slide Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(10,14,26,0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* left: brand + download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: '#00d4ff', fontSize: '1.1rem', fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
            <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.85rem', color: '#859398' }}>RentEscrow</span>
          </div>
          <button
            onClick={handleDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.4rem 0.85rem', borderRadius: '0.5rem',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(82,3,213,0.15))',
              border: '1px solid rgba(0,212,255,0.2)',
              color: '#a8e8ff', fontSize: '0.75rem', fontWeight: 600,
              fontFamily: 'var(--font-headline)',
              cursor: 'pointer', transition: 'all 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(82,3,213,0.25))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(82,3,213,0.15))'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>download</span>
            Download PDF
          </button>
        </div>

        {/* center: slide dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '1.75rem' : '0.45rem',
                height: '0.45rem',
                borderRadius: '9999px',
                border: 'none',
                background: i === current ? 'linear-gradient(90deg, #00d4ff, #5203d5)' : 'rgba(255,255,255,0.1)',
                transition: 'all 300ms ease',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* right: controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#859398', fontFamily: 'var(--font-headline)', fontWeight: 600 }}>
            {current + 1} / {total}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => go(-1)}
              disabled={current === 0}
              style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: current === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: current === 0 ? '#3c494e' : '#a8e8ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: current === 0 ? 'default' : 'pointer',
                transition: 'all 200ms ease', padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>chevron_left</span>
            </button>
            <button
              onClick={() => go(1)}
              disabled={current === total - 1}
              style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: current === total - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(0,212,255,0.1)',
                border: `1px solid ${current === total - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(0,212,255,0.15)'}`,
                color: current === total - 1 ? '#3c494e' : '#00d4ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: current === total - 1 ? 'default' : 'pointer',
                transition: 'all 200ms ease', padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <KeyboardHint />

      <style>{`
        .pitch-glass { transition: box-shadow 300ms ease, transform 300ms ease; }
        .pitch-glass:hover { box-shadow: 0 0 30px rgba(168,232,255,0.06); }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.2)} }
        @media print {
          body * { visibility: hidden !important; }
          .pitch-print-root, .pitch-print-root * { visibility: visible !important; }
        }
      `}</style>
    </div>
  );
}

function KeyboardHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'absolute',
            bottom: '4.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            background: 'rgba(10,14,26,0.85)',
            border: '1px solid rgba(60,73,78,0.2)',
            backdropFilter: 'blur(12px)',
            fontSize: '0.7rem',
            color: '#859398',
            zIndex: 20,
          }}
        >
          <span>← → Navigate</span>
          <span>F Fullscreen</span>
          <span>Swipe on mobile</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
