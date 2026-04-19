import StatCard from "../ui/StatCard";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const SummaryCards = ({ summary }) => (
  <div className="grid gap-4 md:grid-cols-3">
    <StatCard
      label="Total Balance"
      value={currency.format(summary.balance || 0)}
      tone="text-slate-950 dark:text-white"
      helper="Your current net position across all tracked transactions."
    />
    <StatCard
      label="Total Income"
      value={currency.format(summary.totalIncome || 0)}
      tone="text-emerald-600 dark:text-emerald-400"
      helper="All income sources combined for the active result set."
    />
    <StatCard
      label="Total Expenses"
      value={currency.format(summary.totalExpenses || 0)}
      tone="text-rose-500 dark:text-rose-400"
      helper="Everything spent after applying your current filters."
    />
  </div>
);

export default SummaryCards;
