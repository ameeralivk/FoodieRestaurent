import express from "express";
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController";
import { asyncHandler } from "../../middleware/asyncHandler";
import { verifyAccessToken } from "../../middleware/jwt";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { SubcriptionController } from "../../Controller/Restaurent/subscriptionController/implimentation/subsciptionController";
import { StaffController } from "../../Controller/staffController/implementation/staffController";
import { checkActivePlan } from "../../middleware/planCheckMiddleware";
import { TableController } from "../../Controller/tableController/implement/tableController";
const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const subcriptionController = container.get<SubcriptionController>(
  TYPES.SubscriptionController
);
const tableController = container.get<TableController>(TYPES.tableController)


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
Router.route("/staff").post(
  verifyAccessToken,
  checkActivePlan,
  asyncHandler(staffController.addStaff)
);

Router.route("/staff/:staffId")
  .put(verifyAccessToken,asyncHandler(staffController.editStaff))
  .delete(verifyAccessToken,asyncHandler(staffController.deleteStaff))
  .patch(verifyAccessToken,asyncHandler(staffController.changeStatus));

Router.route("/staff/:restaurantId").get(
  verifyAccessToken,asyncHandler(staffController.getAllStaff)
);

//table
Router.route("/table")
.post(asyncHandler(tableController.addTable))

export default Router;
