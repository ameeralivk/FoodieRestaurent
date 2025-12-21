import { Types } from "mongoose";

export interface ISubCategory {
  _id:Types.ObjectId;
  name: string;
  description: string;
  status: boolean;
  isDeleted: boolean;
  restaurantId: Types.ObjectId;
  categoryId: Types.ObjectId;
  createdAt:Date
}

export interface IZodSubCategory {
  name: string;
  description: string;
  restaurantId: string;
  categoryId: string;
}


export interface ISubCategoryDTO{
    id:string;
    name:string;
    description:string;
    status:boolean;
    categoryId:string;
    createdAt:Date
}
