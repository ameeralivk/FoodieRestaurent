import { apiRequest } from "../api/apiRequest";
import type { GetMenuItemsResponse } from "../types/Items";
import type { GetUsersResponse } from "../types/userTypes";
export const getUsers = async (
  currentPage: number,
  limit: number,
  searchTerm: string
): Promise<{
  success: boolean;
  message: string;
  data: GetUsersResponse[];
  total: number;
  page: number;
  limit: number;
}> => {
  return apiRequest(
    "GET",
    `/superadmin/user?page=${currentPage}&limit=${limit}&search=${searchTerm}`
  );
};

export const changeUserStatus = async (
  userId: string,
  status: boolean
): Promise<{ success: boolean; message: string }> => {
  console.log(userId, status, "amere");
  return apiRequest("PATCH", `/superadmin/user/${userId}/status`, { status });
};

export const getItem = async (id: string): Promise<GetMenuItemsResponse> => {
  return apiRequest("GET", `/admin/items/${id}`);
};

export const sendToAi = async (prompt: string): Promise<{ reply: string }> => {
  console.log(prompt, "prompt");
  return apiRequest("POST", `/user/ai`, { prompt });
};
