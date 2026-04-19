const Select = ({ label, error, children, className = "", ...props }) => (
  <label className="block">
    {label ? (
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </span>
    ) : null}
    <select
      className={`soft-ring w-full appearance-none rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-900 transition focus:border-brand-300 dark:border-white/10 dark:bg-slate-800/90 dark:text-white dark:[color-scheme:dark] ${className}`}
      {...props}
    >
      {children}
    </select>
    {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
  </label>
);

export default Select;
