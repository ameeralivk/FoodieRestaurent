import exprees from "express";
import { AdminAuthRepository } from "../../Repositories/Admin/implimentation/adminRepositories";
import { SuperAdminService } from "../../services/superAdmin/implementation/superAdminService";
import { SuperAdminController } from "../../Controller/superAdmin/implementation/superAdminController";
import { verifyAccessToken } from "../../middleware/jwt";
import { AdminPlanRepository } from "../../Repositories/planRepositories/implimentation/adminPlanRepositories";
import { asyncHandler } from "../../middleware/asyncHandler";
import { AdminPlanService } from "../../services/planService/Implimentation/adminPlanService";
import { PlanController } from "../../Controller/planController/Implimentation/planController";
const adminAuthRepository = new AdminAuthRepository();
const superAdminService = new SuperAdminService(adminAuthRepository);
const superAdminController = new SuperAdminController(superAdminService);

const superAdminPlanRepository = new AdminPlanRepository();
const superAdminPlanService = new AdminPlanService(superAdminPlanRepository);
const superAdminPlanController = new PlanController(superAdminPlanService);

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
  .delete(verifyAccessToken,asyncHandler(superAdminPlanController.delPlan));

export default router;
