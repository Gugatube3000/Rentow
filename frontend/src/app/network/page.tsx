'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from '@/lib/animations';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';

// --- Reusable Components ---

const StatusCard = ({ icon, label, status, color = 'var(--color-primary-container)' }: any) => (
  <motion.div variants={staggerItem} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div className="icon-box" style={{ width: '2.5rem', height: '2.5rem', background: 'rgba(255,255,255,0.03)', color }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>{icon}</span>
      </div>
      <span className="section-label" style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>{label}</span>
    </div>
    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-on-surface)' }}>{status}</div>
  </motion.div>
);

const ProcessStep = ({ step, title, desc, icon }: any) => (
  <motion.div variants={staggerItem} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
    <div className="icon-box" style={{ background: 'var(--color-surface-container-high)', border: '1px solid var(--color-outline-variant)', fontSize: '1.5rem', color: 'var(--color-primary)' }}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)', fontWeight: 600, marginBottom: '0.25rem' }}>STEP 0{step}</div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
    </div>
  </motion.div>
);

const RoadmapItem = ({ title, status, desc, icon }: any) => (
  <motion.div variants={staggerItem} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ color: status === 'Live' ? 'var(--color-success)' : 'var(--color-outline)', paddingTop: '0.25rem' }}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h4>
        <div className="status-badge" style={{ 
          background: status === 'Live' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255,255,255,0.03)',
          borderColor: status === 'Live' ? 'rgba(0, 255, 136, 0.2)' : 'var(--color-outline-variant)',
          color: status === 'Live' ? 'var(--color-success)' : 'var(--color-outline)',
          fontSize: '0.65rem',
          padding: '0.25rem 0.75rem'
        }}>
          {status}
        </div>
      </div>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.875rem' }}>{desc}</p>
    </div>
  </motion.div>
);

const DemoEscrowPanel = () => (
  <motion.div variants={fadeInUp} className="glass-card" style={{ overflow: 'hidden', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'var(--color-primary)', color: '#000', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottomLeftRadius: 'var(--radius-md)' }}>
      Demo Escrow Scenario
    </div>
    <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="icon-box" style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--color-primary-container)' }}>
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)' }}>Tenant Profile</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Alex M. (Student)</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)' }}>Escrow Target</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>2BR near UT Campus</div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--color-surface-container-high)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)', marginBottom: '0.25rem' }}>Monthly Rent + Deposit</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>$2,500 USDC</div>
        </div>
        <div style={{ background: 'var(--color-surface-container-high)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)', marginBottom: '0.25rem' }}>Contract State</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="pulse-dot" style={{ background: 'var(--color-success)' }} /> Fully Funded
          </div>
        </div>
      </div>
    </div>
    
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)' }}>Release Condition</div>
          <div style={{ fontWeight: 500, color: 'var(--color-primary)' }}>Lease Start Date Confirmed</div>
        </div>
        <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.5rem 1.5rem', cursor: 'default' }}>
          Awaiting Landlord
        </button>
      </div>
    </div>
  </motion.div>
);

// --- Main Page ---

