import { useState } from 'react';
import ClaimantPortal from './components/claimant/ClaimantPortal';

const AdjusterPortal = () => <div className="p-8 text-on-surface-variant font-mono"><h2>Adjuster Workspace (Member 2)</h2><p>Switch to feature/adjudication-loss-assessment to see this.</p></div>;
const AdminPortal = () => <div className="p-8 text-on-surface-variant font-mono"><h2>Governance & Admin (Member 3)</h2><p>Switch to feature/governance-settlement-analytics to see this.</p></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'CLAIMANT' | 'ADJUSTER' | 'ADMIN'>('CLAIMANT');

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans">
      <header className="bg-surface-container/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-heading font-bold">I</span>
          </div>
          <h1 className="font-heading font-semibold text-lg tracking-wide">InsurCorp</h1>
        </div>
        
        <div className="bg-surface-container-lowest/80 p-1 border border-outline-variant/30 rounded-lg flex gap-1">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'CLAIMANT' ? 'bg-surface-container-high text-primary shadow-sm border border-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('CLAIMANT')}
          >
            Policyholder
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'ADJUSTER' ? 'bg-surface-container-high text-primary shadow-sm border border-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('ADJUSTER')}
          >
            Claims Adjuster
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'ADMIN' ? 'bg-surface-container-high text-primary shadow-sm border border-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('ADMIN')}
          >
            Executive
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        {activeTab === 'CLAIMANT' && <ClaimantPortal />}
        {activeTab === 'ADJUSTER' && <AdjusterPortal />}
        {activeTab === 'ADMIN'    && <AdminPortal />}
      </main>
    </div>
  );
}

export default App;
