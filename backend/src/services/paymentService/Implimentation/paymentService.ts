import { IPaymentService } from "../Interface/IPaymentService";
import Stripe from "stripe";
import { inject, injectable } from "inversify";
import { IPaymentRepository } from "../../../Repositories/payment/Interface/interface";
import { TYPES } from "../../../DI/types";
import mongoose from "mongoose";
import { ISubcriptionService } from "../../subscription/interface/ISubscriptionServer";
const stripe = new Stripe(process.env.STRIP_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as unknown as Stripe.LatestApiVersion,
});

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @inject(TYPES.PaymentRepository)
    private _paymentRepository: IPaymentRepository,
    @inject(TYPES.SubcriptionService)
    private _subcriptionServer: ISubcriptionService
  ) {}
  async paymentCreate(
    amount: number,
    restaurentId: string,
    planId: string,
    planName:string
  ): Promise<{ success: boolean; message: string; url: string }> {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Subscription Plan" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.FRONTEND_BASE_URL}/admin/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/payment-failed`,

      metadata: {
        restaurentId,
        planId,
        amount,
        planName
      },
    });

    return {
      success: true,
      message: "Checkout session created",
      url: session.url!,
    };
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata ?? {};

      await this._paymentRepository.addPayment(
        session.id,
        "paid",
        metadata.restaurentId || null,
        metadata.planId || null,
        (session.amount_total ?? 0) / 100,
        session.payment_intent as string
      );
      const restaurentObjectId = new mongoose.Types.ObjectId(metadata.restaurentId);
      const planObjectId = new mongoose.Types.ObjectId(metadata.planId);
      await this._subcriptionServer.addSubcription({
        restaurentId: restaurentObjectId,
        planId: planObjectId,
        planName: metadata.planName,
        planPrice: Number(metadata.amount),
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
      });
      return;
    }
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      const session = sessions.data[0];
      if (!session) {
        return;
      }

      const metadata = session.metadata ?? {};

      await this._paymentRepository.addPayment(
        session.id,
        "failed",
        metadata.restaurentId || null,
        metadata.planId || null,
        (paymentIntent.amount ?? 0) / 100,
        paymentIntent.id
      );

      return;
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata ?? {};

      await this._paymentRepository.addPayment(
        session.id,
        "failed",
        metadata.restaurentId || null,
        metadata.planId || null,
        (session.amount_total ?? 0) / 100,
        null
      );

      return;
    }
  }
}
