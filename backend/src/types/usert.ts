import { Document } from "mongoose";
import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId|string; 
  Email: string;
  Name: string;
  password: string;
  phone: string;
  Allergies?: string;
  DietaryRestriction?: string;
  googleID: string;
  imageUrl: string;
  isDeleted:boolean;
  isBlocked:boolean;
  createdAt?:Date;
}