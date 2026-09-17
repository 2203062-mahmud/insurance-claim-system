const fs = require('fs');

let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

// 1. Imports
code = code.replace(
  "import { getPolicies, getMyClaims, submitClaim, withdrawClaimApi } from '../../services/claimantApi';",
  "import { getPolicies, getMyClaims, submitClaim, withdrawClaimApi, createPolicyApi } from '../../services/claimantApi';"
);

// 2. State
code = code.replace(
  "const [showWizard, setShowWizard] = useState(false);",
  "const [showWizard, setShowWizard] = useState(false);\n  const [showPolicyModal, setShowPolicyModal] = useState(false);\n  const [newPolicy, setNewPolicy] = useState({ type: 'AUTO', title: '', description: '', coverageLimit: 50000, deductible: 500 });"
);

// 3. Handler
const handleCreatePolicy = `
  async function handleCreatePolicy(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createPolicyApi(newPolicy);
      setShowPolicyModal(false);
      loadData();
    } catch (err: any) { alert(err.message); }
  }
`;
code = code.replace("async function loadData() {", handleCreatePolicy + "\n  async function loadData() {");

// 4. Create Policy Button
code = code.replace(
  '<span className="font-code-xs text-code-xs text-on-surface-variant ml-space-3xs">| RUET v4.2</span>',
  '<span className="font-code-xs text-code-xs text-on-surface-variant ml-space-3xs">| RUET v4.2</span>\n            <button onClick={() => setShowPolicyModal(true)} className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm shadow hover:bg-surface-container-highest transition-all duration-200 cursor-pointer">\n              <span className="material-symbols-outlined text-[18px]">add</span>\n              <span>Custom Policy</span>\n            </button>'
);

// 5. Create Policy Modal UI
const policyModal = `
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low max-w-xl w-full rounded-xl p-space-lg shadow-2xl relative overflow-hidden border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Generate Custom Policy</h4>
                </div>
              </div>
              <button type="button" onClick={() => setShowPolicyModal(false)} className="p-space-2xs rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form className="space-y-space-md" onSubmit={handleCreatePolicy}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">POLICY TYPE</label>
                  <select value={newPolicy.type} onChange={e => setNewPolicy({...newPolicy, type: e.target.value})} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-body-sm text-body-sm border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option value="AUTO">Automobile (AUTO)</option>
                    <option value="HEALTH">Medical / Health (HEALTH)</option>
                    <option value="HOME">Real Estate (HOME)</option>
                    <option value="LIFE">Life Insurance (LIFE)</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">COVERAGE LIMIT ($)</label>
                  <input type="number" min="1000" value={newPolicy.coverageLimit} onChange={e => setNewPolicy({...newPolicy, coverageLimit: Number(e.target.value)})} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-code-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">POLICY TITLE</label>
                <input type="text" value={newPolicy.title} onChange={e => setNewPolicy({...newPolicy, title: e.target.value})} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-code-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. My Custom Ferrari Protection" />
              </div>

              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs">DEDUCTIBLE ($)</label>
                <input type="number" min="0" value={newPolicy.deductible} onChange={e => setNewPolicy({...newPolicy, deductible: Number(e.target.value)})} required className="w-full h-10 px-space-sm rounded bg-surface-container text-on-surface font-code-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              
              <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-outline-variant/20 mt-4">
                <button type="button" onClick={() => setShowPolicyModal(false)} className="px-space-md py-space-xs rounded hover:bg-surface-container text-on-surface font-body-sm cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-space-lg py-space-xs rounded bg-primary text-on-primary font-body-sm font-semibold shadow-[0_0_16px_rgba(78,222,163,0.3)] hover:bg-tertiary cursor-pointer flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Provision Policy</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
`;

code = code.replace(/    <\/div>\n  \);\n\}\s*$/, policyModal + '    </div>\n  );\n}\n');

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
