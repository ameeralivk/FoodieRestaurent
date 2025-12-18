import { apiRequest } from "../api/apiRequest";
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
