import exprees from "express";
import { SuperAdminController } from "../../Controller/authController/superAdmin/implementation/superAdminController";
import { verifyAccessToken } from "../../middleware/jwt";
import { asyncHandler } from "../../middleware/asyncHandler";
import { PlanController } from "../../Controller/SuperAdmin/planController/Implimentation/planController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";
import { UserController } from "../../Controller/userController/implementation/userController";
import { ItemController } from "../../Controller/itemController/implementation/itemController";
import { CategoryController } from "../../Controller/categoryController/implementation/categoryController";
import { SubCategoryController } from "../../Controller/subCategoryController/implementation/subCategoryControlller";

const superAdminController = container.get<SuperAdminController>(
  TYPES.SuperAdminController
);
const superAdminPlanController = container.get<PlanController>(
  TYPES.AdminPlanControler
);

const userController = container.get<UserController>(TYPES.userController);
const itemsController = container.get<ItemController>(TYPES.itemsController);
const categoryController = container.get<CategoryController>(TYPES.categoryController)
const subCategoryController = container.get<SubCategoryController>(TYPES.SubCategoryController)

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

//users
router
  .route("/user")
  .get(verifyAccessToken, asyncHandler(userController.getAllUsers));
router
  .route("/user/:userId/status")
  .patch(verifyAccessToken, asyncHandler(userController.updateUserStatus));

//items
router.route("/items").post(asyncHandler(itemsController.addItems));

router
  .route("/items/:itemId")
  .patch(asyncHandler(itemsController.editItem))
  .delete(asyncHandler(itemsController.deleteItem));

router
  .route("/items/:itemId/status")
  .patch(asyncHandler(itemsController.changeStatus));
router
  .route("/items/:restaurantId")
  .get(asyncHandler(itemsController.getAllItems));

//Block and unblock restaurant
router
  .route("/restaurant/:restaurantId/:status")
  .patch(asyncHandler(superAdminController.changeStatus));



//category
router.route("/category")
     .post(asyncHandler(categoryController.addCategory))

router.route("/category/:restaurantId")
     .get(asyncHandler(categoryController.getAllCategory))

router.route("/category/:restaurantId/:categoryId")
     .patch(asyncHandler(categoryController.editCategory))
     .delete(asyncHandler(categoryController.deleteCategory))


//subcategory

router.route("/subcategory")
    .post(asyncHandler(subCategoryController.addSubCategory))

router.route("/subcategory/:restaurantId")
     .get(asyncHandler(subCategoryController.getAllByRestaurant))

router.route("/subcategory/:categoryId")
    .patch(asyncHandler(subCategoryController.editSubCategory))
    .delete(asyncHandler(subCategoryController.deleteSubCategory))
router.route("/subcategory/:restaurantId/:categoryId")
     .get(asyncHandler(subCategoryController.getAllSubCategories))
export default router;
