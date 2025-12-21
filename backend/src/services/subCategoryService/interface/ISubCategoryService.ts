
import { ISubCategory,ISubCategoryDTO, IZodSubCategory} from "../../../types/subCategory"

export interface ISubCategoryService{
    addSubCategory(data:IZodSubCategory,restaurantId:string,categoryId:string):Promise<ISubCategory>;
    editSubCategory(id: string, data:IZodSubCategory):Promise<ISubCategory>;
    deleteSubCategory(categoryId: string):Promise<ISubCategory>;
    getAllSubCategories(restaurantId: string,categoryId: string,search: string | undefined,page: number,limit: number):Promise<{ success: boolean; data: ISubCategory[]; total: number }>
    getAllByRestaurant(restaurantId: string,search: string,page: number,limit: number):Promise<{data:ISubCategoryDTO[],total:number,page:number,limit:number}>
}