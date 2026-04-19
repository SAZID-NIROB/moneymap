const styles = {
  primary:
    "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-white/10",
  danger: "bg-rose-500 text-white hover:bg-rose-600"
};

const Button = ({ children, className = "", variant = "primary", ...props }) => (
  <button
    className={`soft-ring inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;