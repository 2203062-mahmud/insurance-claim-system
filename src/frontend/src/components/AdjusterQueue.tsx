import { useEffect, useState } from 'react';
import type { Claim } from '../types';
import { getAdjusterQueue, assignClaim } from '../api';
import AdjudicationModal from './AdjudicationModal';

const statusColor: Record<string, string> = {
  SUBMITTED: 'bg-cyan/20 text-cyan',
  UNDER_REVIEW: 'bg-amber/20 text-amber',
  APPROVED: 'bg-emerald/20 text-emerald',
  REJECTED: 'bg-crimson/20 text-crimson',
};

export default function AdjusterQueue() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selected, setSelected] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getAdjusterQueue();
    setClaims(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAssign(claim: Claim) {
    await assignClaim(claim.id, 'USR-003', 'Charlie Miller');
    load();
  }

  return (
    <div className="min-h-screen bg-ink text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">Claims Adjudication Queue</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-white/50 border-b border-white/10">
              <th className="py-2">Claim #</th>
              <th>Policyholder</th>
              <th>Type</th>
              <th>Claimed</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} className="border-b border-white/5">
                <td className="py-3 font-mono text-sm">{c.claimNumber}</td>
                <td>{c.policyholderName}</td>
                <td>{c.policyType}</td>
                <td>${c.claimedAmount.toLocaleString()}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[c.status] || ''}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  {c.status === 'SUBMITTED' && (
                    <button onClick={() => handleAssign(c)} className="px-3 py-1 rounded bg-cyan/20 text-cyan text-sm mr-2">
                      Assign to me
                    </button>
                  )}
                  {(c.status === 'UNDER_REVIEW') && (
                    <button onClick={() => setSelected(c)} className="px-3 py-1 rounded bg-emerald/20 text-emerald text-sm">
                      Adjudicate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && (
        <AdjudicationModal
          claim={selected}
          onClose={() => setSelected(null)}
          onDone={() => { setSelected(null); load(); }}
        />
      )}
    </div>
  );
}