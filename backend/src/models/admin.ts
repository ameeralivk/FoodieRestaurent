import mongoose, { Schema, Document } from "mongoose";
import { IAdmin } from "../types/admin";
const adminSchema = new Schema<IAdmin>(
  {
    role:{type:String,required:true},
    restaurantName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted:{type:Boolean ,default:false}
  },
  {
    timestamps: true,
  }
);

export type AdminDocument = IAdmin & Document;
const Admin = mongoose.model<AdminDocument>("Admin",adminSchema);
export default Admin
