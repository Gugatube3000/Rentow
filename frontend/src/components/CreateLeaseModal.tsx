'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateEscrow } from '@/lib/hooks';

interface CreateLeaseModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DURATION_OPTIONS = [
  { label: '7 days', value: 7 * 24 * 60 * 60 },
  { label: '30 days', value: 30 * 24 * 60 * 60 },
  { label: '90 days', value: 90 * 24 * 60 * 60 },
  { label: '180 days', value: 180 * 24 * 60 * 60 },
  { label: '1 year', value: 365 * 24 * 60 * 60 },
];

export default function CreateLeaseModal({ open, onClose, onSuccess }: CreateLeaseModalProps) {
  const [landlord, setLandlord] = useState('');
  const [deposit, setDeposit] = useState('');
  const [duration, setDuration] = useState(DURATION_OPTIONS[1].value);
  const [yieldPercent, setYieldPercent] = useState('3');
  const [formError, setFormError] = useState('');

  const { createEscrow, isPending, isConfirming, isSuccess, error, newEscrowAddress } =
    useCreateEscrow();

  const handleSubmit = () => {
    setFormError('');

    // Validation
    if (!landlord || !landlord.startsWith('0x') || landlord.length !== 42) {
      setFormError('Enter a valid Ethereum address (0x...)');
      return;
    }
    const depositNum = parseFloat(deposit);
    if (!deposit || isNaN(depositNum) || depositNum <= 0) {
      setFormError('Enter a valid deposit amount');
      return;
    }
    const yieldNum = parseInt(yieldPercent);
    if (isNaN(yieldNum) || yieldNum < 0 || yieldNum > 50) {
      setFormError('Yield must be between 0 and 50');
      return;
    }

    createEscrow(landlord as `0x${string}`, duration, yieldNum, deposit);
  };

  const handleClose = () => {
    if (isSuccess && onSuccess) onSuccess();
    setLandlord('');
    setDeposit('');
    setYieldPercent('3');
    setFormError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            padding: '1rem',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '32rem',
              padding: '2rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--color-outline)',
                cursor: 'pointer',
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div
                  className="icon-box"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: 'var(--color-primary-container)',
                  }}
                >
                  <span className="material-symbols-outlined">edit_document</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Create Escrow Lease</h2>
              </div>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.875rem' }}>
                Lock ETH into a secure smart contract escrow. Both parties must confirm to release.
              </p>
            </div>

            {/* Success State */}
            {isSuccess && newEscrowAddress ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '4rem',
                    color: 'var(--color-success)',
                    display: 'block',
                    marginBottom: '1rem',
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  check_circle
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Escrow Created!</h3>
                <p
                  style={{
                    color: 'var(--color-on-surface-variant)',
                    fontSize: '0.8rem',
                    wordBreak: 'break-all',
                    marginBottom: '1.5rem',
                  }}
                >
                  {newEscrowAddress}
                </p>
                <button className="btn-gradient" onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Landlord Address */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-on-surface-variant)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Landlord Wallet Address
                    </label>
                    <input
                      className="input-glass"
                      placeholder="0x..."
                      value={landlord}
                      onChange={(e) => setLandlord(e.target.value)}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  {/* Deposit + Yield Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--color-on-surface-variant)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Deposit (ETH)
                      </label>
                      <input
                        className="input-glass"
                        type="number"
                        step="0.001"
                        min="0"
                        placeholder="0.1"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--color-on-surface-variant)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Yield (%)
                      </label>
                      <input
                        className="input-glass"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="3"
                        value={yieldPercent}
                        onChange={(e) => setYieldPercent(e.target.value)}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-on-surface-variant)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Lease Duration
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {DURATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setDuration(opt.value)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background:
                              duration === opt.value
                                ? 'var(--gradient-primary)'
                                : 'var(--color-surface-container-high)',
                            color:
                              duration === opt.value
                                ? 'white'
                                : 'var(--color-on-surface-variant)',
                            border:
                              duration === opt.value
                                ? 'none'
                                : '1px solid var(--color-outline-variant)',
                            cursor: 'pointer',
                            transition: 'all 200ms ease',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  {(formError || error) && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 180, 171, 0.1)',
                        border: '1px solid rgba(255, 180, 171, 0.2)',
                        color: 'var(--color-error)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {formError || (error as any)?.shortMessage || error?.message || 'Transaction failed'}
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    className="btn-gradient"
                    onClick={handleSubmit}
                    disabled={isPending || isConfirming}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1rem',
                      opacity: isPending || isConfirming ? 0.6 : 1,
                    }}
                  >
                    {isPending
                      ? '⏳ Confirm in Wallet...'
                      : isConfirming
                        ? '⛏️ Mining Transaction...'
                        : '🔒 Create Escrow'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
