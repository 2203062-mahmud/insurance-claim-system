
import { useState } from 'react';
import ClaimantPortal from './components/claimant/ClaimantPortal';

const AdjusterPortal = () => <div className="p-8 text-on-surface-variant font-code-sm"><h2>Adjuster Workspace (Member 2)</h2><p>Switch to feature/adjudication-loss-assessment to see this.</p></div>;
const AdminPortal = () => <div className="p-8 text-on-surface-variant font-code-sm"><h2>Governance & Admin (Member 3)</h2><p>Switch to feature/governance-settlement-analytics to see this.</p></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'CLAIMANT' | 'ADJUSTER' | 'ADMIN'>('CLAIMANT');

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]"><div className="h-20 w-full px-grid-margin-desktop flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center border border-primary/40 shadow-[0_0_16px_rgba(16,185,129,0.25)]"><span className="material-symbols-outlined text-primary text-[22px]">shield_with_heart</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">AegisClaims</span><span className="font-code-xs text-code-xs text-primary font-semibold tracking-wider uppercase mt-space-3xs">RUET Enterprise</span></div></div><div className="hidden xl:flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low border border-primary/20"><span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span><span className="font-code-xs text-code-xs text-primary tracking-wide">System Live - Waterfall Audit Compliant</span></div></div><nav className="hidden lg:flex items-center p-space-2xs rounded-lg bg-surface-container-low border border-outline-variant/30 gap-space-2xs" ><a  className="px-space-sm py-space-2xs rounded-lg font-body-sm transition-all bg-surface-container-highest text-primary border border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"  href="#" onClick={(e) => e.preventDefault()}>Alice Johnson (Policyholder)</a><a className="px-space-sm py-space-2xs rounded-lg font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"  href="#" onClick={(e) => e.preventDefault()}>Charlie Adjuster (Examiner)</a><a className="px-space-sm py-space-2xs rounded-lg font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"  href="#" onClick={(e) => e.preventDefault()}>Dana Admin (Executive Governance)</a></nav><div className="flex items-center gap-space-md"><div className="relative hidden md:block"><span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span><input className="w-56 lg:w-64 pl-9 pr-space-sm py-space-2xs rounded-md bg-surface-container text-on-surface placeholder-on-surface-variant font-code-sm text-code-sm border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search claim, hash, policy..." type="text"/></div><button className="relative p-space-xs rounded-md bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span></button><div className="flex items-center pl-space-xs"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></header>

      
      <main className="w-full pt-28 bg-background relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_65%)] pointer-events-none"></div>
        <div className="relative z-10 w-full px-grid-margin-desktop">
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
