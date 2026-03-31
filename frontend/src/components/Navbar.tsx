'use client';

import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { navSlideDown } from '@/lib/animations';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/network', label: 'Network' },
  { href: '/leases', label: 'Leases' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 1rem',
      }}
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
    >
      <nav
        className="glass-nav"
        style={{
          marginTop: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '80rem',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: mobileOpen ? 'var(--radius-lg)' : 'var(--radius-full)',
          overflow: 'hidden',
          transition: 'all 300ms ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                color: 'var(--color-primary-container)',
                fontSize: '1.5rem',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              shield_with_heart
            </span>
            <span
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              RentEscrow
            </span>
          </Link>

          {/* Nav Links — hidden on mobile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="nav-links-desktop"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    padding: '0.375rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    color: isActive
                      ? 'var(--color-primary-container)'
                      : 'var(--color-on-surface-variant)',
                    borderBottom: isActive
                      ? '2px solid var(--color-primary-container)'
                      : '2px solid transparent',
                    transition: 'all 300ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-on-surface)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-on-surface-variant)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Wallet Connect & Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <div className="wallet-button-wrapper">
              <ConnectButton
                chainStatus="icon"
                accountStatus="avatar"
                showBalance={false}
              />
            </div>

            <button
              className="mobile-menu-btn btn-ghost"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface)' }}>
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          className="mobile-nav-panel"
        >
          <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface)',
                    background: isActive ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </nav>

      <style jsx>{`
        .mobile-menu-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
