const Input = ({ label, error, className = "", ...props }) => (
  <label className="block">
    {label ? (
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </span>
    ) : null}
    <input
      className={`soft-ring w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 ${className}`}
      {...props}
    />
    {error ? <span className="mt-2 block text-sm text-rose-500">{error}</span> : null}
  </label>
);

export default Input;
