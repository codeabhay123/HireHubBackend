import dotenv from "dotenv";
dotenv.config();   // ✅ Load environment variables

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import companyRoutes from "./routes/company.route.js";

const app = express();

// ✅ Enable CORS (Production + Local + Preview)
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin || // allow Postman / curl / mobile apps (no origin header)
      origin === "http://localhost:5173" || // local dev
      origin === "https://hire-h-ub-frontend-1z3e.vercel.app" || // production frontend
      origin.endsWith(".vercel.app") // allow all Vercel preview deployments
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// ✅ Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ MongoDB + Server
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
