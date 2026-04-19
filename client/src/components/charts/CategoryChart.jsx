import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#2da38b", "#3b82f6", "#f59e0b", "#f43f5e", "#8b5cf6", "#14b8a6"];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const CategoryChart = ({ data }) => (
  <div className="glass-card h-[340px] p-5 flex flex-col">
    <div className="mb-3">
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Category Breakdown</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Understand where your spending is concentrated.
      </p>
    </div>
    <div className="flex flex-1 gap-3 min-h-0">
      {/* Chart — fixed size so it never overflows */}
      <div className="flex items-center justify-center shrink-0" style={{ width: 160, height: 160, alignSelf: "center" }}>
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={72}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => currencyFormatter.format(value)} />
        </PieChart>
      </div>
      {/* Legend */}
      <div className="flex flex-col justify-center gap-2 flex-1 min-w-0 overflow-y-auto">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {entry.name}
              </span>
            </div>
            <span className="shrink-0 text-xs font-bold text-slate-500 dark:text-slate-400">
              {currencyFormatter.format(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CategoryChart;