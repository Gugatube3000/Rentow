/**
 * Framer Motion animation presets for RentEscrow
 * Scroll-triggered fades, staggers, and micro-interactions
 */
import { type Variants } from 'framer-motion';

/* ── Fade In from below (scroll-triggered) ─────────────── */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/* ── Fade In from left ─────────────────────────────────── */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Fade In from right ────────────────────────────────── */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Scale In (for cards, modals) ──────────────────────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ── Stagger Container ─────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ── Stagger children (used inside staggerContainer) ───── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Glow pulse for stats ──────────────────────────────── */
export const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/* ── Navbar slide down ─────────────────────────────────── */
export const navSlideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

/* ── Hero text reveal ──────────────────────────────────── */
export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/* ── Float animation for background blobs ──────────────── */
export const floatBlob: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

/* ── Hover lift for interactive cards ──────────────────── */
export const hoverLift = {
  rest: { y: 0, boxShadow: '0 0 0px rgba(168, 232, 255, 0)' },
  hover: {
    y: -4,
    boxShadow: '0 0 40px rgba(168, 232, 255, 0.1)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/* ── Viewport trigger defaults ─────────────────────────── */
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '-50px',
};
