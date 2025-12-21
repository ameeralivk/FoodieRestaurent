import { Types } from "mongoose";

export interface IItemInterface {
  _id?: Types.ObjectId;
  isActive: boolean;
  name: string;
  price: number;
  restaurantId: Types.ObjectId;
  categoryId:Types.ObjectId;
  stock: number;
  description?: string;
  isDeleted:boolean;
  images: string[];
  subCategory?: Types.ObjectId;
  category: Types.ObjectId;
  isStock: boolean;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}