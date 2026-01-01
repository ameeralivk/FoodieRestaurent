import express from "express";
import { AiController } from "../../Controller/aiController/implementation/aiController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { CartController } from "../../Controller/cartController/implimentation/cartController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { authorizeRoles } from "../../middleware/authorizeRole";
const aiController = container.get<AiController>(TYPES.aiController);
const cartController = container.get<CartController>(TYPES.cartController);

const Router = express.Router();

Router.route("/ai").post(
  verifyAccessToken,
  asyncHandler(aiController.sendResponse)
);

//cart
Router.route("/cart").post(verifyAccessToken,asyncHandler(cartController.addToCart));
Router.route("/cart/update-quantity").put(
 verifyAccessToken,asyncHandler(cartController.updateQuantity)
);
Router.route("/cart/:cartId/:restaurantId")
     .delete(verifyAccessToken,asyncHandler(cartController.deleteCart))
Router.route("/cart/:userId/:restaurantId")
    .get(verifyAccessToken,asyncHandler(cartController.getCart))

export default Router;
