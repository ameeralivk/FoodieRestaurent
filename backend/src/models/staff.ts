import mongoose, { Schema, Document } from "mongoose";
import { IStaff } from "../types/staff";

const staffSchema = new Schema<IStaff>(
  {
    staffName: { type: String, required: true },
    restaurantId:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["staff", "chef"], required: true },
    status: { type: Boolean, required: true,default:true },
    isBlocked: { type: Boolean, required: true , default:true},
  },
  { timestamps: true }
);
export type staffDocument = IStaff & Document;
const Staff = mongoose.model<staffDocument>("staff", staffSchema);
export default Staff;
