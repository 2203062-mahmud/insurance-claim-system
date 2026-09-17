const fs = require('fs');
const path = require('path');

function extractMain(htmlPath) {
  const content = fs.readFileSync(htmlPath, 'utf-8');
  const match = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!match) {
    // try to get just the sections
    const match2 = content.match(/<section[\s\S]*/i);
    if (match2) return match2[0];
    return content;
  }
  return match[1];
}

function htmlToJsx(html) {
  let jsx = html.replace(/class=/g, 'className=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  jsx = jsx.replace(/<input([^>]+?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<input${p1} />`;
  });
  jsx = jsx.replace(/<img([^>]+?)>/g, (m, p1) => {
    if (p1.endsWith('/')) return m;
    return `<img${p1} />`;
  });
  jsx = jsx.replace(/checked=""/g, 'defaultChecked');
  jsx = jsx.replace(/style="([^"]+)"/g, ''); // strip inline styles or write logic to convert
  jsx = jsx.replace(/onsubmit="[^"]+"/g, '');
  // replace some other common self-closing tags
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr([^>]*?)>/g, '<hr$1 />');
  
  // Custom API wiring placeholders
  return jsx;
}

const hubHtml = extractMain('ui-designs/01_policyholder_intake/01_policy_coverage_protection_hub/policy_coverage_hub.html');

const finalJsx = htmlToJsx(hubHtml);

const reactComponent = `
import React, { useState, useEffect } from 'react';
import { getPolicies, getMyClaims, submitClaim } from '../../services/claimantApi';

export default function ClaimantPortal() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => { loadData(); }, []);
  async function loadData() {
    try {
      setPolicies(await getPolicies());
      setClaims(await getMyClaims());
    } catch (e) {}
  }

  return (
    <div className="space-y-8 animate-fade-in w-full">
      ${finalJsx}
    </div>
  );
}
`;

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', reactComponent);
console.log('Converted and written ClaimantPortal.tsx');
