import express from "express";
import { AdminAuthRepository } from "../Repositories/Admin/implimentation/adminRepositories";
import { AdminAuthService } from "../services/admin/implementation/adminAuthService";
import { AdminAuthController } from "../Controller/admin/implementation/adminAuthController";
import { asyncHandler } from "../middleware/asyncHandler";
import { upload } from "../config/multerConfig";
import { verifyAccessToken } from "../middleware/jwt";
const router = express.Router();

const adminAuthRepository = new AdminAuthRepository();
const adminAuthService = new AdminAuthService(adminAuthRepository);
const authController = new AdminAuthController(adminAuthService);

router.route("/signup").post(asyncHandler(authController.register));
router.route("/verify-otp").post(asyncHandler(authController.verifyOtp));
router.route("/resent-otp").post(asyncHandler(authController.resendOtp));
router.route("/googleAuth").post(asyncHandler(authController.googleAuth));
router.route("/refresh-token").get(asyncHandler(authController.refreshToken));
router.route("/login").post(asyncHandler(authController.login));
router
  .route("/forget-password")
  .post(asyncHandler(authController.forgetPassword))
  .patch(asyncHandler(authController.updatePassword));
router.route('/on-boarding').post(verifyAccessToken,upload,asyncHandler(authController.registerRestaurant))
export default router;
