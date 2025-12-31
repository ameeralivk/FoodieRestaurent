import { apiRequest } from "../api/apiRequest";
import type { ResponseCart } from "../types/cart";

export const AddToCart = (
  userId: string,
  restaurantId: string,
  itemId: string,
  tableId: string,
  quantity: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("POST", "/user/cart", {
    userId,
    restaurantId,
    itemId,
    tableId,
    quantity,
  });
};

export const getCart = (
  userId: string,
  restaurantId: string
): Promise<ResponseCart> => {
  return apiRequest("GET", `/user/cart/${userId}/${restaurantId}`);
};

export const CartUpdate = (
  cartId: string,
  restaurantId: string,
  itemId: string,
  action: "inc" | "dec"
): Promise<{ success: boolean; message: string }> => {
  return apiRequest("PUT", "/user/cart/update-quantity", {
    cartId,
    restaurantId,
    itemId,
    action,
  });
};



export const deleteCart = (
  cartId: string,
  restaurantId: string,
  itemId:string
): Promise<ResponseCart> => {
  return apiRequest("DELETE", `/user/cart/${cartId}/${restaurantId}`,{itemId});
};
