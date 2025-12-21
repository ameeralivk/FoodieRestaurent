import { ISubCategory, IZodSubCategory } from "../../../types/subCategory"
import { Types } from "mongoose";
import { subCategoryDocument } from "../../../models/subcategory";
import { FilterQuery } from "mongoose";
export interface ISubCategoryRepository{
    findByName(name: string,restaurantId: string,categoryId: string):Promise<ISubCategory|null>;
    createSubCategory(data:IZodSubCategory,restaurantId:Types.ObjectId,categoryId:Types.ObjectId):Promise<ISubCategory>;
    updateSubCategory(id: string, data:IZodSubCategory):Promise<ISubCategory|null>;
    softDeleteSubCategory(categoryId: string):Promise<ISubCategory|null>;
    getAllSubCategories(filter: FilterQuery<subCategoryDocument>,page: number,limit: number):Promise<{ data: ISubCategory[]; total: number }>
    getAllByRestaurant(restaurantId: Types.ObjectId,search?: string,page?: number,limit?: number): Promise<{ data: ISubCategory[]; total: number }>;

  
}