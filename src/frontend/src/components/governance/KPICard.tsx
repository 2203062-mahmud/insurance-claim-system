type KPICardProps = {
  title: string;
  value: string | number;
  icon?: string;
  colorClass?: string;
};

function KPICard({ title, value, icon, colorClass = "text-on-surface" }: KPICardProps) {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between group hover:bg-surface-container transition-all border border-outline-variant/10">
      <div>
        <span className="font-label-caps text-label-caps text-on-surface-variant block mb-space-3xs uppercase tracking-wider">{title}</span>
        <div className={`font-metric-display text-metric-display tracking-tight ${colorClass}`}>
          {value}
        </div>
      </div>
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
          <span className={`material-symbols-outlined text-[24px] ${colorClass}`}>{icon}</span>
        </div>
      )}
    </div>
  );
}

export default KPICard;
