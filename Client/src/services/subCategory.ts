import { apiRequest } from "../api/apiRequest";
import type { SubCategoryResponse } from "../types/subCategory";


export const getAllSubCategory = async (
  restaurantId: string,
  page:number,
  limit:number,
  search:string
):Promise<SubCategoryResponse>=> {
  return apiRequest("GET", `/admin/subcategory/${restaurantId}?search=${search}&page=${page}&limit=${limit}`);
};

export const addSubCategory = async(
    data:{name:string,description:string,restaurantId?:string,categoryId?:string}
):Promise<{success:boolean,message:string}>=>{
    return apiRequest("POST", `/admin/subcategory`,data);
}

export const deleteSubCategory = async(
 categoryId:string
):Promise<{success:boolean,message:string}>=>{
    return apiRequest("DELETE", `/admin/subcategory/${categoryId}`);
}

export const editSubCategory = async(
 categoryId:string,
 data:{name:string,description:string,restaurantId?:string,categoryId?:string}
):Promise<{success:boolean,message:string}>=>{
    return apiRequest("PATCH", `/admin/subcategory/${categoryId}`,data);
}