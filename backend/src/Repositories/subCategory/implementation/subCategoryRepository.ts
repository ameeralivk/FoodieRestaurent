import { subCategoryDocument } from "../../../models/subcategory";
import { BaseRepository } from "../../IBaseRepository";
import { ISubCategoryRepository } from "../interface/ISubCategoryRepository";
import SubCategory from "../../../models/subcategory";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { FilterQuery } from "mongoose";
import { ISubCategory, IZodSubCategory } from "../../../types/subCategory";
export class SubCategoryRepository
  extends BaseRepository<subCategoryDocument>
  implements ISubCategoryRepository
{
  constructor() {
    super(SubCategory);
  }

  async findByName(
    name: string,
    restaurantId: string,
    categoryId: string
  ): Promise<ISubCategory | null> {
    return this.getByFilter({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      categoryId: new mongoose.Types.ObjectId(categoryId),
      isDeleted: { $ne: true },
    });
  }

  async createSubCategory(
    data: IZodSubCategory,
    restaurantId: Types.ObjectId,
    categoryId: Types.ObjectId
  ): Promise<ISubCategory> {
    const filter = {
      ...data,
      restaurantId,
      categoryId,
    };
    return this.create(filter);
  }

  async updateSubCategory(
    id: string,
    data: IZodSubCategory
  ): Promise<ISubCategory | null> {
    return this.findByIdAndUpdate(id, data);
  }

  async softDeleteSubCategory(id: string) {
    return this.findByIdAndDel(id, "isDeleted", true);
  }

  async getAllSubCategories(
    filter: FilterQuery<ISubCategory>,
    page: number,
    limit: number
  ): Promise<{ data: ISubCategory[]; total: number }> {
    return this.getAll(filter, { page, limit });
  }

 async getAllByRestaurant(
  restaurantId: Types.ObjectId,
  search?: string,
  page?: number,
  limit?: number
) {
  const filter: any = {
    restaurantId,
    isDeleted: false,
  };

  if (search && search.trim()) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  return this.getAll(filter, { page, limit });
}


}
