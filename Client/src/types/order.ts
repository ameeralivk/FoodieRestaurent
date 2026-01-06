

export type OrderItemStatus = "PENDING" | "PREPARING" | "READY";

export interface IOrderItem {
  itemId:string;
  itemName: string;
  price: number;
  itemImages:string[];
  quantity: number;
  assignedCookId: string | null;
  itemStatus: OrderItemStatus;
}
export type OrderStatus = "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" |"FAILED";

export interface IUserOrder {
  _id:  string;
  restaurantId: string;
  userId: string;
  tableId: string;

  items: IOrderItem[];

  subTotal: number;
  totalAmount: number;
  currency: "INR";

  orderStatus: OrderStatus;

  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}
export interface IPaginatedOrdersResponse {
  success: boolean;
  data: IUserOrder[];
  total: number;
  page: number;
  limit: number;
}

