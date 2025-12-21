import mongoose, { Schema } from "mongoose";
import { ISubCategory } from "../types/subCategory";

const subCategory = new Schema<subCategoryDocument>({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true },
    isDeleted:{ type: Boolean, default:false },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true,default:null },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" ,default:null },
},{timestamps:true})

export type subCategoryDocument = ISubCategory & Document
const SubCategory = mongoose.model<subCategoryDocument>("subCategory",subCategory)
export default SubCategory