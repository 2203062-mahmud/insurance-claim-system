const fs = require('fs');

let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

// 1. Remove state
code = code.replace(
  "const [showPolicyModal, setShowPolicyModal] = useState(false);\n  const [newPolicy, setNewPolicy] = useState({ type: 'AUTO', title: '', description: '', coverageLimit: 50000, deductible: 500 });",
  ""
);

// 2. Remove handler
const handleCreatePolicyRegex = /async function handleCreatePolicy.*?catch \(err: any\) \{ alert\(err\.message\); \}\n  \}\n/s;
code = code.replace(handleCreatePolicyRegex, "");

// 3. Remove Button
const buttonRegex = /<button onClick=\{\(\) => setShowPolicyModal\(true\)\}.*?<span className="material-symbols-outlined text-\[18px\]">add<\/span>\s*<span>Custom Policy<\/span>\s*<\/button>/s;
code = code.replace(buttonRegex, "");

// 4. Remove Modal
const modalRegex = /\{showPolicyModal && \(\s*<div className="fixed inset-0 z-50 bg-surface-container-lowest\/80 backdrop-blur-md flex items-center justify-center p-space-md">.*?<\/form>\s*<\/div>\s*<\/div>\s*\)\}/s;
code = code.replace(modalRegex, "");

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
