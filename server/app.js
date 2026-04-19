import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
