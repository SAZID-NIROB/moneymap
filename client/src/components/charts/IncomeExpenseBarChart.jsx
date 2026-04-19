import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const IncomeExpenseBarChart = ({ data }) => (
  <div className="glass-card h-[340px] p-5">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">Income vs Expense</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {/* A direct month-by-month bar comparison for earned and spent amounts. */}
        </p>
      </div>
      <div className="flex shrink-0 gap-3 text-xs font-semibold">
        <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
          Income
        </span>
        <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          Expense
        </span>
      </div>
    </div>
    <div className="h-[245px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={10} margin={{ top: 12, right: 8, left: -20, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
          <XAxis
            dataKey="month"
            stroke="rgba(100,116,139,0.95)"
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(100,116,139,0.95)"
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip formatter={(value) => currencyFormatter.format(value)} />
        <Bar dataKey="income" fill="#2da38b" radius={[10, 10, 0, 0]} />
        <Bar dataKey="expense" fill="#f43f5e" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default IncomeExpenseBarChart;
