import React, { useState, useEffect } from 'react';
import { getPolicies, getMyClaims, submitClaim } from '../../services/claimantApi';

export default function ClaimantPortal() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wizard state
  const [step, setStep] = useState(1);
  const [policyId, setPolicyId] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [claimedAmount, setClaimedAmount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setPolicies(await getPolicies());
      setClaims(await getMyClaims());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSumbitClaim(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await submitClaim({
        policyId,
        incidentDate,
        incidentDescription,
        claimedAmount: Number(claimedAmount),
        evidenceUrls: ['demo_receipt.png']
      });
      setShowWizard(false);
      setStep(1);
      loadData(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Policyholder Dashboard</h1>
      <button onClick={() => setShowWizard(!showWizard)} style={{ marginBottom: '20px' }}>
        {showWizard ? 'Cancel Claim Submission' : 'File a New Claim'}
      </button>

      {showWizard && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
          <h2>Claim Submission Wizard - Step {step}</h2>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <form onSubmit={(e) => { e.preventDefault(); if(step===4) handleSumbitClaim(e); else setStep(step+1); }}>
            
            {step === 1 && (
              <div>
                <label>Select Active Policy: </label>
                <select value={policyId} onChange={e => setPolicyId(e.target.value)} required>
                  <option value="">-- Choose --</option>
                  {policies.map(p => (
                    <option key={p.id} value={p.id}>{p.type} - limit: ${p.coverageLimit}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 2 && (
              <div>
                <div>
                  <label>Incident Date: </label>
                  <input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} required />
                </div>
                <div>
                  <label>Description: </label>
                  <input type="text" value={incidentDescription} onChange={e => setIncidentDescription(e.target.value)} required />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label>Financial Loss Amount ($): </label>
                <input type="number" value={claimedAmount} onChange={e => setClaimedAmount(Number(e.target.value))} min="1" required />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3>Summary</h3>
                <p>Policy: {policyId}</p>
                <p>Date: {incidentDate}</p>
                <p>Description: {incidentDescription}</p>
                <p>Amount: ${claimedAmount}</p>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              {step > 1 && <button type="button" onClick={() => setStep(step-1)} style={{ marginRight: '10px' }}>Back</button>}
              <button type="submit">{step === 4 ? 'Confirm & Submit' : 'Next'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
          <h3>My Active Policies</h3>
          {policies.map(p => (
             <div key={p.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
               <p><strong>{p.type}</strong> ({p.id})</p>
               <p>Limit: ${p.coverageLimit} | Deductible: ${p.deductible}</p>
             </div>
          ))}
        </div>
        
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
          <h3>My Claims Tracking</h3>
          {claims.map(c => (
             <div key={c.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
               <p><strong>{c.id}</strong> - <span style={{ background: '#eee', padding: '2px 5px', borderRadius: '4px' }}>{c.status}</span></p>
               <p>Claimed: ${c.claimedAmount}</p>
               <p>Date: {c.incidentDate}</p>
             </div>
          ))}
          {claims.length === 0 && <p>No claims filed yet.</p>}
        </div>
      </div>
    </div>
  );
}
