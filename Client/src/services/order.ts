import { apiRequest } from "../api/apiRequest";
import type { CartItem } from "../types/cart";
import type{ IPaginatedOrdersResponse, IUserOrder } from "../types/order";
export const orderPayment = async (
  amount: number,
  restaurantId: string,
  userId: string,
  items: CartItem[]
): Promise<{ success: boolean; data: { url: string } }> => {
  return apiRequest("POST", `/user/order/payment`, {
    amount,
    restaurantId,
    userId,
    items,
  });
};

export const getAllOrders = async (
  restaurantId: string,
  userId: string,
  page: number,
  limit: number,
  search?: string
): Promise<IPaginatedOrdersResponse> => {
  return apiRequest(
    "GET",
    `/user/orders?restaurentId=${restaurantId}&userId=${userId}&page=${page}&limit=${limit}&search=${search||""}`
  );
};
