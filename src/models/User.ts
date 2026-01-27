import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<User>("User", userSchema);
export default User;
