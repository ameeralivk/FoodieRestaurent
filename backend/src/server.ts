import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { connectRedis } from "./config/redisClient";
import userAuthRouter from "./Routes/user/authRoutes";
import superAdminRouter from "./Routes/superAdmin/superAdminRouter";
import AdminRouter from "./Routes/Admin/adminRouter";
import { PaymentController } from "./Controller/paymentController/Implimentation/paymentController";
import path = require("path");
import { PaymentService } from "./services/paymentService/Implimentation/paymentService";
import { PaymentRepository } from "./Repositories/payment/implimentation/implimentation";
const router = express.Router();
const paymentRepository = new PaymentRepository()
const paymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService);
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
app.use("/api/superadmin", superAdminRouter);
app.use("/api/admin", AdminRouter);
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server created at ${port}`);
});
