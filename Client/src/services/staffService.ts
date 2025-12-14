import { apiRequest } from "../api/apiRequest";
import type {
  AddStaffResponse,
  IStaffAdd,
  StaffListResponse,
} from "../types/staffTypes";

export const addStaff = async (
  staffData: IStaffAdd
): Promise<AddStaffResponse> => {
  return apiRequest("POST", `/admin/staff`, staffData);
};

// export const getAllStaff = async(restaurantId:string,page?:number,limit?:number):Promise<StaffListResponse>=>{
// return apiRequest("GET",`/admin/staff/${restaurantId}?page=${page}&limit=${limit}`)
// }
export const getAllStaff = async (
  restaurantId: string,
  page?: number,
  limit?: number,
  searchQuery?: string
): Promise<StaffListResponse> => {
  let url = `/admin/staff/${restaurantId}?page=${page}&limit=${limit}`;
  if (searchQuery) {
    url += `&search=${encodeURIComponent(searchQuery)}`;
  }
  return apiRequest("GET", url);
};

export const deleteStaff = async (
  staffId: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("DELETE", `/admin/staff/${staffId}`);
};

export const editStaff = async (
  staffId: string,
  updatedData: IStaffAdd
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("PUT", `/admin/staff/${staffId}`, updatedData);
};

export const changeStaffStatus = async (
  staffId: string,
  status: boolean
): Promise<{ success: boolean; message: string }> => {
  console.log(status, "status");
  return apiRequest("PATCH", `/admin/staff/${staffId}`, { status });
};



