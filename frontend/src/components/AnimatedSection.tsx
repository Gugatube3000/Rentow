'use client';

import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { type ReactNode } from 'react';
import { type Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

/**
 * Reusable scroll-triggered animated section wrapper.
 * Wraps children in a motion.div that fades in when scrolled into view.
 */
export default function AnimatedSection({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
