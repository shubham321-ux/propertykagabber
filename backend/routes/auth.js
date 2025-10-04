import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// ⚠️ register should be disabled after first admin is created
router.post("/register", register);
router.post("/login",login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
