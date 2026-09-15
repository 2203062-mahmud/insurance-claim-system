import { useState } from 'react';
import ClaimantPortal from './components/claimant/ClaimantPortal';

const AdjusterPortal = () => <div className="p-8 text-slate-400 font-mono"><h2>Adjuster Workspace (Member 2)</h2><p>Switch to feature/adjudication-loss-assessment to see this.</p></div>;
const AdminPortal = () => <div className="p-8 text-slate-400 font-mono"><h2>Governance & Admin (Member 3)</h2><p>Switch to feature/governance-settlement-analytics to see this.</p></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'CLAIMANT' | 'ADJUSTER' | 'ADMIN'>('CLAIMANT');

  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-200 font-sans">
      <header className="bg-obsidian-800/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 font-heading font-bold">I</span>
          </div>
          <h1 className="font-heading font-semibold text-lg tracking-wide">InsurCorp</h1>
        </div>
        
        <div className="bg-slate-950/80 p-1 border border-white/5 rounded-lg flex gap-1">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'CLAIMANT' ? 'bg-slate-800 text-emerald-300 shadow-sm border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setActiveTab('CLAIMANT')}
          >
            Policyholder
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'ADJUSTER' ? 'bg-slate-800 text-emerald-300 shadow-sm border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setActiveTab('ADJUSTER')}
          >
            Claims Adjuster
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'ADMIN' ? 'bg-slate-800 text-emerald-300 shadow-sm border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
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
