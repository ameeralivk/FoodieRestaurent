import express from "express";
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { SubcriptionController } from "../../Controller/Restaurent/subscriptionController/implimentation/subsciptionController";

const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const subcriptionController = container.get<SubcriptionController>(
  TYPES.SubscriptionController
)
const Router = express.Router();

Router.route("/create-payment").post(
  verifyAccessToken,
  asyncHandler(paymentController.createPayment)
);

//subcription
Router.route("/getplan/:restaurantId").get(asyncHandler(subcriptionController.getPlan))



export default Router;
