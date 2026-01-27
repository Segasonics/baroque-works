import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import { login, me, signup } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", isAuthenticated, me);

export default router;
