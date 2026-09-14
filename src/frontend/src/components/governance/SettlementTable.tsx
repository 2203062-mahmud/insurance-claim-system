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

function SettlementTable({
  claims,
  onDisburse
}: SettlementTableProps) {
  const approvedClaims = claims.filter(
    (claim) => claim.status === "APPROVED"
  );

  return (
    <div className="settlement-table">
      <h2>Treasury Settlement Console</h2>

      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Policy Number</th>
            <th>Claimant</th>
            <th>Claimed</th>
            <th>Approved</th>
            <th>Status</th>
            <th>Transaction</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {approvedClaims.length === 0 ? (
            <tr>
              <td colSpan={8}>No approved claims available.</td>
            </tr>
          ) : (
            approvedClaims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>

                <td>{claim.policyNumber}</td>

                <td>{claim.claimantName}</td>

                <td>
                  ${claim.claimedAmount.toLocaleString()}
                </td>

                <td>
                  $
                  {(
                    claim.approvedAmount ??
                    claim.claimedAmount
                  ).toLocaleString()}
                </td>

                <td>
                  <span className="status-approved">
                    {claim.status}
                  </span>
                </td>

                <td>
                  {claim.transactionRef ?? "-"}
                </td>

                <td>
                  <button
                    onClick={() => onDisburse(claim.id)}
                  >
                    Disburse
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SettlementTable;