type Claim = {
  id: string;
  policyNumber: string;
  claimantName: string;
  claimedAmount: number;
  approvedAmount?: number;
  status: string;
  transactionRef?: string;
};

type SettlementTableProps = {
  claims: Claim[];
  onDisburse: (claimId: string) => void;
};

function SettlementTable({ claims, onDisburse }: SettlementTableProps) {
  const approvedClaims = claims.filter((claim) => claim.status === "APPROVED");

  return (
    <div className="w-full">
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">price_check</span>
        Treasury Settlement Console
      </h2>
      
      <div className="overflow-x-auto rounded-lg border border-outline-variant/30 bg-surface-container-lowest">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/30">
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">Claim ID</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">Policy</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider">Claimant</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider text-right">Claimed</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider text-right">Approved</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider text-center">Status</th>
              <th className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant font-semibold tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="font-code-sm text-code-sm text-on-surface divide-y divide-outline-variant/20">
            {approvedClaims.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-space-sm py-space-lg text-center text-on-surface-variant font-body-sm italic">
                  No pending APPROVED claims in the treasury queue.
                </td>
              </tr>
            ) : (
              approvedClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-space-sm py-space-xs text-primary font-semibold">{claim.id}</td>
                  <td className="px-space-sm py-space-xs">{claim.policyNumber}</td>
                  <td className="px-space-sm py-space-xs font-body-sm">{claim.claimantName}</td>
                  <td className="px-space-sm py-space-xs text-right text-on-surface-variant">${claim.claimedAmount.toLocaleString()}</td>
                  <td className="px-space-sm py-space-xs text-right font-semibold">${(claim.approvedAmount ?? claim.claimedAmount).toLocaleString()}</td>
                  <td className="px-space-sm py-space-xs text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold text-[10px] tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-xs text-center">
                    <button onClick={() => onDisburse(claim.id)} className="px-space-sm py-1 rounded bg-primary text-on-primary font-semibold hover:bg-tertiary transition-colors shadow-[0_0_8px_rgba(78,222,163,0.3)] text-[12px] uppercase tracking-wider">
                      Disburse Funds
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SettlementTable;
