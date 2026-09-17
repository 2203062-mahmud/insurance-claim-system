import { useEffect, useState } from "react";
import { getAnalytics, resetSeed, getAllClaims, getAllAuditLogs, disburseClaim } from "../../services/governanceApi";

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
  const [claimsList, setClaimsList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const result = await getAnalytics();
      setData(result);
      const claimsData = await getAllClaims();
      setClaimsList(claimsData);
      const logsData = await getAllAuditLogs();
      setAuditLogs(logsData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = async () => {
    await resetSeed();
    await loadData();
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full pb-space-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-code-xs text-code-xs text-primary font-semibold tracking-wider uppercase">Executive Overview</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Governance & Settlement</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Global operational overview of actuarial risk, claim adjudication status, and corporate treasury disbursements.
          </p>
        </div>
        
        <button onClick={handleReset} className="px-space-md py-space-xs rounded-lg bg-surface-container-high text-on-surface font-body-sm font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-2 border border-outline-variant/30">
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          Reset Global Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-xl">
        <KPICard title="Total Claims" value={data.totalClaims} icon="receipt_long" />
        <KPICard title="Pending Review" value={data.pendingReviewCount} icon="pending_actions" colorClass="text-secondary" />
        <KPICard title="Approved" value={data.approvedCount} icon="check_circle" colorClass="text-primary" />
        <KPICard title="Rejected" value={data.rejectedCount} icon="cancel" colorClass="text-error" />
        <KPICard title="Settled" value={data.settledCount} icon="account_balance_wallet" colorClass="text-[#3b82f6]" />
      </div>

      {/* Financial Overview + Claims by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg mb-space-xl">
        {/* Financial Overview */}
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-lg border border-outline-variant/20">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            Corporate Treasury Overview
          </h2>
          <div className="space-y-space-sm">
            <div className="flex justify-between items-center p-space-sm bg-surface-container rounded-lg">
              <span className="font-code-sm text-code-sm text-on-surface-variant">Gross Claimed Value</span>
              <span className="font-metric-display text-[24px] text-on-surface">${data.totalClaimedValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-space-sm bg-surface-container rounded-lg">
              <span className="font-code-sm text-code-sm text-on-surface-variant">Total Funds Disbursed</span>
              <span className="font-metric-display text-[24px] text-primary">${data.totalDisbursedValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-space-sm bg-surface-container rounded-lg">
              <span className="font-code-sm text-code-sm text-on-surface-variant">Global Turnaround Target</span>
              <span className="font-code-sm text-code-sm text-on-surface">{data.averageTurnaroundHours} Hours</span>
            </div>
          </div>
        </div>

        {/* Claims by Category */}
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-lg border border-outline-variant/20">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">pie_chart</span>
            Actuarial Distribution
          </h2>
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">AUTO PORTFOLIO</span>
              <span className="font-metric-display text-[24px] text-on-surface">{data.claimsByCategory.AUTO}</span>
            </div>
            <div className="p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">HEALTH PORTFOLIO</span>
              <span className="font-metric-display text-[24px] text-on-surface">{data.claimsByCategory.HEALTH}</span>
            </div>
            <div className="p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">HOME PORTFOLIO</span>
              <span className="font-metric-display text-[24px] text-on-surface">{data.claimsByCategory.HOME}</span>
            </div>
            <div className="p-space-sm bg-surface-container rounded-lg flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">LIFE PORTFOLIO</span>
              <span className="font-metric-display text-[24px] text-on-surface">{data.claimsByCategory.LIFE}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Timeline + Settlement Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Settlement Table (Takes up 2/3 space) */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-lg shadow-lg border border-outline-variant/20">
          <SettlementTable claims={claimsList} onDisburse={async (id) => { await disburseClaim(id, "Wire Transfer"); loadData(); }} />
        </div>
        
        {/* Audit Timeline (Takes up 1/3 space) */}
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-lg border border-outline-variant/20 max-h-[600px] overflow-y-auto custom-scrollbar">
          <AuditTimeline logs={auditLogs} />
        </div>
      </div>
    </div>
  );
}

export default GovernanceDashboard;
