import { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

const initialState = {
  title: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
  notes: ""
};

const categories = [
  "Food",
  "Travel",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Education",
  "Salary",
  "Freelance",
  "Investments",
  "Other"
];

const ExpenseFormModal = ({ isOpen, onClose, onSubmit, initialExpense, isSaving }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialExpense) {
      setForm({
        title: initialExpense.title,
        amount: String(initialExpense.amount),
        category: initialExpense.category,
        type: initialExpense.type,
        date: new Date(initialExpense.date).toISOString().split("T")[0],
        notes: initialExpense.notes || ""
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [initialExpense, isOpen]);

  const modalTitle = useMemo(
    () => (initialExpense ? "Edit transaction" : "Add transaction"),
    [initialExpense]
  );

  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required";
    }
    if (!form.amount || Number(form.amount) <= 0) {
      nextErrors.amount = "Amount must be greater than zero";
    }
    if (!form.date) {
      nextErrors.date = "Date is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      ...form,
      amount: Number(form.amount)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{modalTitle}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep your income and expenses organized with precise records.
            </p>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            error={errors.title}
          />
          <Input
            label="Amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
            error={errors.amount}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            label="Type"
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            error={errors.date}
          />
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Notes
            </span>
            <textarea
              rows="4"
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              className="soft-ring w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Add a short note"
            />
          </label>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : initialExpense ? "Update transaction" : "Create transaction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
