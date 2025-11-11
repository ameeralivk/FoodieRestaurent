import mongoose, { Schema, Document } from "mongoose";
import { IAdmin } from "../types/admin";
import { boolean } from "zod";
const adminSchema = new Schema<IAdmin>(
  {
    role:{type:String,required:true},
    restaurantName: { type: String},
    email: { type: String, required: true },
    password: { type: String },
    isDeleted:{type:Boolean ,default:false},
    googleID: { type: String },
    imageUrl:{type:String},
    isBlocked:{type:Boolean,default:false},
    resetPasswordExpires:{type:Date},
    resetPasswordToken:{type:String},
  },
  {
    timestamps: true,
  }
);

export type AdminDocument = IAdmin & Document;
const Admin = mongoose.model<AdminDocument>("Admin",adminSchema);
export default Admin
