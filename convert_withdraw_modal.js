const fs = require('fs');

let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

// 1. Add state for withdrawClaimId
code = code.replace(
  'const [error, setError] = useState<string | null>(null);',
  'const [error, setError] = useState<string | null>(null);\n  const [withdrawClaimId, setWithdrawClaimId] = useState<string | null>(null);'
);

// 2. Modify handleWithdraw
code = code.replace(
  /async function handleWithdraw\(id: string\) \{[\s\S]*?\}/,
  `async function handleWithdraw(id: string) {
    try {
      await withdrawClaimApi(id);
      setWithdrawClaimId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  }`
);

// 3. Update the onClick in the list
code = code.replace(
  /onClick=\{\(\) => handleWithdraw\(c\.id\)\}/,
  `onClick={() => setWithdrawClaimId(c.id)}`
);

// 4. Inject the beautiful modal before the last closing div of the component
const modalHtml = `
      {withdrawClaimId && (
        <div className="fixed inset-0 z-[100] bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="relative w-full max-w-[520px] mx-auto rounded-xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-error-container/30">
            <div className="absolute top-0 right-0 w-44 h-44 bg-error-container/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-error-container/30 flex items-center justify-center text-error shadow-[0_0_16px_rgba(255,180,171,0.25)]">
                  <span className="material-symbols-outlined text-[28px]">warning</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-code-xs text-code-xs text-error uppercase font-bold tracking-wider">Statutory Notice</span>
                  <span className="font-code-xs text-code-xs text-on-surface-variant font-medium">Voluntary Docket Exit</span>
                </div>
              </div>
              <div className="px-space-xs py-space-3xs rounded bg-surface-container-high text-on-surface-variant font-code-xs text-code-xs">
                NON-REVERSIBLE
              </div>
            </div>
            
            <div className="flex flex-col gap-space-3xs">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">Withdraw Claim #{withdrawClaimId}?</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Policyholder: <span className="text-on-surface font-medium">Alice Johnson</span>
              </p>
            </div>
            
            <div className="rounded-lg bg-surface-container p-space-md flex flex-col gap-space-xs">
              <span className="font-label-caps text-label-caps text-error uppercase font-semibold">Immediate Effects of Withdrawal:</span>
              <ul className="flex flex-col gap-space-2xs text-on-surface font-body-sm text-body-sm">
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-error text-[16px] mt-0.5">cancel</span>
                  <span>Claim status will transition permanently to <strong className="text-error font-semibold">WITHDRAWN</strong>.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">remove_done</span>
                  <span className="text-on-surface-variant">The file will be removed from active adjuster queues immediately.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                  <span>Your policy coverage limit will remain 100% untouched and preserved.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-space-2xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="withdrawal-reason">
                Reason for Withdrawal <span className="text-error">*</span>
              </label>
              <div className="relative flex items-center">
                <select className="w-full h-11 bg-surface-container-high rounded-lg px-space-md font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-highest transition-all cursor-pointer" id="withdrawal-reason">
                  <option>Resolved directly with third party</option>
                  <option>Filed by mistake</option>
                  <option>Repair cost below deductible</option>
                  <option>Settled via other insurance</option>
                  <option>Other personal reason</option>
                </select>
                <span className="material-symbols-outlined absolute right-space-md text-on-surface-variant pointer-events-none text-[20px]">
                  unfold_more
                </span>
              </div>
              <span className="font-code-xs text-code-xs text-on-surface-variant">Mandatory actuarial reporting category</span>
            </div>
            
            <div className="p-space-sm rounded bg-surface-container-lowest flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px]">verified_user</span>
              <span className="font-code-xs text-code-xs text-on-surface-variant leading-relaxed">
                By confirming, you certify that no coercive third-party settlement settlement clauses violate your state statutory insurer policy covenants.
              </span>
            </div>
            
            <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-end gap-space-sm">
              <button onClick={() => setWithdrawClaimId(null)} className="w-full sm:w-auto px-space-md py-space-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-body-sm text-body-sm" type="button">
                Keep Claim Active
              </button>
              <button onClick={() => handleWithdraw(withdrawClaimId)} className="w-full sm:w-auto px-space-md py-space-xs rounded-lg bg-error-container text-on-error-container font-headline-sm text-headline-sm font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-space-xs shadow-[0_0_16px_rgba(147,0,10,0.5)]" type="button">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
`;

code = code.replace(/    <\/div>\n  \);\n\}\s*$/, modalHtml + '    </div>\n  );\n}\n');

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
