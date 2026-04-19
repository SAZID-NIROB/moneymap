import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
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
        "Other",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 280,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ user: 1, date: -1, createdAt: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
