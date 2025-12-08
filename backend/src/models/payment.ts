import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "../types/payment";


const PaymentSchema = new Schema<PaymentDocument>({
  restaurentId: { type: String, required: true },
  planId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "inr" },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  stripeSessionId: { type: String, required: true },
  stripePaymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export type PaymentDocument = IPayment & Document;
const PaymentModel = mongoose.model<PaymentDocument>("Payment", PaymentSchema);
export default PaymentModel;
