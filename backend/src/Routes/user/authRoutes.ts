import express from "express";
import { UserAuthRepository } from "../../Repositories/user/auth/implimentation/userRepository";
import { UserAuthService } from "../../services/user/auth/implimentation/userAuthService";
import { UserAuthController } from "../../Controller/user/auth/implimentation/userAuthController";
import { asyncHandler } from "../../middleware/asyncHandler";
const router = express.Router();

const userAuthRepository = new UserAuthRepository();
const userAuthService = new UserAuthService(userAuthRepository);
const userController = new UserAuthController(userAuthService);

router.route("/register").post(asyncHandler(userController.register));
router.route("/login").post(asyncHandler(userController.login));
router.route("/verify-otp").post(asyncHandler(userController.verifyOtp));
router.route("/googleAuth").post(asyncHandler(userController.googleAuth));
router.route("/resent-otp").post(asyncHandler(userController.resendOtp));
router
  .route("/forget-password")
  .post(asyncHandler(userController.forgetPassword))
  .patch(asyncHandler(userController.updatePassword));
export default router;
