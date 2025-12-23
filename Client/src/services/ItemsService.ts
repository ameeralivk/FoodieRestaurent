
import { apiRequest } from "../api/apiRequest";
import type { addItemInterface, IItemResponse } from "../types/Items";


export const getAllItems = async (
  restaurantId: string,
  page:number,
  limit:number,
  search:string
):Promise<IItemResponse>=>{
  return apiRequest("GET", `/admin/items/${restaurantId}?search=${search}&page=${page}&limit=${limit}`);
};

export const addItems = async (
  data: FormData
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("POST", `/admin/items`, data);
};

export const deleteItem = async (
 ItemId:string
):Promise<{success:boolean,message:string}>=>{
    return apiRequest("DELETE",`/admin/items/${ItemId}`)
}