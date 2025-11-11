import { Document } from "mongoose";

export type Role = "admin" | "superAdmin";

export interface IAdmin extends Document {
  role:string,
  restaurantName:string,
  email:string,
  password:string,
  isDeleted:boolean,
  googleID:string,
  imageUrl:string,
  isBlocked:boolean,
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface adminData extends Document {
    restaurantName: String;
    email: String;
    password: String;
    role:String;
    googleID:string,
    imageUrl:string,
    isBlocked:boolean,
}

