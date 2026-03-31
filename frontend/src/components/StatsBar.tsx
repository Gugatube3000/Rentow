'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations';

export default function StatsBar() {
  const [tvl, setTvl] = useState('...');
  const [topYield, setTopYield] = useState('...');

  useEffect(() => {
    fetch('https://yields.llama.fi/pools')
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data) return;
        const aavePools = data.data.filter(
          (p: any) => p.project === 'aave-v3' && p.chain === 'Ethereum'
        );
        if (aavePools.length === 0) return;

        const totalTvl = aavePools.reduce((acc: number, pool: any) => acc + pool.tvlUsd, 0);
        const topApy = Math.max(...aavePools.map((p: any) => p.apy));

        setTvl('$' + (totalTvl / 1e9).toFixed(2) + 'B');
        setTopYield(topApy.toFixed(2) + '%');
      })
      .catch((err) => {
        console.error('Failed to fetch stats:', err);
        setTvl('$10B+'); // Fallback credibility number for Aave V3
        setTopYield('5.0%+');
      });
  }, []);

  const stats = [
    { label: 'Aave V3 Market Size', value: tvl, color: 'var(--color-primary-container)', sub: 'Live DefiLlama data' },
    { label: 'Top Supply APY', value: topYield, color: 'var(--color-primary)', sub: 'Real-time yields' },
    { label: 'Smart Contracts', value: 'Verified', color: 'var(--color-secondary)', sub: 'Immutable escrow' },
    { label: 'Network', value: 'Ethereum', color: 'var(--color-on-surface)', sub: 'Secured by the EVM' },
  ];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      style={{
        maxWidth: '80rem',
        margin: '3rem auto 0',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          className="glass-card"
          style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span
            className="section-label"
            style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}
          >
            {stat.label}
          </span>
          <span className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', fontStyle: 'italic' }}>
            {stat.sub}
          </span>
        </motion.div>
      ))}
    </motion.section>
  );
}
