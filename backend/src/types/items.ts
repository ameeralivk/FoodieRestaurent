import { Types } from "mongoose";

export interface IItemInterface {
  _id?: Types.ObjectId;
  isActive: boolean;
  existingImages?:string;
  name: string;
  price: number;
  restaurantId: Types.ObjectId;
  categoryId:Types.ObjectId;
  stock: number;
  description?: string;
  isDeleted:boolean;
   preparationTime?: number;
  images: string[];
  subCategoryId?: Types.ObjectId;
  category: Types.ObjectId;
  isStock: boolean;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}