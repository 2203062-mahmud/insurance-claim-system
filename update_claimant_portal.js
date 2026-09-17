const fs = require('fs');

const portalTemplate = `
import React, { useState, useEffect } from 'react';
import { getPolicies, getMyClaims, submitClaim } from '../../services/claimantApi';

export default function ClaimantPortal() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      loadData();
    } catch (err: any) { setError(err.message); }
  }

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Top Metric Overview & Greeting Deck */}
      <section className="relative w-full pt-space-md pb-space-lg overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-space-lg mb-space-lg">
          <div className="space-y-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="font-code-xs text-code-xs text-primary font-semibold tracking-wider uppercase">Vault Node ID: SEC-ALICE-8942-X</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Active Protection Hub</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Continuous cryptographic policy surveillance and real-time waterfall liquidity pool verified for <span className="text-on-surface font-semibold">Alice Johnson</span>.
            </p>
          </div>
          {/* Live Policy Status Badge & Quick FNOL Action */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-code-xs text-code-xs text-primary font-bold tracking-wide uppercase">Active &amp; Compliant</span>
              <span className="font-code-xs text-code-xs text-on-surface-variant ml-space-3xs">| RUET v4.2</span>
            </div>
            <button onClick={() => setShowWizard(true)} className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold shadow-[0_0_20px_rgba(78,222,163,0.35)] hover:shadow-[0_0_28px_rgba(78,222,163,0.55)] hover:bg-tertiary transition-all duration-200 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">add_moderator</span>
              <span>+ File New Claim (Instant FNOL)</span>
            </button>
          </div>
        </div>

        {/* 4 High-Density Operational Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">TOTAL POLICIES</span>
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight">{policies.length || 0}</div>
              <span className="font-code-xs text-code-xs text-primary flex items-center gap-1 mt-space-3xs">
                <span className="material-symbols-outlined text-[14px]">verified_user</span> 100% In Good Standing
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">policy</span>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">PROTECTION CAP</span>
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight">\${policies.reduce((sum, p) => sum + (p.coverageLimit || 0), 0).toLocaleString()}</div>
              <span className="font-code-xs text-code-xs text-secondary flex items-center gap-1 mt-space-3xs">
                <span className="material-symbols-outlined text-[14px]">lock</span> Solvency Reserved
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">ACTIVE CLAIMS</span>
              <div className="font-metric-display text-metric-display text-on-surface tracking-tight">{claims.length || 0}</div>
              <span className="font-code-xs text-code-xs text-on-surface-variant flex items-center gap-1 mt-space-3xs">
                <span className="material-symbols-outlined text-[14px]">pending_actions</span> In Adjudication Pipeline
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between group hover:bg-surface-container transition-all">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">NETWORK HEALTH</span>
              <div className="font-metric-display text-metric-display text-primary tracking-tight flex items-center gap-2">99.9% <span className="material-symbols-outlined text-[28px] animate-pulse">wifi_tethering</span></div>
              <span className="font-code-xs text-code-xs text-primary flex items-center gap-1 mt-space-3xs">
                Node Sync Active
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">dns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Grid: Policies & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        
        {/* LEFT: Policies List */}
        <div className="lg:col-span-8 space-y-space-md">
          {policies.map(p => (
            <div key={p.id} className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-lg shadow-xl relative overflow-hidden group hover:shadow-[0_0_24px_rgba(78,222,163,0.15)] transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-14 h-14 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined text-[32px]">{p.type === 'AUTO' ? 'directions_car' : p.type === 'HEALTH' ? 'monitor_heart' : 'home'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-code-xs text-code-xs text-on-surface-variant tracking-wider">{p.id}</span>
                      <span className="px-space-xs py-space-3xs rounded-full bg-primary/10 text-primary font-code-xs text-code-xs font-semibold uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(78,222,163,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {p.status}
                      </span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mt-space-3xs">{p.title}</h2>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-code-sm">{p.description}</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">COVERAGE CEILING</span>
                  <span className="font-metric-display text-metric-display text-primary">\${(p.coverageLimit || 0).toLocaleString()}</span>
                  <span className="font-code-xs text-code-xs text-on-surface-variant block">Deductible: \${(p.deductible || 0).toLocaleString()}</span>
                </div>
              </div>

              {p.type === 'AUTO' && (
                <div className="relative w-full h-36 rounded-lg overflow-hidden mb-space-md bg-surface-container-lowest">
                  <img className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity hover:opacity-60 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2IvaJK-73_NYH-1-o-eo0PSZzdZgd3lI6nNt-5Sm-bKSRnaCcQLWjz6qsiicBKoo_oQhCYdhodmxKJ8_B-nrKShzX5twam2usSjjpFWUyW4x2SF73M7mY6YTvr3jQgWag0madYPhUThn8MJHEeUwQfM2IjJPDM2KrqibSds7eHSXfaG565IQBGkfqpvmxjkKAC7wr-I4Elp-e8-9FQo7aUT3Fzt_8mR-zUD4UFwYiv0d3C7JJ2D9cmQ"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  <div className="absolute bottom-space-xs left-space-md right-space-md flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px]">satellite_alt</span>
                      <span className="font-code-xs text-code-xs text-on-surface">IoT Beacon Active</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {policies.length === 0 && (
            <div className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-lg text-center shadow-xl">
              <span className="material-symbols-outlined text-on-surface-variant text-[48px] mb-4">inventory_2</span>
              <h3 className="font-headline-sm text-on-surface">No policies found</h3>
              <p className="font-body-sm text-on-surface-variant mt-2">You currently have no active policies registered in the system.</p>
            </div>
          )}
        </div>

        {/* RIGHT: Claims History Feed */}
        <div className="lg:col-span-4 space-y-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-lg border border-outline-variant/30 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-xs mb-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">My Claims</h3>
              <span className="font-code-xs text-code-xs text-primary">{claims.length} Indexed</span>
            </div>
            
            <div className="flex-1 space-y-space-xs overflow-y-auto pr-1">
              {claims.map(c => (
                <div key={c.id} className="p-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/10 cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-code-xs text-code-xs text-on-surface tracking-wider group-hover:text-primary transition-colors">{c.id}</span>
                    <span className={\`font-code-xs text-code-xs px-1.5 py-0.5 rounded uppercase \${c.status === 'SUBMITTED' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}\`}>{c.status}</span>
                  </div>
                  <div className="flex items-center justify-between font-code-xs text-code-xs text-on-surface-variant">
                    <span>{c.incidentDate}</span>
                    <span className="font-semibold">\${(c.claimedAmount || 0).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {claims.length === 0 && (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-[32px] mb-2">assignment</span>
                  <p className="font-body-sm text-on-surface-variant">No claims filed yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low max-w-xl w-full rounded-xl p-space-lg shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">add_task</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Submit Instant FNOL</h4>
                  <span className="font-code-xs text-code-xs text-on-surface-variant">Automated Waterfall Adjudication Engine</span>
                </div>
              </div>
              <button type="button" onClick={() => setShowWizard(false)} className="p-space-2xs rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form className="space-y-space-md" onSubmit={handleSumbitClaim}>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">SELECT AFFECTED POLICY</label>
                <select value={policyId} onChange={e => setPolicyId(e.target.value)} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-body-sm text-body-sm border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">-- Choose a Policy --</option>
                  {policies.map(p => <option key={p.id} value={p.id}>{p.id} - {p.title} (Limit: \${(p.coverageLimit || 0).toLocaleString()})</option>)}
                </select>
              </div>
              
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">INCIDENT DATE</label>
                <input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-code-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">ESTIMATED LOSS / INITIAL CLAIM AMOUNT ($)</label>
                <input type="number" min="1" value={claimedAmount} onChange={e => setClaimedAmount(Number(e.target.value))} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-code-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. 1500" />
              </div>
              
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">INCIDENT SYNOPSIS</label>
                <textarea required value={incidentDescription} onChange={e => setIncidentDescription(e.target.value)} className="w-full p-space-sm rounded bg-surface-container text-on-surface font-body-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Brief summary of event..." rows={3}></textarea>
              </div>
              
              {error && <div className="p-3 bg-error-container text-on-error-container rounded-md text-sm">{error}</div>}
              
              <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-outline-variant/20 mt-4">
                <button type="button" onClick={() => setShowWizard(false)} className="px-space-md py-space-xs rounded hover:bg-surface-container text-on-surface font-body-sm cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-space-lg py-space-xs rounded bg-primary text-on-primary font-body-sm font-semibold shadow-[0_0_16px_rgba(78,222,163,0.3)] hover:bg-tertiary cursor-pointer flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Authorize & Transmit FNOL</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', portalTemplate);
console.log('ClaimantPortal synced with HTML design');
