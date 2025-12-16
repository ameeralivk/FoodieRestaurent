import { apiRequest } from "../api/apiRequest";
import type { ITable, ITableForm } from "../types/tableTypes";

export const addTable = async (
  tableData: ITableForm
): Promise<{ success: boolean; message: string }> => {
  console.log(tableData, "tad");
  return apiRequest("POST", `/admin/table`, tableData);
};

export const editTable = async (
  tableData: ITableForm,
  tableId: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("PUT", `/admin/table/${tableId}`, tableData);
};

export const getTables = async (
  restaurantId: string,
  currentPage: number,
  limit: number,
  searchTerm: string
): Promise<{
  success: boolean;
  message: string;
  data: ITable[];
  total: number;
  page: number;
  limit: number;
}> => {
  return apiRequest(
    "GET",
    `/admin/table/${restaurantId}?page=${currentPage}&limit=${limit}&search=${searchTerm}`
  );
};

export const changeTableAvailability = async (
  isAvailable: boolean,
  tableId: string
): Promise<{ success: boolean; message: string }> => {
  console.log(isAvailable, "availableity");
  return apiRequest("PATCH", `/admin/table/${tableId}`, {isAvailable});
};

export const deleteTable = async (
  tableId: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("DELETE", `/admin/table/${tableId}`);
};