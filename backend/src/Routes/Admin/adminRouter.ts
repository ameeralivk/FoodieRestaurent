import express from "express";
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";

const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const Router = express.Router();

Router.route("/create-payment").post(
  verifyAccessToken,
  asyncHandler(paymentController.createPayment)
);



export default Router;
