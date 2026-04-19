import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";

const buildFilters = (query, userId) => {
  const filters = { user: userId };

  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { notes: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.category && query.category !== "All") {
    filters.category = query.category;
  }

  if (query.type && query.type !== "all") {
    filters.type = query.type;
  }

  if (query.startDate || query.endDate) {
    filters.date = {};

    if (query.startDate) {
      filters.date.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      filters.date.$lte = endDate;
    }
  }

  return filters;
};

const buildSummary = (expenses) => {
  const monthlyMap = new Map();
  const categoryMap = new Map();

  let totalIncome = 0;
  let totalExpenses = 0;

  expenses.forEach((expense) => {
    const amount = Number(expense.amount);
    const monthKey = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(expense.date);

    const monthTotals = monthlyMap.get(monthKey) || { income: 0, expense: 0 };
    monthTotals[expense.type] += amount;
    monthlyMap.set(monthKey, monthTotals);

    if (expense.type === "expense") {
      totalExpenses += amount;
      categoryMap.set(expense.category, (categoryMap.get(expense.category) || 0) + amount);
    } else {
      totalIncome += amount;
    }
  });

  const monthlySpending = Array.from(monthlyMap.entries()).map(([month, value]) => ({
    month,
    income: Number(value.income.toFixed(2)),
    expense: Number(value.expense.toFixed(2)),
  }));

  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return {
    totalIncome: Number(totalIncome.toFixed(2)),
    totalExpenses: Number(totalExpenses.toFixed(2)),
    balance: Number((totalIncome - totalExpenses).toFixed(2)),
    monthlySpending,
    categoryBreakdown,
  };
};

const getExpenses = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  const filters = buildFilters(req.query, req.user._id);

  const [expenses, total, analyticsSource, recentTransactions] = await Promise.all([
    Expense.find(filters).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit),
    Expense.countDocuments(filters),
    Expense.find(filters).sort({ date: 1 }),
    Expense.find(filters).sort({ date: -1, createdAt: -1 }).limit(5),
  ]);

  const summary = buildSummary(analyticsSource);

  res.json({
    expenses,
    summary,
    recentTransactions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
      hasNextPage: skip + expenses.length < total,
    },
    filters: {
      search: req.query.search || "",
      category: req.query.category || "All",
      type: req.query.type || "all",
      startDate: req.query.startDate || "",
      endDate: req.query.endDate || "",
    },
  });
});

const exportExpenses = asyncHandler(async (req, res) => {
  const filters = buildFilters(req.query, req.user._id);
  const expenses = await Expense.find(filters).sort({ date: -1, createdAt: -1 });

  res.json({ expenses });
});

const createExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(expense);
});

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  Object.assign(expense, req.body);
  const updatedExpense = await expense.save();

  res.json(updatedExpense);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await expense.deleteOne();

  res.json({ message: "Transaction deleted successfully" });
});

export { getExpenses, exportExpenses, createExpense, updateExpense, deleteExpense };
