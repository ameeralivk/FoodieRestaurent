import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import {connectRedis} from "./config/redisClient";
import userAuthRouter from "./Routes/user/authRoutes";
import superAdminRouter from "./Routes/superAdmin/superAdminRouter"
import path = require("path");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], 
  })
);
app.use(cookieParser());
connectRedis()
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin/auth", authRouter);
app.use("/api/user/auth", userAuthRouter);
app.use("/api/superadmin",superAdminRouter)
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server created at ${port}`);
});