export default function EscrowNetworkPage() {
  return (
    <main style={{ paddingTop: '7rem', paddingBottom: '0', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="container-app">
        
        {/* 1. HERO HEADER */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <span className="status-badge" style={{ marginBottom: '1.5rem' }}>
                <span className="pulse-dot" style={{ background: 'var(--color-primary-container)' }} /> System Live
              </span>
            </motion.div>
            <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Escrow Infrastructure.</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-on-surface-variant)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              A secure, immutable blockchain escrow system engineered for student rent, deposits, and automated lease-based fund releases.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gradient">Start Escrow</button>
              <button className="btn-ghost" onClick={() => window.scrollTo(0, 800)}>Explore Architecture</button>
            </div>
          </div>
        </AnimatedSection>

        {/* 2. TRUST / STATUS CARDS */}
        <AnimatedSection>
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}
          >
            <StatusCard icon="code_blocks" label="Smart Contracts" status="Deployed & Active" />
            <StatusCard icon="lan" label="Base Network" status="Ethereum / Base L2" color="var(--color-secondary)" />
            <StatusCard icon="security" label="Trust Model" status="100% Non-Custodial" color="var(--color-success)" />
            <StatusCard icon="fingerprint" label="Identity Layer" status="Integration Planned" color="var(--color-outline)" />
          </motion.div>
        </AnimatedSection>

        {/* 3. HOW RENTESCROW WORKS */}
        <AnimatedSection>
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <span className="section-label">Architecture</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>The Escrow Lifecycle</h2>
            </div>
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
              style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}
            >
              <ProcessStep step="1" icon="assignment_add" title="Create Lease Escrow" desc="Landlord or student outlines the terms, monthly rent, and deposit on the protocol." />
              <ProcessStep step="2" icon="account_balance" title="Fund the Contract" desc="Student locks the required funds into the non-custodial smart contract." />
              <ProcessStep step="3" icon="verified" title="Meet Milestones" desc="The contract holds capital safely until moving day or predefined lease conditions are fully met." />
              <ProcessStep step="4" icon="send_money" title="Secure Release" desc="Funds are automatically disbursed to the landlord's wallet upon cryptographic confirmation." />
            </motion.div>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          {/* 4. WHY ESCROW FOR STUDENT HOUSING */}
          <AnimatedSection>
            <span className="section-label">Value Proposition</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '2rem' }}>Why On-chain Escrow?</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-primary-container)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>school</span> For Students
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-success)' }}>check_circle</span> Funds are mathematically protected until lease starts.</li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-success)' }}>check_circle</span> Zero risk of deposit theft from fraudulent listings.</li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-success)' }}>check_circle</span> Complete transparency into where your money is held.</li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-secondary)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)' }}>real_estate_agent</span> For Landlords
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>check_circle</span> Cryptographically verified proof of payment intent.</li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>check_circle</span> Eliminates bounced checks and wired-funds delays.</li>
                  <li style={{ display: 'flex', gap: '0.75rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>check_circle</span> Builds immense trust resulting in faster lease signings.</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* 7. SAMPLE ESCROW DEMO PANEL */}
          <AnimatedSection>
            <span className="section-label">State Machine</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '2rem' }}>Live Escrow UI Preview</h2>
            <DemoEscrowPanel />
          </AnimatedSection>
        </div>

        {/* 5. SECURITY SECTION & 6. ROADMAP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          
          <AnimatedSection>
            <span className="section-label">Security</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '2rem' }}>Code is Law</h2>
            <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>
              RentEscrow is fundamentally non-custodial. We don't hold your funds in a corporate bank account. Everything is locked in immutable EVM smart contracts deployed to the blockchain.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>description</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>EscrowFactory.sol</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)' }}>Core deployment engine</div>
                  </div>
                </div>
                <button className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>View Code</button>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', fontSize: '2rem' }}>policy</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Security Audit</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)' }}>Independent review</div>
                  </div>
                </div>
                <button className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderColor: 'var(--color-outline)', color: 'var(--color-outline)' }}>Pending</button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <span className="section-label">Milestones</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '2rem' }}>Platform Readiness</h2>
            
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <RoadmapItem icon="rocket_launch" status="Live" title="Core Escrow Contracts" desc="Base EVM escrow infrastructure deployed and active." />
                <RoadmapItem icon="wallet" status="Live" title="Wallet Integration" desc="RainbowKit + Wagmi web3 frontend operational." />
                <RoadmapItem icon="handshake" status="In Beta" title="Lease Creation Flow" desc="UX for landlords and tenants to agree on milestones." />
                <RoadmapItem icon="gavel" status="Upcoming" title="Dispute Resolution" desc="Onchain protocol for handling broken lease conditions." />
              </motion.div>
            </div>
          </AnimatedSection>

        </div>

        {/* 8. USE CASES */}
        <AnimatedSection>
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">Product/Market Fit</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Where RentEscrow Thrives</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: 'public', title: 'Cross-border Students', desc: 'Securely pay international deposits without massive wire fees or worrying about scam listings.' },
                { icon: 'group', title: 'Roommate Coordination', desc: 'Pool funds together securely into a single contract before signing the master lease.' },
                { icon: 'flag', title: 'First-time Renters', desc: 'Protect yourself with milestone-based releases. Funds only leave when the keys are in your hand.' }
              ].map(uc => (
                <div key={uc.title} className="glass-card" style={{ padding: '2rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-primary-container)', marginBottom: '1rem' }}>{uc.icon}</span>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{uc.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 9. CTA */}
        <AnimatedSection>
          <div className="hero-glow glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', marginBottom: '6rem', borderRadius: 'var(--radius-xl)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to secure your lease?</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-on-surface-variant)', maxWidth: '40rem', margin: '0 auto 2.5rem' }}>
              Stop trusting bank wires to strangers. Use RentEscrow's immutable smart contracts to protect your capital and build genuine trust.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gradient">Launch Web App</button>
              <button className="btn-ghost">Contact Sales</button>
            </div>
          </div>
        </AnimatedSection>
        
      </div>
      <Footer />
    </main>
  );
}
