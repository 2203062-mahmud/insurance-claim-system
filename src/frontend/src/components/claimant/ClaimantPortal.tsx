import React, { useState, useEffect } from 'react';
import { getPolicies, getMyClaims, submitClaim } from '../../services/claimantApi';

export default function ClaimantPortal() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [policyId, setPolicyId] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [claimedAmount, setClaimedAmount] = useState(0);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      setPolicies(await getPolicies());
      setClaims(await getMyClaims());
    } catch (e) { console.error(e); }
  }

  async function handleSumbitClaim(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await submitClaim({ policyId, incidentDate, incidentDescription, claimedAmount: Number(claimedAmount), evidenceUrls: ['demo_receipt.png'] });
      setShowWizard(false);
      setStep(1);
      loadData();
    } catch (err: any) { setError(err.message); }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-on-surface">Policyholder Dashboard</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage your policies and track claims.</p>
        </div>
        <button 
          onClick={() => { setShowWizard(!showWizard); setStep(1); }} 
          className="bg-primary hover:bg-emerald-400 text-on-primary font-semibold shadow-[0_0_12px_rgba(16,185,129,0.35)] rounded-lg px-5 py-2.5 transition-all focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#090D14]"
        >
          {showWizard ? 'Cancel Filing' : '+ File a New Claim'}
        </button>
      </div>

      {showWizard && (
        <div className="bg-surface-container/80 backdrop-blur-xl border border-primary/20 rounded-xl p-8 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75),0_0_16px_-2px_rgba(16,185,129,0.08)]">
          <div className="mb-8 flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-container-high -z-10"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 -z-10 transition-all`} style={{ width: `${(step-1)*33.33}%` }}></div>
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm transition-all ${step === s ? 'bg-surface-container border-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] text-cyan-400' : step > s ? 'bg-primary text-on-primary' : 'bg-surface-container border border-slate-700 text-on-surface-variant'}`}>
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-heading text-on-surface mb-6">Step {step}: {step===1 ? 'Select Policy' : step===2 ? 'Incident Details' : step===3 ? 'Financial Loss' : 'Summary'}</h3>
          {error && <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">⚠️ {error}</div>}
          
          <form onSubmit={(e) => { e.preventDefault(); if(step===4) handleSumbitClaim(e); else setStep(step+1); }}>
            <div className="space-y-5">
              {step === 1 && (
                <div>
                  <label className="block text-sm text-on-surface-variant font-medium mb-2 uppercase tracking-wider text-xs">Active Policy</label>
                  <select value={policyId} onChange={e => setPolicyId(e.target.value)} required className="w-full h-10 bg-surface-container/80 border border-outline-variant/50 rounded-md px-3 text-on-surface text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-emerald-500/60">
                    <option value="">-- Choose a Policy --</option>
                    {policies.map(p => <option key={p.id} value={p.id}>{p.type} Insurance - Limit: ${p.coverageLimit.toLocaleString()}</option>)}
                  </select>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-on-surface-variant font-medium mb-2 uppercase tracking-wider text-xs">Incident Date</label>
                    <input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} required className="w-full h-10 bg-surface-container/80 border border-outline-variant/50 rounded-md px-3 text-on-surface text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-emerald-500/60" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-on-surface-variant font-medium mb-2 uppercase tracking-wider text-xs">Description</label>
                    <input type="text" placeholder="Briefly describe what happened..." value={incidentDescription} onChange={e => setIncidentDescription(e.target.value)} required className="w-full h-10 bg-surface-container/80 border border-outline-variant/50 rounded-md px-3 text-on-surface text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-emerald-500/60" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <label className="block text-sm text-on-surface-variant font-medium mb-2 uppercase tracking-wider text-xs">Claimed Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-on-surface-variant">$</span>
                    <input type="number" value={claimedAmount} onChange={e => setClaimedAmount(Number(e.target.value))} min="1" required className="w-full h-10 bg-surface-container/80 border border-outline-variant/50 rounded-md pl-7 pr-3 text-on-surface text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-emerald-500/60 font-mono" />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="bg-surface-container/50 rounded-lg border border-outline-variant/30 p-4 font-mono text-sm space-y-2">
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2"><span className="text-on-surface-variant">Policy ID</span><span className="text-on-surface">{policyId}</span></div>
                  <div className="flex justify-between border-b border-outline-variant/30 py-2"><span className="text-on-surface-variant">Date</span><span className="text-on-surface">{incidentDate}</span></div>
                  <div className="flex justify-between py-2"><span className="text-on-surface-variant">Claimed Amount</span><span className="text-primary">${claimedAmount.toLocaleString()}</span></div>
                </div>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              {step > 1 && <button type="button" onClick={() => setStep(step-1)} className="px-5 py-2.5 rounded-lg bg-surface-container/60 border border-outline-variant/50 text-on-surface hover:border-primary/40 hover:text-primary transition-all font-medium text-sm">Back</button>}
              <button type="submit" className="bg-primary hover:bg-emerald-400 text-on-primary font-semibold shadow-[0_0_12px_rgba(16,185,129,0.35)] rounded-lg px-5 py-2.5 transition-all text-sm">{step === 4 ? 'Submit Claim securely' : 'Continue'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-surface-container-low/90 backdrop-blur-md px-5 py-3 border-b border-outline-variant/30 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">My Active Policies</h3>
          </div>
          <div className="p-5 space-y-4">
            {policies.map(p => (
              <div key={p.id} className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 hover:border-primary/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-on-surface font-medium">{p.type} Insurance</div>
                    <div className="text-on-surface-variant font-mono text-xs mt-1">{p.id}</div>
                  </div>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-2 py-0.5 rounded-full text-xs font-mono uppercase">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-outline-variant/30">
                  <div>
                    <div className="text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">Coverage Limit</div>
                    <div className="text-on-surface font-mono text-sm">${p.coverageLimit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">Deductible</div>
                    <div className="text-on-surface font-mono text-sm">${p.deductible.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-surface-container-low/90 backdrop-blur-md px-5 py-3 border-b border-outline-variant/30 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">My Claims Tracking</h3>
          </div>
          <div className="p-5 space-y-3">
            {claims.map(c => (
              <div key={c.id} className="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex items-center justify-between group hover:bg-primary/[0.02] transition-colors">
                <div>
                  <div className="text-on-surface font-mono text-sm mb-1">{c.id}</div>
                  <div className="text-on-surface-variant text-xs">{c.incidentDate} • ${c.claimedAmount.toLocaleString()}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase border ${
                  c.status === 'SUBMITTED' ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400' :
                  c.status === 'UNDER_REVIEW' ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' :
                  c.status === 'APPROVED' || c.status === 'SETTLED' ? 'bg-primary/10 border-primary/30 text-primary' :
                  'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {c.status.replace('_', ' ')}
                </span>
              </div>
            ))}
            {claims.length === 0 && <div className="text-center py-10 text-on-surface-variant text-sm">No claims filed yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
