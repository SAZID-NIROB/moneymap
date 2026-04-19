import { Pencil, Trash2 } from "lucide-react";
import Button from "../ui/Button";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const ExpenseTable = ({ expenses, onEdit, onDelete }) => (
  <div className="glass-card overflow-hidden">
    <div className="border-b border-slate-200/70 px-5 py-4 dark:border-white/10">
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">All Transactions</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-slate-50/70 dark:bg-white/5">
          <tr className="text-sm text-slate-500 dark:text-slate-400">
            <th className="px-5 py-4 font-semibold">Title</th>
            <th className="px-5 py-4 font-semibold">Category</th>
            <th className="px-5 py-4 font-semibold">Date</th>
            <th className="px-5 py-4 font-semibold">Type</th>
            <th className="px-5 py-4 font-semibold">Amount</th>
            <th className="px-5 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense._id}
              className="border-t border-slate-200/60 transition hover:bg-white/55 dark:border-white/5 dark:hover:bg-white/5"
            >
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-950 dark:text-white">{expense.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{expense.notes || "No note"}</p>
              </td>
              <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                {expense.category}
              </td>
              <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                    expense.type === "income"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                  }`}
                >
                  {expense.type}
                </span>
              </td>
              <td className="px-5 py-4 font-semibold text-slate-950 dark:text-white">
                {currency.format(expense.amount)}
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <Button variant="secondary" className="px-3 py-2" onClick={() => onEdit(expense)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="danger" className="px-3 py-2" onClick={() => onDelete(expense._id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ExpenseTable;
