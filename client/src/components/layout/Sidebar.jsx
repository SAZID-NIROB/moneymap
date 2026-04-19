import { LayoutDashboard, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [{ label: "Dashboard", icon: LayoutDashboard, to: "/" }];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`glass-card fixed inset-y-4 left-4 z-40 flex w-[280px] flex-col overflow-hidden p-5 transition-transform duration-300 lg:sticky lg:top-4 lg:mx-4 lg:mt-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-[120%]"
        } lg:flex`}
      >
        <div>
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 animate-float items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-white/10">
              <img src="/logo.png" alt="MoneyMap logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-950 dark:text-white">MoneyMap</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Expense Tracker</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-2">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-3xl border border-white/40 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Account</p>
          <p className="mt-3 text-base font-semibold text-slate-950 dark:text-white">{user?.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          <button
            type="button"
            onClick={() => {
              logout();
              onClose?.();
            }}
            className="soft-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
