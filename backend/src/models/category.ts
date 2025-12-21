import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/category";

const category = new Schema<categoryDocument>({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true },
    isDeleted:{ type: Boolean, default:false },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true , default:null },
},{timestamps:true})

export type categoryDocument = ICategory & Document
const Category = mongoose.model<categoryDocument>("Category",category)
export default Category