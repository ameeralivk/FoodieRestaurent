import { apiRequest } from "../api/apiRequest";
import type { CategoryResponse } from "../types/category";

export const getAllCategory = async (
  restaurantId: string,
  page?: number,
  limit?: number,
  search?: string
): Promise<CategoryResponse> => {
  return apiRequest(
    "GET",
    `/admin/category/${restaurantId}?search=${search}&page=${page}&limit=${limit}`
  );
};

export const addCategory = async (
  name: string,
  description: string,
  restuarantId: string | undefined
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("POST", `/admin/category`, {
    name,
    description,
    restaurantId: restuarantId,
  });
};

export const deleteCategory = async (
  restaurantId: string | undefined,
  categoryId: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("DELETE", `/admin/category/${restaurantId}/${categoryId}`);
};

export const editCategory = async (
  restaurantId: string | undefined,
  categoryId: string,
  data: { name: string; description: string }
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(
    "PATCH",
    `/admin/category/${restaurantId}/${categoryId}`,
    data
  );
};
