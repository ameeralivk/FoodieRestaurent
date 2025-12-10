import exprees from "express";
import { SuperAdminController } from "../../Controller/superAdmin/implementation/superAdminController";
import { verifyAccessToken } from "../../middleware/jwt";
import { asyncHandler } from "../../middleware/asyncHandler";
import { PlanController } from "../../Controller/planController/Implimentation/planController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";

const superAdminController = container.get<SuperAdminController>(
  TYPES.SuperAdminController
);
const superAdminPlanController = container.get<PlanController>(
  TYPES.AdminPlanControler
);

const router = exprees.Router();
router
  .route("/getallrestaurent")
  .get(verifyAccessToken, asyncHandler(superAdminController.getAllRestaurent));

router
  .route("/approve/:id")
  .patch(
    verifyAccessToken,
    asyncHandler(superAdminController.approveRestaurant)
  );
router
  .route("/reject/:id")
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

export default router;
