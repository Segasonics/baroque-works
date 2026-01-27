import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as CustomJwtPayload;
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};
