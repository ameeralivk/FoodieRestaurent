import { Document } from "mongoose";

export type Role = "admin" | "superAdmin";

export interface IAdmin extends Document {
  role:string,
  restaurantName:string,
  email:string,
  password:string,
  isDeleted:boolean,
}
