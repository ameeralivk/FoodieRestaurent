import mongoose, { Schema, Document } from "mongoose";
import { ISubscription } from "../types/plan";

const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    planName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    duration: { type: Schema.Types.Mixed, required: true },
    noOfDishes: { type: Number, required: true, trim: true },
    noOfStaff: { type: Number, required: true, trim: true },
    features: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type SubscriptionDocument = ISubscription & Document;
const SubscriptionPlan = mongoose.model<SubscriptionDocument>("SubscriptionPlan", SubscriptionSchema);
export default SubscriptionPlan;