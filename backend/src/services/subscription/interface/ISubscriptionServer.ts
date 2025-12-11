
import mongoose from "mongoose";
import { ISubscriptiontype, PlanDto } from "../../../types/subscription";
export interface ISubcriptionService {
addSubcription(data: {
  restaurentId: mongoose.Types.ObjectId | undefined;
  planId: mongoose.Types.ObjectId | undefined;
  planName: string|undefined;
  planPrice: number;
  stripeSessionId: string;
  stripePaymentIntentId: string;
}): Promise<{ success: boolean; message: string }>;
getPlan(id: string): Promise<{ success: boolean; plan:PlanDto}>;
}