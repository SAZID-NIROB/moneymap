import { CalendarDays, ChevronDown } from "lucide-react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const categories = [
  "All", "Food", "Travel", "Bills", "Shopping", "Health",
  "Entertainment", "Education", "Salary", "Freelance", "Investments", "Other"
];

const DateField = ({ label, value, onChange }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
      {label}
    </span>
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-sm transition focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-300/30 dark:border-white/10 dark:bg-slate-800/90">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-slate-400 transition group-focus-within:text-brand-400 dark:text-slate-500 dark:group-focus-within:text-brand-300">
        <CalendarDays size={16} />
      </div>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="w-full min-w-[140px] rounded-2xl bg-transparent py-3 pl-10 pr-3 text-sm font-semibold text-slate-700 outline-none [color-scheme:light] dark:text-white dark:[color-scheme:dark]"
      />
    </div>
  </label>
);

const ExpenseFilters = ({ filters, onChange }) => (
  <div className="glass-card p-5">
    <div className="flex flex-wrap gap-4">
      {/* Row 1: Search, Category, Type */}
      <div className="flex flex-1 flex-wrap gap-4">
        <div className="min-w-[160px] flex-1">
          <Input
            label="Search"
            placeholder="Title or notes"
            value={filters.search}
            onChange={(event) => onChange("search", event.target.value)}
          />
        </div>
        <div className="relative min-w-[140px] flex-1">
          <Select
            label="Category"
            value={filters.category}
            onChange={(event) => onChange("category", event.target.value)}
            className="pr-11"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white"
              >
                {category}
              </option>
            ))}
          </Select>
          <ChevronDown className="pointer-events-none absolute right-4 top-[3.15rem] text-slate-400 dark:text-slate-500" size={16} />
        </div>
        <div className="relative min-w-[120px] flex-1">
          <Select
            label="Type"
            value={filters.type}
            onChange={(event) => onChange("type", event.target.value)}
            className="pr-11"
          >
            <option value="all" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">All</option>
            <option value="income" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Income</option>
            <option value="expense" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Expense</option>
          </Select>
          <ChevronDown className="pointer-events-none absolute right-4 top-[3.15rem] text-slate-400 dark:text-slate-500" size={16} />
        </div>
      </div>

      {/* Row 2: Date fields — always get enough space */}
      <div className="flex flex-wrap gap-4">
        <div className="min-w-[160px] flex-1">
          <DateField
            label="From"
            value={filters.startDate}
            onChange={(event) => onChange("startDate", event.target.value)}
          />
        </div>
        <div className="min-w-[160px] flex-1">
          <DateField
            label="To"
            value={filters.endDate}
            onChange={(event) => onChange("endDate", event.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ExpenseFilters;