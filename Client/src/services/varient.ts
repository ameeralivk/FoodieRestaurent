import { apiRequest } from "../api/apiRequest";
import type { IGetVariantsResponse, IVarient } from "../types/varient";

export const AddVarient = async (
  name: string,
  varient: IVarient[],
  restaurantId: string,
): Promise<{ success: boolean; message: string }> => {
  console.log(varient, "varine");
  return apiRequest("POST", "/user/varients", {
    name,
    Varients: varient,
    restaurantId,
  });
};

export const getAllVarient = async (
  page: number,
  limit: number,
  search: string,
): Promise<IGetVariantsResponse> => {
  return apiRequest(
    "GET",
    `/user/varients?page=${page}&limit=${limit}&search=${search}`,
  );
};

export const deleteVarient = async (
  varientId: string,
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("DELETE", `/user/varients/${varientId}`);
};

export const editVarient = async(varientId:string,name:string,varient:IVarient[],restaurantId:string):Promise<{success:boolean,message:string}>=>{
    return apiRequest("PUT",`/user/varients/${varientId}`,{name:name,Varients:varient,restaurantId})
}