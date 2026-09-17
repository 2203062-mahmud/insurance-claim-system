type AuditEntry = {
  logId: string;
  claimId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  previousState: string;
  newState: string;
  remarks?: string;
  details?: string;
};

type AuditTimelineProps = {
  logs: AuditEntry[];
};

function AuditTimeline({ logs }: AuditTimelineProps) {
  return (
    <div className="w-full">
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">history</span>
        Immutable Audit Trail
      </h2>

      <div className="relative pl-space-md border-l border-outline-variant/30 ml-space-sm space-y-space-md">
        {logs.length === 0 ? (
          <p className="text-on-surface-variant font-body-sm italic py-space-sm">No cryptographic audit records found.</p>
        ) : (
          logs.map((log) => (
            <div className="relative" key={log.logId}>
              {/* Timeline Dot */}
              <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-surface-container-low shadow-[0_0_8px_rgba(204,251,241,0.5)]"></div>

              <div className="bg-surface-container rounded-lg p-space-sm border border-outline-variant/20 hover:border-secondary/40 transition-colors">
                <div className="flex items-center justify-between mb-space-3xs">
                  <h3 className="font-code-sm text-code-sm text-secondary font-bold tracking-wide">{log.action}</h3>
                  <small className="font-code-xs text-code-xs text-on-surface-variant">
                    {new Date(log.timestamp).toLocaleString()}
                  </small>
                </div>

                <div className="flex items-center gap-2 mb-space-2xs">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">person</span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    <span className="font-semibold">{log.actorName}</span> 
                    <span className="text-on-surface-variant ml-1">({log.actorRole})</span>
                  </p>
                </div>

                <div className="bg-surface-container-lowest rounded p-space-2xs font-code-xs text-code-xs flex items-center gap-2 mb-space-3xs border border-outline-variant/10">
                  <span className="text-on-surface-variant line-through opacity-70">{log.previousState}</span>
                  <span className="material-symbols-outlined text-[14px] text-primary">arrow_right_alt</span>
                  <span className="text-primary font-bold">{log.newState}</span>
                </div>

                {(log.remarks || log.details) && (
                  <p className="font-body-xs text-body-xs text-on-surface-variant mt-space-2xs border-l-2 border-outline-variant/30 pl-2">
                    {log.remarks || log.details}
                  </p>
                )}
                
                <div className="mt-space-3xs text-right">
                  <span className="font-code-xs text-code-xs text-outline opacity-50">TX: {log.logId}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AuditTimeline;
