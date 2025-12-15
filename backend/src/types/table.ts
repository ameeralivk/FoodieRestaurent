import mongoose from "mongoose";


export interface ITable extends Document {
  restaurantId: mongoose.Types.ObjectId;
  tableNo: number;
  seatingCapacity: number;
  description: string[];
  isAvailable: boolean;
  qrCodeUrl: string;
}


export interface CreateTableInput {
  restaurantId: string;
  tableNo: number;
  seatingCapacity: number;
  description: string[];
}