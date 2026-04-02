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

/* ─── reusable pieces ─── */

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

const FeatureCard = ({ icon, title, desc, bg, color }: any) => (
  <GlassCard style={{ padding: '2rem', flex: 1, minWidth: '220px' }}>
    <IconBox icon={icon} bg={bg} color={color} />
    <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', fontWeight: 700, margin: '1.25rem 0 0.75rem', color: '#dfe2f3' }}>
      {title}
    </h3>
    <p style={{ color: '#bbc9cf', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
  </GlassCard>
);

const ProcessStep = ({ num, icon, title, desc }: any) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const, gap: '0.75rem', minWidth: '140px' }}>
    <div style={{ position: 'relative' as const }}>
      <IconBox icon={icon} bg="rgba(38,42,55,0.8)" color="#a8e8ff" size="3.5rem" />
      <span style={{ position: 'absolute', top: '-0.4rem', right: '-0.4rem', background: 'linear-gradient(135deg, #00d4ff, #5203d5)', width: '1.5rem', height: '1.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>
        {num}
      </span>
    </div>
    <h4 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.95rem', color: '#dfe2f3' }}>{title}</h4>
    <p style={{ fontSize: '0.8rem', color: '#859398', lineHeight: 1.5 }}>{desc}</p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
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
  /* ── 1 TITLE ── */
  {
    id: 1,
    label: 'Title',
    title: 'RentEscrow',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '2rem', padding: '2rem' }}>
        {/* logo icon */}
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

  /* ── 2 PROBLEM ── */
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
            { icon: 'visibility_off', color: '#ffd54f', title: 'Zero Transparency', desc: 'Where is your money? Wire it and pray. You\'ll never know.' },
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

  /* ── 3 SOLUTION ── */
  {
    id: 3,
    label: 'Solution',
    title: 'The Solution',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '3rem', gap: '2.5rem', maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>The Solution</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.2 }}>
            What if your deposit could<br />protect itself <GradientText style={{ fontWeight: 700 }}>and make you money?</GradientText>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <FeatureCard icon="lock" title="Smart Escrow" desc="Multi-signature vaults with dual-verification. Fully automated release upon lease expiration." bg="rgba(0,212,255,0.12)" color="#00d4ff" />
          <FeatureCard icon="query_stats" title="Yield Generation" desc="Deposits deployed into Aave V3 to generate market-leading returns for tenants." bg="rgba(82,3,213,0.15)" color="#cdbdff" />
          <FeatureCard icon="verified_user" title="Security Shield" desc="Real-time GoPlus forensics — phishing detection, blackist checks, history scanning." bg="rgba(168,232,255,0.12)" color="#a8e8ff" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', background: 'rgba(38,42,55,0.6)', border: '1px solid rgba(0,212,255,0.15)', fontSize: '0.8rem', color: '#a8e8ff' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>language</span>
            rentow-xi.vercel.app
          </span>
        </motion.div>
      </div>
    ),
  },

  /* ── 4 SMART ESCROW ── */
  {
    id: 4,
    label: 'Smart Escrow',
    title: 'Smart Escrow',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2.5rem', maxWidth: '64rem', margin: '0 auto' }}>
        <div>
          <SectionLabel>Architecture</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            The Escrow Lifecycle
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProcessStep num="1" icon="assignment_add" title="Create Lease" desc="Landlord outlines rent, deposit & terms." />
          <div style={{ display: 'flex', alignItems: 'center', color: '#3c494e', fontSize: '1.5rem' }}>→</div>
          <ProcessStep num="2" icon="account_balance" title="Fund Contract" desc="Student locks funds in non-custodial contract." />
          <div style={{ display: 'flex', alignItems: 'center', color: '#3c494e', fontSize: '1.5rem' }}>→</div>
          <ProcessStep num="3" icon="verified" title="Meet Milestones" desc="Contract holds until lease conditions are met." />
          <div style={{ display: 'flex', alignItems: 'center', color: '#3c494e', fontSize: '1.5rem' }}>→</div>
          <ProcessStep num="4" icon="send_money" title="Secure Release" desc="Both parties confirm; funds auto-disburse." />
        </div>

        <GlassCard style={{ padding: '1.5rem', overflow: 'hidden', border: '1px solid rgba(0,212,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: '0.7rem', color: '#859398', marginLeft: '0.5rem' }}>RentEscrow.sol</span>
          </div>
          <pre style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', lineHeight: 1.7, color: '#bbc9cf', margin: 0, overflow: 'auto' }}>
            <code>{`function confirmLease() public {
    require(msg.sender == tenant || msg.sender == landlord);
    if (msg.sender == tenant) tenantConfirmed = true;
    else landlordConfirmed = true;
    confirmed = tenantConfirmed && landlordConfirmed;
}

function releaseFunds() public {
    require(confirmed, "Lease not confirmed");
    uint yieldAmount = (amount * yieldPercent) / 100;
    payable(landlord).transfer(amount - yieldAmount);
    payable(tenant).transfer(yieldAmount);  // ← tenant gets yield
}`}</code>
          </pre>
        </GlassCard>
      </div>
    ),
  },

  /* ── 5 YIELD ── */
  {
    id: 5,
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

  /* ── 6 SECURITY ── */
  {
    id: 6,
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

        {/* Terminal */}
        <GlassCard style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(0,255,136,0.08)' }}>
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ width: '0.55rem', height: '0.55rem', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '0.55rem', height: '0.55rem', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '0.55rem', height: '0.55rem', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: '0.7rem', color: '#859398', marginLeft: '0.5rem' }}>run_scenario.py — GoPlus Security Scan</span>
          </div>
          <div style={{ padding: '1.5rem', fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)', lineHeight: 1.9 }}>
            <div style={{ color: '#859398' }}>$ python run_scenario.py</div>
            <div style={{ color: '#cdbdff' }}>--- 🛡️ STARTING SECURITY SHIELD SCENARIO ---</div>
            <div style={{ color: '#a8e8ff' }}>📍 Step 1: Found Landlord Address: <span style={{ color: '#00d4ff' }}>0x742d...4AcE</span></div>
            <div style={{ color: '#ffd54f' }}>🔍 Step 2: Running GoPlus Security Scan...</div>
            <div style={{ color: '#00ff88', fontWeight: 600 }}>✅ Landlord is SAFE. Trust Score: <span style={{ fontSize: '1.1em' }}>92/100</span></div>
            <div style={{ color: '#859398', paddingLeft: '1.5rem' }}>├── Phishing: Not detected</div>
            <div style={{ color: '#859398', paddingLeft: '1.5rem' }}>├── Blacklist: Clean</div>
            <div style={{ color: '#859398', paddingLeft: '1.5rem' }}>└── Malicious History: None</div>
            <div style={{ color: '#a8e8ff' }}>📈 Step 3: Contract Yield set to <span style={{ color: '#00ff88' }}>3%</span></div>
            <div style={{ color: '#cdbdff' }}>--- ✅ SCENARIO COMPLETE ---</div>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'phishing', label: 'Phishing Detection' },
            { icon: 'block', label: 'Blacklist Check' },
            { icon: 'history', label: 'History Scan' },
          ].map((b) => (
            <GlassCard key={b.label} style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: '#00ff88' }}>{b.icon}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#dfe2f3' }}>{b.label}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
  },

  /* ── 7 TECH STACK ── */
  {
    id: 7,
    label: 'Tech Stack',
    title: 'Under the Hood',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2rem', maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>Architecture</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            Built with <GradientText>Battle-Tested</GradientText> Infrastructure
          </h2>
        </div>

        {/* Architecture flow */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', alignItems: 'center' }}>
          {[
            { icon: 'person', label: 'User', sub: 'MetaMask', color: '#dfe2f3' },
            null,
            { icon: 'web', label: 'Next.js 16', sub: 'React 19', color: '#00d4ff' },
            null,
            { icon: 'code', label: 'RentEscrow.sol', sub: 'Solidity 0.8.20', color: '#cdbdff' },
            null,
            { icon: 'hub', label: 'Ethereum', sub: 'EVM', color: '#a8e8ff' },
          ].map((item, i) =>
            item === null ? (
              <span key={`arrow-${i}`} style={{ color: '#3c494e', fontSize: '1.5rem', fontWeight: 300 }}>→</span>
            ) : (
              <GlassCard key={item.label} style={{ padding: '1.25rem 1.5rem', textAlign: 'center', minWidth: '120px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: item.color, display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.85rem', color: '#dfe2f3' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#859398' }}>{item.sub}</div>
              </GlassCard>
            )
          )}
        </div>

        {/* side services */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'api', label: 'FastAPI', sub: 'Python Backend', color: '#00ff88' },
            { icon: 'security', label: 'GoPlus API', sub: 'Threat Intel', color: '#ffd54f' },
            { icon: 'savings', label: 'Aave V3', sub: 'Yield Protocol', color: '#cdbdff' },
            { icon: 'monitoring', label: 'DefiLlama', sub: 'Live Data', color: '#a8e8ff' },
          ].map(s => (
            <GlassCard key={s.label} style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: s.color }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.8rem', color: '#dfe2f3' }}>{s.label}</div>
                <div style={{ fontSize: '0.65rem', color: '#859398' }}>{s.sub}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {['Solidity 0.8.20', 'Hardhat', 'Next.js 16', 'React 19', 'Wagmi v3', 'Viem', 'RainbowKit v2', 'Framer Motion', 'FastAPI', 'GoPlus API'].map(t => (
            <span key={t} style={{ padding: '0.35rem 0.75rem', borderRadius: '9999px', background: 'rgba(49,52,66,0.5)', border: '1px solid rgba(60,73,78,0.15)', fontSize: '0.7rem', fontWeight: 500, color: '#bbc9cf' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },

  /* ── 8 TARGET AUDIENCE ── */
  {
    id: 8,
    label: 'Audience',
    title: 'Target Audience',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2.5rem', maxWidth: '60rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel>Product / Market Fit</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            Where RentEscrow <GradientText>Thrives</GradientText>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: 'public', title: 'Cross-border Students', desc: 'Securely pay international deposits without wire fees or scam risk. Trustless escrow replaces blind faith.', color: '#00d4ff' },
            { icon: 'group', title: 'Roommate Groups', desc: 'Pool funds into a single smart contract before signing. No more "I\'ll Venmo you later" trust games.', color: '#cdbdff' },
            { icon: 'flag', title: 'First-time Renters', desc: 'Milestone-based releases protect you — funds only move when the keys are literally in your hand.', color: '#a8e8ff' },
          ].map((p) => (
            <GlassCard key={p.title} style={{ padding: '2rem', flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: p.color }}>{p.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.1rem', color: '#dfe2f3' }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#bbc9cf', lineHeight: 1.6 }}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard style={{ padding: '1.5rem 2rem', textAlign: 'center', background: 'rgba(255,107,107,0.06)', border: '1px solid rgba(255,107,107,0.15)' }}>
          <span style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#ffb4ab' }}>$504M</span>
          <span style={{ color: '#bbc9cf', fontSize: '0.9rem', marginLeft: '0.75rem' }}>lost to rental scams in the US — FTC, 2024</span>
        </GlassCard>
      </div>
    ),
  },

  /* ── 9 ROADMAP ── */
  {
    id: 9,
    label: 'Roadmap',
    title: "What's Next",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem', gap: '2rem', maxWidth: '52rem', margin: '0 auto' }}>
        <div>
          <SectionLabel>Roadmap</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#dfe2f3' }}>
            Platform Readiness
          </h2>
        </div>

        <GlassCard style={{ padding: '1.5rem 2rem' }}>
          <RoadmapRow icon="rocket_launch" status="Live" title="Core Escrow Contracts" desc="Base EVM escrow infrastructure deployed and active on Ethereum." />
          <RoadmapRow icon="wallet" status="Live" title="Wallet Integration" desc="RainbowKit + Wagmi + MetaMask web3 frontend fully operational." />
          <RoadmapRow icon="handshake" status="Beta" title="Lease Creation Flow" desc="UX for landlords and tenants to agree on milestones and terms." />
          <RoadmapRow icon="gavel" status="Upcoming" title="Dispute Resolution" desc="On-chain arbitration protocol for handling broken lease conditions." />
          <RoadmapRow icon="fingerprint" status="Upcoming" title="Identity Layer" desc="Decentralized KYC for verified, privacy-preserving participant profiles." />
          <RoadmapRow icon="lan" status="Upcoming" title="Multi-chain (Base L2)" desc="Deploy to Base L2 for sub-cent gas fees — already in Wagmi config." />
        </GlassCard>
      </div>
    ),
  },

  /* ── 10 CONCLUSION ── */
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
   PRESENTATION COMPONENT
   ───────────────────────────────────────────── */

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
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

      {/* ── Progress bar ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.03)', zIndex: 10 }}>
        <motion.div
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00d4ff, #5203d5)', borderRadius: '0 2px 2px 0' }}
        />
      </div>

      {/* ── Slide Content ── */}
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

      {/* ── Bottom Bar ── */}
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
        {/* left: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="material-symbols-outlined" style={{ color: '#00d4ff', fontSize: '1.1rem', fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.85rem', color: '#859398' }}>RentEscrow</span>
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

      {/* Keyboard hints (fades after 5 seconds) */}
      <KeyboardHint />

      <style>{`
        .pitch-glass { transition: box-shadow 300ms ease, transform 300ms ease; }
        .pitch-glass:hover { box-shadow: 0 0 30px rgba(168,232,255,0.06); }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.2)} }
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
