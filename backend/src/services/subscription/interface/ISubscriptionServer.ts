
import mongoose from "mongoose";
export interface ISubcriptionService {
addSubcription(data: {
  restaurentId: mongoose.Types.ObjectId | undefined;
  planId: mongoose.Types.ObjectId | undefined;
  planName: string|undefined;
  planPrice: number;
  stripeSessionId: string;
  stripePaymentIntentId: string;
}): Promise<{ success: boolean; message: string }>;

}