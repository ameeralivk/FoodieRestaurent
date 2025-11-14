import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "../types/usert";
import { boolean } from "zod";

const UserSchema: Schema<IUser> = new Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    Name: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    Allergies: {
      type: String,
      default: "",
    },

    DietaryRestriction: {
      type: String,
      default: "",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    profilePitcher: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export type UserDocument = IUser & Document;
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
