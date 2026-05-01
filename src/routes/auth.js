import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { loginLimiter, registerLimiter } from "../middleware/security.js";

const router = Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", verifyToken, getMe);

export default router;
