type KPICardProps = {
  title: string;
  value: string | number;
  icon?: string;
};

function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>

      <div>
        <p className="kpi-title">{title}</p>
        <h2 className="kpi-value">{value}</h2>
      </div>
    </div>
  );
}

export default KPICard;