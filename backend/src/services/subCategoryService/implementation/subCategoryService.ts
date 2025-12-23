import { injectable, inject } from "inversify";
import { ISubCategoryRepository } from "../../../Repositories/subCategory/interface/ISubCategoryRepository";
import { ISubCategoryService } from "../interface/ISubCategoryService";
import { TYPES } from "../../../DI/types";
import { Types } from "mongoose";
import { AppError } from "../../../utils/Error";
import { ISubCategory, IZodSubCategory } from "../../../types/subCategory";
import { MESSAGES } from "../../../constants/messages";
import HttpStatus from "../../../constants/htttpStatusCode";
import { subCategoryDTO } from "../../../utils/dto/subCategoryDto";
import { ISubCategoryDTO } from "../../../types/subCategory";
@injectable()
export class SubCategoryService implements ISubCategoryService {
  constructor(
    @inject(TYPES.subCategoryRepository)
    private _subCategoryRepo: ISubCategoryRepository
  ) {}

  async addSubCategory(
    data: IZodSubCategory,
    restaurantId: string,
    categoryId: string
  ): Promise<ISubCategory> {
    const exists = await this._subCategoryRepo.findByName(
      data.name,
      restaurantId,
      categoryId
    );

    if (exists) {
      throw new AppError("Subcategory already exists", 409);
    }
    const restaurantObjId = new Types.ObjectId(restaurantId);
    const categoryObjId = new Types.ObjectId(categoryId);
    return this._subCategoryRepo.createSubCategory(
      data,
      restaurantObjId,
      categoryObjId
    );
  }

  async editSubCategory(
    id: string,
    data: IZodSubCategory
  ): Promise<ISubCategory> {
    const updated = await this._subCategoryRepo.updateSubCategory(id, data);
    if (!updated) {
      throw new AppError(MESSAGES.SUBCATEGORY_NOT_FOUND, 404);
    }
    return updated;
  }

  async deleteSubCategory(categoryId: string): Promise<ISubCategory> {
    const deleted = await this._subCategoryRepo.softDeleteSubCategory(
      categoryId
    );
    if (!deleted) {
      throw new AppError(MESSAGES.SUBCATGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deleted;
  }

  async getAllSubCategories(
    restaurantId: string,
    categoryId: string,
    search: string | undefined,
    page: number,
    limit: number
  ): Promise<{ success: boolean; data: ISubCategory[]; total: number }> {
    const filter: any = {
      restaurantId,
      categoryId,
      isDeleted: false,
    };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const allSubcategory = await this._subCategoryRepo.getAllSubCategories(
      filter,
      page,
      limit
    );
    return {
      success: true,
      data: allSubcategory.data,
      total: allSubcategory.total,
    };
  }

  async getAllByRestaurant(
    restaurantId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<{
    data: ISubCategoryDTO[];
    total: number;
    page: number;
    limit: number;
  }> {
    const restaurantObjId = new Types.ObjectId(restaurantId);
    const result = await this._subCategoryRepo.getAllByRestaurant(
      restaurantObjId,
      search,
      page,
      limit
    );
    return {
      data: result.data.map((sub) => subCategoryDTO(sub)),
      total: result.total,
      page,
      limit,
    };
  }
}
