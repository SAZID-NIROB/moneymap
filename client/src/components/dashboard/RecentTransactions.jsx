const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const RecentTransactions = ({ items }) => (
  <div className="glass-card p-5">
    <div className="mb-5">
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Recent Transactions</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Latest activity across your tracked entries.
      </p>
    </div>
    <div className="space-y-3">
      {items.length ? (
        items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5"
          >
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.category} • {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`text-sm font-bold ${
                item.type === "income"
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-rose-500 dark:text-rose-400"
              }`}
            >
              {item.type === "income" ? "+" : "-"}
              {currency.format(item.amount)}
            </span>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">No transactions yet.</p>
      )}
    </div>
  </div>
);

export default RecentTransactions;
