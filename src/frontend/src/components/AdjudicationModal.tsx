import { useState } from 'react';
import type { Claim } from '../types';
import { adjudicateClaim } from '../api';

export default function AdjudicationModal({
  claim, onClose, onDone,
}: { claim: Claim; onClose: () => void; onDone: (c: Claim) => void }) {
  const [decision, setDecision] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [assessedLoss, setAssessedLoss] = useState(claim.claimedAmount);
  const [approvedAmount, setApprovedAmount] = useState(claim.claimedAmount);
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    try {
      const payload =
        decision === 'APPROVE'
          ? { decision, assessedLoss, approvedAmount, adjusterNotes: notes }
          : { decision, rejectionReason, adjusterNotes: notes };
      const updated = await adjudicateClaim(claim.id, payload);
      onDone(updated);
    } catch (e) {
      setError('Failed to submit decision. Check the values and try again.');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md text-white">
        <h2 className="text-xl font-semibold mb-4">Adjudicate {claim.claimNumber}</h2>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded ${decision === 'APPROVE' ? 'bg-emerald text-black' : 'bg-white/10'}`}
            onClick={() => setDecision('APPROVE')}
          >
            Approve
          </button>
          <button
            className={`flex-1 py-2 rounded ${decision === 'REJECT' ? 'bg-crimson text-black' : 'bg-white/10'}`}
            onClick={() => setDecision('REJECT')}
          >
            Reject
          </button>
        </div>

        {decision === 'APPROVE' ? (
          <>
            <label className="block text-sm mb-1">Assessed Loss ($)</label>
            <input
              type="number" value={assessedLoss}
              onChange={(e) => setAssessedLoss(Number(e.target.value))}
              className="w-full mb-3 p-2 rounded bg-ink border border-white/10"
            />
            <label className="block text-sm mb-1">Approved Amount ($)</label>
            <input
              type="number" value={approvedAmount}
              onChange={(e) => setApprovedAmount(Number(e.target.value))}
              className="w-full mb-3 p-2 rounded bg-ink border border-white/10"
            />
          </>
        ) : (
          <>
            <label className="block text-sm mb-1">Rejection Reason</label>
            <input
              type="text" value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-ink border border-white/10"
            />
          </>
        )}

        <label className="block text-sm mb-1">Adjuster Notes</label>
        <textarea
          value={notes} onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-ink border border-white/10"
        />

        {error && <p className="text-crimson text-sm mb-3">{error}</p>}

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-white/10">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-emerald text-black font-semibold">
            Submit Decision
          </button>
        </div>
      </div>
    </div>
  );
}