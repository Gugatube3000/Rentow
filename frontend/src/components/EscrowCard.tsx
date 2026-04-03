'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
  useEscrowDetails,
  useConfirmLease,
  useReleaseFunds,
  useRefund,
  useRateLandlord,
} from '@/lib/hooks';

interface EscrowCardProps {
  escrowAddress: `0x${string}`;
}

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatDeadline(deadline: bigint) {
  const date = new Date(Number(deadline) * 1000);
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days}d ${hours}h remaining`;
  return `${hours}h remaining`;
}

export default function EscrowCard({ escrowAddress }: EscrowCardProps) {
  const { address: walletAddress } = useAccount();
  const { details, isLoading } = useEscrowDetails(escrowAddress);
  const { confirmLease, isPending: confirmPending, isConfirming: confirmTxWait } = useConfirmLease(escrowAddress);
  const { releaseFunds, isPending: releasePending, isConfirming: releaseTxWait } = useReleaseFunds(escrowAddress);
  const { refund, isPending: refundPending, isConfirming: refundTxWait } = useRefund(escrowAddress);
  const { rateLandlord, isPending: ratePending } = useRateLandlord(escrowAddress);

  const [showRating, setShowRating] = useState(false);

  if (isLoading || !details) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '12rem',
        }}
      >
        <div style={{ textAlign: 'center', color: 'var(--color-outline)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', animation: 'pulse 1.5s ease-in-out infinite' }}>
            hourglass_empty
          </span>
          <span style={{ fontSize: '0.8rem' }}>Loading escrow...</span>
        </div>
      </div>
    );
  }

  const isTenant =
    walletAddress?.toLowerCase() === details.tenant.toLowerCase();
  const isLandlord =
    walletAddress?.toLowerCase() === details.landlord.toLowerCase();
  const role = isTenant ? 'Tenant' : isLandlord ? 'Landlord' : 'Viewer';

  const deadlineExpired = Number(details.deadline) * 1000 < Date.now();

  // Determine status
  let status = 'Funded';
  let statusColor = 'var(--color-primary-container)';
  if (details.confirmed) {
    status = 'Confirmed';
    statusColor = 'var(--color-success)';
  } else if (details.tenantConfirmed && !details.landlordConfirmed) {
    status = 'Awaiting Landlord';
    statusColor = 'var(--color-secondary)';
  } else if (!details.tenantConfirmed && details.landlordConfirmed) {
    status = 'Awaiting Tenant';
    statusColor = 'var(--color-secondary)';
  }
  if (parseFloat(details.balanceEth) === 0 && details.confirmed) {
    status = 'Released';
    statusColor = 'var(--color-outline)';
  }
  if (deadlineExpired && !details.confirmed) {
    status = 'Refundable';
    statusColor = 'var(--color-error)';
  }

  return (
    <motion.div
      className="glass-card"
      style={{ overflow: 'hidden' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div
            className="icon-box"
            style={{
              width: '3rem',
              height: '3rem',
              background: `${statusColor}15`,
              color: statusColor,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {status === 'Released' ? 'check_circle' : status === 'Confirmed' ? 'verified' : 'lock'}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Escrow Contract
            </div>
            <div style={{ fontWeight: 600, fontFamily: 'var(--font-headline)', fontSize: '0.9rem' }}>
              {shortenAddress(escrowAddress)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="pulse-dot" style={{ background: statusColor }} />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: statusColor,
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
        }}
      >
        <DetailItem label="Deposit" value={`${details.amountEth} ETH`} color="var(--color-primary-container)" />
        <DetailItem label="Balance" value={`${parseFloat(details.balanceEth).toFixed(4)} ETH`} color="var(--color-success)" />
        <DetailItem label="Yield" value={`${details.yieldPercent.toString()}%`} color="var(--color-secondary)" />
        <DetailItem label="Deadline" value={formatDeadline(details.deadline)} color="var(--color-outline)" />
        <DetailItem label="Tenant" value={shortenAddress(details.tenant)} color={isTenant ? 'var(--color-primary)' : 'var(--color-on-surface-variant)'} />
        <DetailItem label="Landlord" value={shortenAddress(details.landlord)} color={isLandlord ? 'var(--color-primary)' : 'var(--color-on-surface-variant)'} />
      </div>

      {/* Confirmation Status */}
      <div
        style={{
          padding: '0 1.5rem 1rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <ConfirmBadge label="Tenant" confirmed={details.tenantConfirmed} />
        <ConfirmBadge label="Landlord" confirmed={details.landlordConfirmed} />
        {Number(details.numRatings) > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
            ⭐ {details.averageRating.toFixed(1)} / 5.0
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {role}
        </span>

        <div style={{ flex: 1 }} />

        {/* Confirm button */}
        {!details.confirmed && ((isTenant && !details.tenantConfirmed) || (isLandlord && !details.landlordConfirmed)) && (
          <ActionButton
            label={confirmPending || confirmTxWait ? 'Confirming...' : 'Confirm Lease'}
            icon="verified"
            onClick={confirmLease}
            disabled={confirmPending || confirmTxWait}
            variant="primary"
          />
        )}

        {/* Release button */}
        {details.confirmed && parseFloat(details.balanceEth) > 0 && (
          <ActionButton
            label={releasePending || releaseTxWait ? 'Releasing...' : 'Release Funds'}
            icon="send_money"
            onClick={releaseFunds}
            disabled={releasePending || releaseTxWait}
            variant="success"
          />
        )}

        {/* Refund button */}
        {isTenant && !details.confirmed && deadlineExpired && parseFloat(details.balanceEth) > 0 && (
          <ActionButton
            label={refundPending || refundTxWait ? 'Refunding...' : 'Refund'}
            icon="undo"
            onClick={refund}
            disabled={refundPending || refundTxWait}
            variant="error"
          />
        )}

        {/* Rate button */}
        {isTenant && details.confirmed && (
          <>
            {showRating ? (
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      rateLandlord(s);
                      setShowRating(false);
                    }}
                    disabled={ratePending}
                    style={{
                      background: 'var(--color-surface-container-high)',
                      border: '1px solid var(--color-outline-variant)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.375rem 0.625rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      color: 'var(--color-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {s}⭐
                  </button>
                ))}
              </div>
            ) : (
              <ActionButton
                label="Rate"
                icon="star"
                onClick={() => setShowRating(true)}
                variant="secondary"
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Sub-components ──────────────────────────────────────────

function DetailItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: '0.65rem', color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.95rem', fontWeight: 600, color, fontFamily: 'var(--font-headline)' }}>
        {value}
      </div>
    </div>
  );
}

function ConfirmBadge({ label, confirmed }: { label: string; confirmed: boolean }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.7rem',
        fontWeight: 600,
        background: confirmed ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${confirmed ? 'rgba(0, 255, 136, 0.2)' : 'var(--color-outline-variant)'}`,
        color: confirmed ? 'var(--color-success)' : 'var(--color-outline)',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem', fontVariationSettings: "'FILL' 1" }}>
        {confirmed ? 'check_circle' : 'radio_button_unchecked'}
      </span>
      {label}
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  disabled,
  variant = 'primary',
}: {
  label: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'error' | 'secondary';
}) {
  const colors: Record<string, { bg: string; border: string; color: string }> = {
    primary: { bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.3)', color: 'var(--color-primary)' },
    success: { bg: 'rgba(0, 255, 136, 0.1)', border: 'rgba(0, 255, 136, 0.3)', color: 'var(--color-success)' },
    error: { bg: 'rgba(255, 180, 171, 0.1)', border: 'rgba(255, 180, 171, 0.3)', color: 'var(--color-error)' },
    secondary: { bg: 'rgba(205, 189, 255, 0.1)', border: 'rgba(205, 189, 255, 0.3)', color: 'var(--color-secondary)' },
  };
  const c = colors[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 700,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 200ms ease',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </motion.button>
  );
}
