const fs = require('fs');
let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

code = code.replace(
  "import { getPolicies, getMyClaims, submitClaim } from '../../services/claimantApi';",
  "import { getPolicies, getMyClaims, submitClaim, withdrawClaimApi } from '../../services/claimantApi';"
);

const handleWithdrawCode = `
  async function handleWithdraw(id: string) {
    if (!confirm('Are you sure you want to withdraw this claim?')) return;
    try {
      await withdrawClaimApi(id);
      loadData();
    } catch (err: any) { alert(err.message); }
  }
`;

code = code.replace('async function loadData() {', handleWithdrawCode + '\n  async function loadData() {');

// Add the withdraw button to claims that are 'SUBMITTED'
code = code.replace(
  /<span className=\{\`font-code-xs text-code-xs px-1.5 py-0.5 rounded uppercase \$\{c.status === 'SUBMITTED' \? 'bg-secondary\/10 text-secondary' : 'bg-primary\/10 text-primary'\}\`\}>\{c.status\}<\/span>/,
  `
    <div className="flex items-center gap-2">
      <span className={\`font-code-xs text-code-xs px-1.5 py-0.5 rounded uppercase \${c.status === 'SUBMITTED' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}\`}>{c.status}</span>
      {c.status === 'SUBMITTED' && (
        <button onClick={() => handleWithdraw(c.id)} title="Withdraw Claim" className="text-error hover:text-error/80 transition-colors">
          <span className="material-symbols-outlined text-[16px]">cancel</span>
        </button>
      )}
    </div>
  `
);

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
