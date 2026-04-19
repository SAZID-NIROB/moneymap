import express from "express";
import { body, param } from "express-validator";
import {
  createExpense,
  deleteExpense,
  exportExpenses,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validate.js";

const categoryValues = [
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
];

const expenseValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),
  body("category")
    .isIn(categoryValues)
    .withMessage("Please select a valid category"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("date").isISO8601().withMessage("Please provide a valid date"),
  body("notes")
    .optional()
    .isLength({ max: 280 })
    .withMessage("Notes cannot exceed 280 characters"),
];

const router = express.Router();

router.use(protect);

router.get("/export", exportExpenses);

router
  .route("/")
  .get(getExpenses)
  .post([...expenseValidators, validateRequest], createExpense);

router
  .route("/:id")
  .put(
    [
      param("id").isMongoId().withMessage("Invalid transaction id"),
      ...expenseValidators,
      validateRequest,
    ],
    updateExpense
  )
  .delete(
    [param("id").isMongoId().withMessage("Invalid transaction id"), validateRequest],
    deleteExpense
  );

export default router;
