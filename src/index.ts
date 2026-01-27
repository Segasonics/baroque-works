import express from "express";
import dotenv from "dotenv";
import "./config/passport";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import serviceRoute from "./routes/serviceRoute";

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/data", serviceRoute);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
  connectDB();
});
