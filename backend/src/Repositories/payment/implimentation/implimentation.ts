import { PaymentDocument } from "../../../models/payment";
import { BaseRepository } from "../../IBaseRepository";
import { IPaymentRepository } from "../Interface/interface";
import PaymentModal from "../../../models/payment";
export class PaymentRepository extends BaseRepository<PaymentDocument> implements IPaymentRepository{
    constructor(){
        super(PaymentModal)
    }

async addPayment(
    sessionId: string,
    status: "pending" | "paid" | "failed",
    restaurentId: string,
    planId: string,
    amount: number,
    paymentIntentId?: string
  ): Promise<PaymentDocument> {
    return this.create({
      stripeSessionId: sessionId,
      status,
      restaurentId,
      planId,
      amount,
      stripePaymentIntentId: paymentIntentId,
    });
  }
}