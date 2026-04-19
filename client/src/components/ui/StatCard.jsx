const StatCard = ({ label, value, tone, helper }) => (
  <div className="glass-card p-5">
    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{label}</p>
    <p className={`mt-3 text-3xl font-extrabold tracking-tight ${tone}`}>{value}</p>
    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{helper}</p>
  </div>
);

export default StatCard;
