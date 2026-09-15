import { useState } from 'react';
import './App.css';
import ClaimantPortal from './components/claimant/ClaimantPortal';

// Placeholder components - Members will replace these with their actual imports!
const AdjusterPortal = () => <div className="p-8"><h2>Adjuster Workspace (Member 2)</h2><p>Claims queue and adjudication go here.</p></div>;
const AdminPortal = () => <div className="p-8"><h2>Governance & Admin (Member 3)</h2><p>Settlement and analytics go here.</p></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'CLAIMANT' | 'ADJUSTER' | 'ADMIN'>('CLAIMANT');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ padding: '1rem', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
        <strong>Role Switcher:</strong>
        <button 
          style={{ fontWeight: activeTab === 'CLAIMANT' ? 'bold' : 'normal' }}
          onClick={() => setActiveTab('CLAIMANT')}
        >
          Policyholder
        </button>
        <button 
          style={{ fontWeight: activeTab === 'ADJUSTER' ? 'bold' : 'normal' }}
          onClick={() => setActiveTab('ADJUSTER')}
        >
          Claims Adjuster
        </button>
        <button 
          style={{ fontWeight: activeTab === 'ADMIN' ? 'bold' : 'normal' }}
          onClick={() => setActiveTab('ADMIN')}
        >
          Executive/Admin
        </button>
      </nav>

      <main style={{ padding: '2rem' }}>
        {activeTab === 'CLAIMANT' && <ClaimantPortal />}
        {activeTab === 'ADJUSTER' && <AdjusterPortal />}
        {activeTab === 'ADMIN'    && <AdminPortal />}
      </main>
    </div>
  );
}

export default App;
