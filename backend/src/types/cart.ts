import { Types } from "mongoose";

export interface ICartItem {
  itemId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  preparationTime?: number;
}

export interface ICart extends Document {
  _id:Types.ObjectId;
  userId: Types.ObjectId;
  restaurantId: Types.ObjectId; 
  tableId:String;
  items: ICartItem[];
  totalAmount:number;
  isDeleted:boolean;
}