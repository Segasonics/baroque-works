import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    try {
      const token = jwt.sign(
        { id: (req as any).user._id },
        process.env.JWT_SECRET!,
      );
      res.redirect(`http://localhost:5173/success?token=${token}`);
    } catch (error) {
      console.error("Google login error", error);
      res.redirect("http://localhost:5173/login?error=Google_login_error");
    }
  },
);

export default router;
