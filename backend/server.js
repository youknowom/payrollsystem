import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

// ✅ Fixed CORS: Allow local + Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local frontend dev
      "https://payroll-management-system-omkar.vercel.app", // for deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.send("server is running!"));

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
