const fs = require('fs');
let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

code = code.replace(
  '<span className="font-code-xs text-code-xs text-on-surface-variant ml-space-3xs">| RUET v4.2</span>\\n            </div>',
  '<span className="font-code-xs text-code-xs text-on-surface-variant ml-space-3xs">| RUET v4.2</span>'
);

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
