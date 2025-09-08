import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"; 
import { singleUpload } from "../middleware/multer.js";          

const router = express.Router();

// Routes
router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile); // ✅ multer added
router.get("/logout", logout);

export default router;
