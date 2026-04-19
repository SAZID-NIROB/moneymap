import api from "./api";
import * as XLSX from "xlsx";

const expenseService = {
  async getExpenses(params) {
    const { data } = await api.get("/expenses", { params });
    return data;
  },
  async createExpense(payload) {
    const { data } = await api.post("/expenses", payload);
    return data;
  },
  async updateExpense(id, payload) {
    const { data } = await api.put(`/expenses/${id}`, payload);
    return data;
  },
  async deleteExpense(id) {
    const { data } = await api.delete(`/expenses/${id}`);
    return data;
  },
  async exportExpenses(params) {
    const { data } = await api.get("/expenses/export", { params });
    return data;
  },
  downloadExpensesExcel(expenses) {
    const rows = expenses.map((expense) => ({
      Title: expense.title,
      Type: expense.type,
      Category: expense.category,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString("en-IN"),
      Notes: expense.notes || "",
      CreatedAt: new Date(expense.createdAt).toLocaleString("en-IN"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `moneymap-transactions-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
};

export default expenseService;
