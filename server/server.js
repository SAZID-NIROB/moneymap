import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

await connectDB();

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${port}`);
});
