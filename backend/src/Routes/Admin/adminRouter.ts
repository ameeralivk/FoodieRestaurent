import express from "express";
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { SubcriptionController } from "../../Controller/Restaurent/subscriptionController/implimentation/subsciptionController";
import { StaffController } from "../../Controller/staffController/implementation/staffController";
import { checkActivePlan } from "../../middleware/planCheckMiddleware";
const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const subcriptionController = container.get<SubcriptionController>(
  TYPES.SubscriptionController
);
const staffController = container.get<StaffController>(TYPES.staffController);
const Router = express.Router();

Router.route("/create-payment").post(
  verifyAccessToken,
  asyncHandler(paymentController.createPayment)
);

//subcription
Router.route("/getplan/:restaurantId").get(
  verifyAccessToken,
  asyncHandler(subcriptionController.getPlan)
);


//staff
Router
  .route("/staff")
  .post(
    verifyAccessToken,
    checkActivePlan,
    asyncHandler(staffController.addStaff)
  );

Router
  .route("/staff/:staffId")
  .put(asyncHandler(staffController.editStaff))
  .delete(asyncHandler(staffController.deleteStaff))
  .patch(asyncHandler(staffController.changeStatus));

Router
  .route("/staff/:restaurantId")
  .get(asyncHandler(staffController.getAllStaff));

export default Router;
