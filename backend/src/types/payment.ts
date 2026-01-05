

export interface IPayment extends Document {
  restaurentId: string;
  planId: string;
  orderId?:string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  createdAt: Date;
}