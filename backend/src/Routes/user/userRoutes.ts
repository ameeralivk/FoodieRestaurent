import express from "express";
import { AiController } from "../../Controller/aiController/implementation/aiController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { CartController } from "../../Controller/cartController/implimentation/cartController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { authorizeRoles } from "../../middleware/authorizeRole";
import { UserController } from "../../Controller/userController/implementation/userController";
import { updateProfile } from "../../config/multerConfig";
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController";
import { OrderController } from "../../Controller/orderController/implimentation/orderController";
import { UserWalletController } from "../../Controller/userWalletController/implimentation/userWalletController";
const aiController = container.get<AiController>(TYPES.aiController);
const cartController = container.get<CartController>(TYPES.cartController);
const userController = container.get<UserController>(TYPES.userController);
const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const orderController = container.get<OrderController>(TYPES.orderController);
const userWalletController =container.get<UserWalletController>(TYPES.userWalletController)
const Router = express.Router();

Router.route("/ai").post(
  verifyAccessToken,
  asyncHandler(aiController.sendResponse)
);

//cart
Router.route("/cart").post(
  verifyAccessToken,
  asyncHandler(cartController.addToCart)
);
Router.route("/cart/update-quantity").put(
  verifyAccessToken,
  asyncHandler(cartController.updateQuantity)
);
Router.route("/cart/:cartId/:restaurantId").delete(
  verifyAccessToken,
  asyncHandler(cartController.deleteCart)
);
Router.route("/cart/:userId/:restaurantId").get(
  verifyAccessToken,
  asyncHandler(cartController.getCart)
);

//user
Router.route("/profile/verify-email-otp").post(
  asyncHandler(userController.verifyEmailOtp)
);
Router.route("/profile/:userId/image").put(
  updateProfile,
  asyncHandler(userController.updateImage)
);
Router.route("/profile/:userId")
  .get(asyncHandler(userController.getAllUsers))
  .put(asyncHandler(userController.updateProfile))
  .post(asyncHandler(userController.changePassword));

//order
Router.route("/order/payment").post(
  asyncHandler(paymentController.createOrderPayment)
);
Router.route("/orders").get(asyncHandler(orderController.getAllOrders));
Router.route("/orders/:orderId").get(asyncHandler(orderController.getOrder))
Router.route("/orders/:orderId/cancell").post(asyncHandler(orderController.cancelOrder))


//wallet 
Router.route("/wallet").get(asyncHandler(userWalletController.getWallet))
export default Router;
