const fs = require('fs');

let html = fs.readFileSync('header.html', 'utf-8');
html = html.replace(/class=/g, 'className=');
html = html.replace(/<input([^>]+?)>/g, (m, p1) => {
  if (p1.endsWith('/')) return m;
  return `<input${p1} />`;
});
html = html.replace(/aria-current="page"/g, '');
html = html.replace(/data-active-classes="[^"]*"/g, '');
html = html.replace(/data-path="[^"]*"/g, '');
html = html.replace(/href="#"/g, 'href="#" onClick={(e) => e.preventDefault()}');

// Replace the Alice link
html = html.replace(/<a([^>]*)>Alice Johnson \(Policyholder\)<\/a>/, 
  `<button $1 onClick={() => setActiveTab('CLAIMANT')} className={\`px-space-sm py-space-2xs rounded-lg font-body-sm transition-all \${activeTab === 'CLAIMANT' ? 'bg-surface-container-highest text-primary border border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}\`}>Alice Johnson (Policyholder)</button>`);

// Replace the Charlie link
html = html.replace(/<a([^>]*)>Charlie Adjuster \(Examiner\)<\/a>/, 
  `<button $1 onClick={() => setActiveTab('ADJUSTER')} className={\`px-space-sm py-space-2xs rounded-lg font-body-sm transition-all \${activeTab === 'ADJUSTER' ? 'bg-surface-container-highest text-primary border border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}\`}>Charlie Adjuster (Examiner)</button>`);

// Replace the Dana link
html = html.replace(/<a([^>]*)>Dana Admin \(Executive Governance\)<\/a>/, 
  `<button $1 onClick={() => setActiveTab('ADMIN')} className={\`px-space-sm py-space-2xs rounded-lg font-body-sm transition-all \${activeTab === 'ADMIN' ? 'bg-surface-container-highest text-primary border border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}\`}>Dana Admin (Executive Governance)</button>`);

const appJsx = `
import { useState } from 'react';
import ClaimantPortal from './components/claimant/ClaimantPortal';

const AdjusterPortal = () => <div className="p-8 text-on-surface-variant font-code-sm"><h2>Adjuster Workspace (Member 2)</h2><p>Switch to feature/adjudication-loss-assessment to see this.</p></div>;
const AdminPortal = () => <div className="p-8 text-on-surface-variant font-code-sm"><h2>Governance & Admin (Member 3)</h2><p>Switch to feature/governance-settlement-analytics to see this.</p></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'CLAIMANT' | 'ADJUSTER' | 'ADMIN'>('CLAIMANT');

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      ${html}
      
      <main className="w-full pt-28 bg-background relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_65%)] pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-grid-margin-desktop">
          <div className="flex flex-col w-full pb-space-3xl">
            {activeTab === 'CLAIMANT' && <ClaimantPortal />}
            {activeTab === 'ADJUSTER' && <AdjusterPortal />}
            {activeTab === 'ADMIN'    && <AdminPortal />}
          </div>
        </div>
      </main>
      
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-space-lg mt-space-3xl relative z-10">
        <div className="w-full px-grid-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-code-xs text-code-xs">
          <span>RUET Enterprise Insurance Lifecycle Architecture • ISO/IEC 27001 & SOC-2 Type II Certified</span>
          <span>© 2025 AegisClaims Systems Inc. All waterfall transactions cryptographic ledger verified.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
`;

fs.writeFileSync('src/frontend/src/App.tsx', appJsx);
console.log('App.tsx updated');
