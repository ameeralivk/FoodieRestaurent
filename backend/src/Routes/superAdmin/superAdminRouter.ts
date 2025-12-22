import exprees from "express";
import { SuperAdminController } from "../../Controller/authController/superAdmin/implementation/superAdminController";
import { verifyAccessToken } from "../../middleware/jwt";
import { asyncHandler } from "../../middleware/asyncHandler";
import { PlanController } from "../../Controller/SuperAdmin/planController/Implimentation/planController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { UserController } from "../../Controller/userController/implementation/userController";


const superAdminController = container.get<SuperAdminController>(
  TYPES.SuperAdminController
);
const superAdminPlanController = container.get<PlanController>(
  TYPES.AdminPlanControler
);

const userController = container.get<UserController>(TYPES.userController);


const router = exprees.Router();
router
  .route("/getallrestaurent")
  .get(verifyAccessToken, asyncHandler(superAdminController.getAllRestaurent));

router
  .route("/restaurent/approve/:id")
  .patch(
    verifyAccessToken,
    asyncHandler(superAdminController.approveRestaurant)
  );
router
  .route("/restaurent/reject/:id")
  .patch(
    verifyAccessToken,
    asyncHandler(superAdminController.rejectRestaurant)
  );

router
  .route("/plan")
  .get(verifyAccessToken, asyncHandler(superAdminPlanController.getAllPlan))
  .post(verifyAccessToken, asyncHandler(superAdminPlanController.addPlan));

router
  .route("/plan/:id")
  .put(verifyAccessToken, asyncHandler(superAdminPlanController.editPlan))
  .delete(verifyAccessToken, asyncHandler(superAdminPlanController.delPlan));


//Block and unblock restaurant
router
  .route("/restaurant/:restaurantId/:status")
  .patch(asyncHandler(superAdminController.changeStatus));

//users
router
  .route("/user")
  .get(verifyAccessToken, asyncHandler(userController.getAllUsers));
router
  .route("/user/:userId/status")
  .patch(verifyAccessToken, asyncHandler(userController.updateUserStatus));


export default router;
