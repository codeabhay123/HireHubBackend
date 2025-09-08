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

// ✅ Enable CORS for frontend (remove trailing /)
app.use(cors({
  origin: "https://hire-h-ub-frontend-a7v7.vercel.app", 
  credentials: true, // allow cookies/authorization headers
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

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
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
