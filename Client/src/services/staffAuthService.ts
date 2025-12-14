import { apiRequest } from "../api/apiRequest";
import type{ Staff } from "../types/staffTypes";




export const staffLogin = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string , data:Staff }> => {
  return apiRequest("POST", `/staff/auth/login`, { email, password });
};
