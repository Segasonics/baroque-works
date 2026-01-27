import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Error during signup:", error);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(404)
        .json({
          message: "This account uses Google login. Please login with Google",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "10d",
    });
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Eror during login:", error);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.error("Error during me:", error);
  }
};
