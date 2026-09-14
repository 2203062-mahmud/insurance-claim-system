import { useEffect, useState } from "react";
import { getAnalytics, resetSeed } from "../../services/governanceApi";

import KPICard from "../../components/governance/KPICard";
import AuditTimeline from "../../components/governance/AuditTimeline";
import SettlementTable from "../../components/governance/SettlementTable";

type Analytics = {
  totalClaims: number;
  pendingReviewCount: number;
  approvedCount: number;
  rejectedCount: number;
  settledCount: number;
  totalClaimedValue: number;
  totalDisbursedValue: number;
  averageTurnaroundHours: number;

  claimsByCategory: {
    AUTO: number;
    HEALTH: number;
    HOME: number;
    LIFE: number;
  };
};

function GovernanceDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  const loadData = async () => {
    const result = await getAnalytics();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = async () => {
    await resetSeed();
    await loadData();
  };

  if (!data) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Insurance Claim Governance Dashboard</h1>

          <p style={{ color: "#666" }}>
            Monitor claims, audits and settlement activities
          </p>
        </div>

        <button onClick={handleReset}>
          Reset Demo Data
        </button>
      </div>

      <hr />

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <KPICard
          title="Total Claims"
          value={data.totalClaims}
        />

        <KPICard
          title="Pending Review"
          value={data.pendingReviewCount}
        />

        <KPICard
          title="Approved"
          value={data.approvedCount}
        />

        <KPICard
          title="Rejected"
          value={data.rejectedCount}
        />

        <KPICard
          title="Settled"
          value={data.settledCount}
        />
      </div>

      {/* Financial Overview + Claims by Category */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {/* Financial Overview */}
        <div style={cardStyle}>
          <h2>Financial Overview</h2>

          <p>
            <b>Total Claimed:</b>{" "}
            ${data.totalClaimedValue.toLocaleString()}
          </p>

          <p>
            <b>Total Disbursed:</b>{" "}
            ${data.totalDisbursedValue.toLocaleString()}
          </p>

          <p>
            <b>Average Turnaround:</b>{" "}
            {data.averageTurnaroundHours} hours
          </p>
        </div>

        {/* Claims by Category */}
        <div style={cardStyle}>
          <h2>Claims by Category</h2>

          <p>AUTO: {data.claimsByCategory.AUTO}</p>
          <p>HEALTH: {data.claimsByCategory.HEALTH}</p>
          <p>HOME: {data.claimsByCategory.HOME}</p>
          <p>LIFE: {data.claimsByCategory.LIFE}</p>
        </div>
      </div>

      {/* Audit Timeline + Settlement Table */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {/* Audit Timeline */}
        <div style={cardStyle}>
          <AuditTimeline logs={[]} />
        </div>

        {/* Settlement Table */}
        <div style={cardStyle}>
          <SettlementTable
            claims={[]}
            onDisburse={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default GovernanceDashboard;

