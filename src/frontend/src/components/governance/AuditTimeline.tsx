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
  remarks: string;
};

type AuditTimelineProps = {
  logs: AuditEntry[];
};

function AuditTimeline({ logs }: AuditTimelineProps) {
  return (
    <div className="audit-timeline">
      <h2>Audit Trail</h2>

      {logs.length === 0 ? (
        <p>No audit records found.</p>
      ) : (
        logs.map((log) => (
          <div className="audit-item" key={log.logId}>
            <div className="audit-dot"></div>

            <div className="audit-content">
              <h3>{log.action}</h3>

              <p>
                <strong>{log.actorName}</strong> ({log.actorRole})
              </p>

              <p>
                {log.previousState} → <strong>{log.newState}</strong>
              </p>

              <p>{log.remarks}</p>

              <small>
                {new Date(log.timestamp).toLocaleString()}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AuditTimeline;