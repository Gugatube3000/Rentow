'use client';

import Link from 'next/link';

const footerLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Security Audit' },
  { href: '#', label: 'Documentation' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#060810',
        padding: '3rem 2rem',
        marginTop: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              className="material-symbols-outlined"
              style={{
                color: 'var(--color-primary-container)',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              shield_with_heart
            </span>
            <span
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-on-surface)',
              }}
            >
              RentEscrow
            </span>
          </div>
          <p
            style={{
              color: 'var(--color-outline)',
              fontSize: '0.875rem',
              maxWidth: '18rem',
            }}
          >
            The decentralized standard for security deposits. Built for the
            modern nomad and the transparent landlord.
          </p>
        </div>

        {/* Links (Removed dummy links) */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        </div>

        {/* Copyright */}
        <div style={{ color: 'var(--color-outline)', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} RentEscrow. Securely Decentralized.
        </div>
      </div>
    </footer>
  );
}
