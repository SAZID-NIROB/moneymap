import { Download, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import IncomeExpenseBarChart from "../components/charts/IncomeExpenseBarChart";
import MonthlyChart from "../components/charts/MonthlyChart";
import CategoryChart from "../components/charts/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseFormModal from "../components/expenses/ExpenseFormModal";
import ExpenseTable from "../components/expenses/ExpenseTable";
import Pagination from "../components/expenses/Pagination";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import useDebounce from "../hooks/useDebounce";
import expenseService from "../services/expenseService";

const defaultResponse = {
  expenses: [],
  summary: {
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    monthlySpending: [],
    categoryBreakdown: []
  },
  recentTransactions: [],
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    hasNextPage: false
  }
};

const getApiErrorMessage = (err, fallbackMessage) => {
  const validationMessage = err.response?.data?.errors?.[0]?.message;
  return validationMessage || err.response?.data?.message || fallbackMessage;
};

const DashboardPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    type: "all",
    startDate: "",
    endDate: ""
  });
  const [page, setPage] = useState(1);
  const [data, setData] = useState(defaultResponse);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [error, setError] = useState("");
  const debouncedSearch = useDebounce(filters.search, 350);

  const fetchExpenses = async (targetPage = page) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await expenseService.getExpenses({
        page: targetPage,
        limit: 8,
        ...filters,
        search: debouncedSearch
      });
      setData(response);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to load transactions"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [page, filters.category, filters.type, filters.startDate, filters.endDate, debouncedSearch]);

  const handleFilterChange = (field, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenCreate = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleSubmitExpense = async (payload) => {
    setIsSaving(true);
    setError("");

    try {
      if (selectedExpense) {
        await expenseService.updateExpense(selectedExpense._id, payload);
        await fetchExpenses();
      } else {
        await expenseService.createExpense(payload);
        setPage(1);
        await fetchExpenses(1);
      }
      setIsModalOpen(false);
      setSelectedExpense(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to save transaction"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this transaction?");

    if (!confirmed) {
      return;
    }

    setError("");
    try {
      await expenseService.deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to delete transaction"));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setError("");

    try {
      const response = await expenseService.exportExpenses({
        ...filters,
        search: debouncedSearch,
      });
      expenseService.downloadExpensesExcel(response.expenses);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to export transactions"));
    } finally {
      setIsExporting(false);
    }
  };

  const emptyCharts = useMemo(
    () => ({
      monthlySpending:
        data.summary.monthlySpending.length > 0
          ? data.summary.monthlySpending
          : [{ month: "No Data", income: 0, expense: 0 }],
      categoryBreakdown:
        data.summary.categoryBreakdown.length > 0
          ? data.summary.categoryBreakdown
          : [{ name: "No Data", value: 1 }]
    }),
    [data.summary]
  );

  return (
    <div className="space-y-6">
      <section className="glass-card overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300">
              Smart Overview
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
A simple dashboard for smarter spending           </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Track your money, explore categories, and stay in control—every day
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2" onClick={handleExport} disabled={isExporting}>
              <Download size={18} />
              {isExporting ? "Exporting..." : "Export Excel"}
            </Button>
            <Button className="gap-2" onClick={handleOpenCreate}>
              <Plus size={18} />
              Add transaction
            </Button>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="glass-card flex min-h-[260px] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <SummaryCards summary={data.summary} />

          <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            <MonthlyChart data={emptyCharts.monthlySpending} />
            <IncomeExpenseBarChart data={emptyCharts.monthlySpending} />
            <CategoryChart data={emptyCharts.categoryBreakdown} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-6">
              <ExpenseFilters filters={filters} onChange={handleFilterChange} />
              {data.expenses.length ? (
                <>
                  <ExpenseTable
                    expenses={data.expenses}
                    onEdit={(expense) => {
                      setSelectedExpense(expense);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteExpense}
                  />
                  <Pagination pagination={data.pagination} onPageChange={setPage} />
                </>
              ) : (
                <EmptyState
                  title="No transactions found"
                  description="Add your first income or expense to activate charts, recent activity, and financial summaries."
                />
              )}
            </div>
            <RecentTransactions items={data.recentTransactions} />
          </div>
        </>
      )}

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
        }}
        onSubmit={handleSubmitExpense}
        initialExpense={selectedExpense}
        isSaving={isSaving}
      />
    </div>
  );
};

export default DashboardPage;
