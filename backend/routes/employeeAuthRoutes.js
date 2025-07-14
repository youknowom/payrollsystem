// routes/employeeAuthRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/employeeAuthController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
