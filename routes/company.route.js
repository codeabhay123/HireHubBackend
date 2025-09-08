import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { 
    getCompany, 
    getCompanyById, 
    registerCompany, 
    updateCompany, 
    deleteCompany   // ✅ import delete
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany); // ✅ new delete route

export default router;
