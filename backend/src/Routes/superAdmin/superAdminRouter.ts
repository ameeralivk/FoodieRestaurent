import exprees from "express";
import { AdminAuthRepository } from "../../Repositories/Admin/implimentation/adminRepositories";
import { SuperAdminService } from "../../services/superAdmin/implementation/superAdminService";
import { SuperAdminController } from "../../Controller/superAdmin/implementation/superAdminController";
import { verifyAccessToken } from "../../middleware/jwt";
import { asyncHandler } from "../../middleware/asyncHandler";
const adminAuthRepository = new AdminAuthRepository();
const superAdminService = new SuperAdminService(adminAuthRepository)
const superAdminController = new SuperAdminController(superAdminService)
const router = exprees.Router()
router
  .route("/getallrestaurent")
  .get(verifyAccessToken, asyncHandler(superAdminController.getAllRestaurent));

router.route("/approve/:id").patch(verifyAccessToken,asyncHandler(superAdminController.approveRestaurant))

export default router
