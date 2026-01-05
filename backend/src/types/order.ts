import { Types } from "mongoose";

export interface IOrderItem {
  itemId: Types.ObjectId;
  itemName: string;
  categoryId?: Types.ObjectId;
  price: number;
  quantity: number;

  assignedCookId?: Types.ObjectId | null;

  itemStatus: "PENDING" | "PREPARING" | "READY";

  assignedAt?: Date;
  preparedAt?: Date;
}


export interface IUserOrder {
  restaurantId: Types.ObjectId;
  tableId: string;

  customerName?: string;
  customerPhone?: string;

  items: IOrderItem[];

  subTotal: number;
  totalAmount: number;

  currency: "INR";

  orderStatus: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED";

  assignedByStaffId?: Types.ObjectId;

  servedAt?: Date;
}

export interface IUserOrderDocument extends IUserOrder, Document {
  createdAt: Date;
  updatedAt: Date;
}

