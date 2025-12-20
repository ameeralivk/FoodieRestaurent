import { Schema } from "mongoose"
import { Document } from "mongoose"
import mongoose from "mongoose"
import { IItemInterface } from "../types/items"


const items = new Schema<itemsDocument>({
    isActive: {
      type: Boolean,
      default: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    description: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    isStock: {
      type: Boolean,
      default: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted:{
      type:Boolean,
      default:false,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, 
  }
)

export type itemsDocument = IItemInterface  & Document 
const Items = mongoose.model<itemsDocument>("items",items)
export default Items

