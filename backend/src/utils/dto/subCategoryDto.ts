
import { ISubCategory } from "../../types/subCategory";

export const subCategoryDTO = (subCategory: ISubCategory) => {
  return {
    id: subCategory._id.toString(),
    name: subCategory.name,
    description: subCategory.description ?? null,
    status: subCategory.status,
    restaurantId: subCategory.restaurantId?.toString(),
    categoryId: subCategory.categoryId?.toString(),
    categoryName: (subCategory.categoryId as any)?.name ?? null, 
    createdAt: subCategory.createdAt,
  };
};


