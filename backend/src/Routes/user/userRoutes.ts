import express from "express";
import { AiController } from "../../Controller/aiController/implementation/aiController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { CartController } from "../../Controller/cartController/implimentation/cartController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
const aiController = container.get<AiController>(TYPES.aiController);
const cartController = container.get<CartController>(TYPES.cartController);

const Router = express.Router();

Router.route("/ai").post(
  verifyAccessToken,
  asyncHandler(aiController.sendResponse)
);

//cart
Router.route("/cart").post(asyncHandler(cartController.addToCart));
Router.route("/cart/update-quantity").put(
  asyncHandler(cartController.updateQuantity)
);
Router.route("/cart/:cartId/:restaurantId")
     .delete(asyncHandler(cartController.deleteCart))
Router.route("/cart/:userId/:restaurantId")
    .get(asyncHandler(cartController.getCart))

export default Router;
