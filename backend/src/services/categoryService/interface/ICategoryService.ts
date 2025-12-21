import { ICategoryAdd  , ICategory, ICategoryDTO} from "../../../types/category";

export interface ICategoryService{
     addCategory(data:ICategoryAdd,restaurantId:string): Promise<{ success: boolean; message: string }>;
     editCategory(id: string,categoryId:string, data: Partial<ICategory>):Promise<{success:boolean,message:string}>
     deleteCategory(categoryId: string,restaurantId:string):Promise<{success:boolean,message:string}>
     getAllCategory(restaurantId: string,search?: string,page?: number,limit?: number): Promise<{ success: boolean; data: ICategoryDTO[]; total: number }>;
}