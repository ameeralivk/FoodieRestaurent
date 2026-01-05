import { apiRequest } from "../api/apiRequest";
import type { CartItem } from "../types/cart";

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
