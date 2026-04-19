const EmptyState = ({ title, description }) => (
  <div className="glass-card flex flex-col items-center justify-center px-6 py-12 text-center">
    <div className="h-16 w-16 rounded-3xl bg-brand-100/70 dark:bg-brand-500/10" />
    <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
      {description}
    </p>
  </div>
);

export default EmptyState;
