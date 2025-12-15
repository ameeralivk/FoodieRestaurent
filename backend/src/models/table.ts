import mongoose, { Schema ,Document } from "mongoose";
import { ITable } from "../types/table";
const tableSchema = new Schema<ITable>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    tableNo: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    description: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    qrCodeUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type tableDocument = ITable & Document
const  Table =  mongoose.model<ITable>("table",tableSchema)
export default Table

