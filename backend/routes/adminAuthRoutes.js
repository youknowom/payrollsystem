// routes/adminAuthRoutes.js

import express from "express";
import { loginAdmin } from "../controllers/AdminController.js"; // You'll define this next

const router = express.Router();

// Admin Login
router.post("/login", loginAdmin);

export default router;
