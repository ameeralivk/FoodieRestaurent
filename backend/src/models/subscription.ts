import mongoose, { Schema , Document} from "mongoose";
import { ISubscriptiontype } from "../types/subscription";
const subscriptionSchema = new Schema<ISubscriptiontype>(
  {
    restaurentId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurent",
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    planName: { type: String, required: true },
    planPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "pending","queued"],
      default: "pending",
    },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    renewalDate: { type: Date },
  },
  { timestamps: true }
);



export type SubscriptionDocument = ISubscriptiontype & Document
const subscription = mongoose.model<SubscriptionDocument>("Subcription",subscriptionSchema)
export default subscription

