
import { Types } from "mongoose";
export interface ICategory{
    _id:Types.ObjectId;
    name:string;
    description:string;
    status:boolean;
    isDeleted?:boolean;
    restaurantId:Types.ObjectId;
    createdAt:Date;
}

export interface ICategoryAdd{
    name:string;
    description:string;
    restaurantId?:string;
}


export interface ICategoryDTO{
    id:Types.ObjectId;
    name:string;
    description:string;
    status:boolean;
}