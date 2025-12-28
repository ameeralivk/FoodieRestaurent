import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { startSubscriptionScheduler } from "./cronjob/subcriptionScheduler";
import { connectRedis } from "./config/redisClient";
import userAuthRouter from "./Routes/user/authRoutes";
import superAdminRouter from "./Routes/superAdmin/superAdminRouter";
import AdminRouter from "./Routes/Admin/adminRouter";
import staffAuthRouter from "./Routes/staff/authRoutes"
import { container } from "./DI/container";
import { PaymentController } from "./Controller/paymentController/Implimentation/paymentController";
import { TYPES } from "./DI/types";
import "reflect-metadata";
import userRouter from "./Routes/user/userRoutes"
const paymentController = container.get<PaymentController>(TYPES.PaymentController)
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(cookieParser());
connectRedis();
connectDB();
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => paymentController.webhook(req, res)
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin/auth", authRouter);
app.use("/api/user/auth", userAuthRouter);
app.use("/api/staff/auth",staffAuthRouter)
app.use("/api/superadmin", superAdminRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/user",userRouter)
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server created at ${port}`);
  startSubscriptionScheduler();
});
