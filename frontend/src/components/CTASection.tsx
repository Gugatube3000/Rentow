'use client';

import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import AnimatedSection from './AnimatedSection';

export default function CTASection() {
  return (
    <section style={{ maxWidth: '65rem', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <AnimatedSection>
        <div
          className="glass-card"
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '1px solid rgba(168, 232, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,212,255,0.04), transparent)',
              pointerEvents: 'none',
            }}
          />

          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Ready to secure your next home?
          </h2>
          <p
            style={{
              color: 'var(--color-on-surface-variant)',
              fontSize: '1.125rem',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Join thousands of tenants and landlords building the future of
            property management.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <input
              className="input-glass"
              type="email"
              placeholder="Enter your email for early access"
              style={{ maxWidth: '20rem' }}
            />
            <motion.button
              className="btn-gradient"
              style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
