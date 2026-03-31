'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from '@/lib/animations';
import AnimatedSection from './AnimatedSection';
import ScrollSequence from '@/components/ScrollSequence';

const features = [
  {
    icon: 'lock',
    title: 'Smart Escrow',
    description:
      'Multi-signature vaults that require dual-verification for fund release. Fully automated release upon lease expiration.',
    iconBg: 'rgba(0, 212, 255, 0.12)',
    iconColor: 'var(--color-primary-container)',
  },
  {
    icon: 'query_stats',
    title: 'Yield Generation',
    description:
      'Deposits are programmatically deployed into blue-chip DeFi protocols like Aave to generate market-leading returns for tenants.',
    iconBg: 'rgba(82, 3, 213, 0.15)',
    iconColor: 'var(--color-secondary)',
  },
  {
    icon: 'verified_user',
    title: 'Security Shield',
    description:
      'Real-time GoPlus risk analysis on wallet addresses. Phishing detection, blacklist checks, and malicious history scanning.',
    iconBg: 'rgba(168, 232, 255, 0.12)',
    iconColor: 'var(--color-primary)',
  },
];

const bulletPoints = [
  {
    title: 'Zero Fees for Onboarding',
    desc: 'Landlords can list and verify properties without any upfront gas costs.',
  },
  {
    title: 'Instant Settlement',
    desc: 'Move out and get your funds back instantly once both parties sign off.',
  },
  {
    title: 'Global Compatibility',
    desc: 'Rent anywhere in the world using stablecoins or Ethereum native assets.',
  },
];

export default function FeaturesSection() {
  return (
    <>
      {/* Features Grid */}
      <section id="features" style={{ maxWidth: '80rem', margin: '0 auto', padding: '6rem 2rem' }}>
        <AnimatedSection>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            <div style={{ maxWidth: '32rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '1.5rem',
                }}
              >
                Redefining Rental Trust
              </h2>
              <p
                style={{
                  color: 'var(--color-on-surface-variant)',
                  lineHeight: 1.7,
                }}
              >
                Say goodbye to opaque management and lost interest. Our smart
                contracts ensure your funds are protected, audited, and productive.
              </p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.75rem',
                fontStyle: 'italic',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              Audited by Quantstamp &amp; Trail of Bits
            </span>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              className="glass-card"
              style={{
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost icon */}
              <span
                className="material-symbols-outlined feature-icon-ghost"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {f.icon}
              </span>

              {/* Icon box */}
              <div
                className="icon-box"
                style={{ background: f.iconBg, marginBottom: '2rem' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: f.iconColor, fontSize: '2rem' }}
                >
                  {f.icon}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--color-on-surface)',
                }}
              >
                {f.title}
              </h3>
              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7 }}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Showcase / Asymmetric Section */}
      <section
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="showcase-grid"
      >
        {/* Dashboard Preview */}
        <AnimatedSection>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-1rem',
                background:
                  'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(82,3,213,0.15))',
                filter: 'blur(60px)',
                zIndex: -1,
                borderRadius: 'var(--radius-xl)',
              }}
            />
            <div
              className="glass-card"
              style={{
                padding: '1rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
            >
              <ScrollSequence />
            </div>

            {/* Floating transaction card */}
            <motion.div
              className="glass-card hidden-mobile-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-1rem',
                padding: '1.5rem',
                maxWidth: '15rem',
                display: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                  }}
                />
                <span className="section-label" style={{ fontSize: '0.65rem' }}>
                  Live Transaction
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-on-surface)',
                }}
              >
                New Lease Confirmed: Deposit secured in escrow
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Right side info */}
        <AnimatedSection>
          <div>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>
              Institutional Grade
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                marginBottom: '2rem',
              }}
            >
              The Gold Standard for Modern Renting
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {bulletPoints.map((bp) => (
                <li key={bp.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'var(--color-primary-container)', marginTop: '0.125rem' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <span
                      style={{
                        fontWeight: 700,
                        color: 'var(--color-on-surface)',
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {bp.title}
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>
                      {bp.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </section>

      <style jsx>{`
        @media (min-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 7fr 5fr !important;
          }
        }
        @media (min-width: 768px) {
          .hidden-mobile-card {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
