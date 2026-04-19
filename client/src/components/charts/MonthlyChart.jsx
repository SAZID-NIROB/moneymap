import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const MonthlyChart = ({ data }) => (
  <div className="glass-card h-[340px] p-5">
    <div className="mb-5">
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Monthly Cash Flow</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {/* Compare incoming cash and outgoing spend over time. */}
      </p>
    </div>
    <div className="h-[245px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 8, left: -20, bottom: 4 }}>
        <defs>
          <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2da38b" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#2da38b" stopOpacity={0.03} />
          </linearGradient>
          <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.38} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="income"
          stroke="#2da38b"
          fill="url(#incomeFill)"
          strokeWidth={3}
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#f43f5e"
          fill="url(#expenseFill)"
          strokeWidth={3}
        />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default MonthlyChart;
