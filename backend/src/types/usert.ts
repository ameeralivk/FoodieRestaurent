import { Document } from "mongoose";


export interface IUser extends Document {
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
}