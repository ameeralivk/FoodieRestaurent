import { Document } from "mongoose";


export interface IUser extends Document {
  Email: string;
  Name: string;
  password: string;
  phone: string;
  Allergies?: string;
  DietaryRestriction?: string;
  profilePitcher?: string;
  isDeleted:boolean;
  isBlocked:boolean;
}