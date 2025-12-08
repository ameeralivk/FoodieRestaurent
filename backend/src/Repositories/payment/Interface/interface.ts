
import { IPayment } from "../../../types/payment";
export interface IPaymentRepository{
 addPayment(
    sessionId: string,
    status: "paid" | "failed" | "pending",
    restaurentId: string|null,
    planId: string|null,
    amount: number,
    paymentIntentId?: string|null
  ): Promise<IPayment>;
}