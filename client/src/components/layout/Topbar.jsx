import { Menu, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="glass-card flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Personal Finance
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
            Welcome back, {user?.name?.split(" ")[0]}
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="soft-ring inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
      >
        {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
      </button>
    </header>
  );
};

export default Topbar;
