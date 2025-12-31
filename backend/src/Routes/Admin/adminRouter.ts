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
import { ItemController } from "../../Controller/itemController/implementation/itemController";
import { CategoryController } from "../../Controller/categoryController/implementation/categoryController";
import { SubCategoryController } from "../../Controller/subCategoryController/implementation/subCategoryControlller";
import { uploadItemImages } from "../../config/multerConfig";
import { updateItemImagesUpload } from "../../config/multerConfig";
const paymentController = container.get<PaymentController>(
  TYPES.PaymentController
);
const subcriptionController = container.get<SubcriptionController>(
  TYPES.SubscriptionController
);
const tableController = container.get<TableController>(TYPES.tableController)
const staffController = container.get<StaffController>(TYPES.staffController);
const itemsController = container.get<ItemController>(TYPES.itemsController);
const categoryController = container.get<CategoryController>(TYPES.categoryController)
const subCategoryController = container.get<SubCategoryController>(TYPES.SubCategoryController)


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
.post(verifyAccessToken,asyncHandler(tableController.addTable))

Router.route("/table/:tableId")
.put(verifyAccessToken,asyncHandler(tableController.editTable))
.delete(verifyAccessToken,asyncHandler(tableController.deleteTable))
.patch(verifyAccessToken,asyncHandler(tableController.updateAvailability))


Router.route("/table/:restaurantId")
.get(verifyAccessToken,asyncHandler(tableController.getAllTables))




//items
Router.route("/items").post(uploadItemImages,asyncHandler(itemsController.addItems));

Router
  .route("/items/:itemId")
  .patch(verifyAccessToken,updateItemImagesUpload,asyncHandler(itemsController.editItem))
  .delete(verifyAccessToken,asyncHandler(itemsController.deleteItem))
  .get(verifyAccessToken,asyncHandler(itemsController.getItem))

Router
  .route("/items/:itemId/status")
  .patch(verifyAccessToken,asyncHandler(itemsController.changeStatus));
Router
  .route("/restaurants/items/:restaurantId")
  .get(verifyAccessToken,asyncHandler(itemsController.getAllItems));






//category
Router.route("/category")
     .post(verifyAccessToken,asyncHandler(categoryController.addCategory))

Router.route("/category/:restaurantId")
     .get(verifyAccessToken,asyncHandler(categoryController.getAllCategory))

Router.route("/category/:restaurantId/:categoryId")
     .patch(verifyAccessToken,asyncHandler(categoryController.editCategory))
     .delete(verifyAccessToken,asyncHandler(categoryController.deleteCategory))


//subcategory

Router.route("/subcategory")
    .post(verifyAccessToken,asyncHandler(subCategoryController.addSubCategory))

Router.route("/subcategory/:restaurantId")
     .get(verifyAccessToken,asyncHandler(subCategoryController.getAllByRestaurant))

Router.route("/subcategory/:categoryId")
    .patch(verifyAccessToken,asyncHandler(subCategoryController.editSubCategory))
    .delete(verifyAccessToken,asyncHandler(subCategoryController.deleteSubCategory))
Router.route("/subcategory/:restaurantId/:categoryId")
     .get(verifyAccessToken,asyncHandler(subCategoryController.getAllSubCategories))


//Ai 


export default Router;
