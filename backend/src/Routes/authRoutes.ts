import express from "express";
import { AdminAuthRepository } from "../Repositories/Admin/implimentation/adminRepositories";
import { AdminAuthService } from "../services/admin/implementation/adminAuthService";
import { AdminAuthController } from "../Controller/admin/implementation/adminAuthController";
import { asyncHandler } from "../middleware/asyncHandler";
const router = express.Router();

const adminAuthRepository = new AdminAuthRepository();
const adminAuthService = new AdminAuthService(adminAuthRepository);
const authController = new AdminAuthController(adminAuthService);

router.route("/signup").post(asyncHandler(authController.register));
router.route("/verify-otp").post(asyncHandler(authController.verifyOtp))
router.route("/resent-otp").post(asyncHandler(authController.resendOtp))

export default router
