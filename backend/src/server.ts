import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./Routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import {connectRedis} from "./config/redisClient";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 your React app URL
    credentials: true, // 👈 allow cookies or auth headers
  })
);
connectRedis()
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin/auth", authRouter);
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server created at ${port}`);
});
