import { IPaymentService } from "../Interface/IPaymentService";
import Stripe from "stripe";
import { IPaymentRepository } from "../../../Repositories/payment/Interface/interface";
const stripe = new Stripe(process.env.STRIP_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as unknown as Stripe.LatestApiVersion,
});
export class PaymentService implements IPaymentService {

    constructor(private _paymentRepository:IPaymentRepository){}
  async paymentCreate(
    amount: number,
    restaurentId: string,
    planId: string
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
      },
    });

    return {
      success: true,
      message: "Checkout session created",
      url: session.url!,
    };
  }

//  async handleWebhook(event: Stripe.Event): Promise<void> {
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;
//     const sessionId = session.id;
//     const paymentIntentId = session.payment_intent as string;
//     const restaurentId = session.metadata?.restaurentId!;
//     const planId = session.metadata?.planId!;
//     const amountInRupees = session.amount_total ? session.amount_total / 100 : 0;

//     await this._paymentRepository.addPayment(
//       sessionId,
//       "paid",
//       restaurentId,
//       planId,
//       amountInRupees,
//       paymentIntentId
//     );

//   } else if (event.type === "payment_intent.payment_failed") {
//     const paymentIntent = event.data.object as Stripe.PaymentIntent;
//     const sessionId = paymentIntent.metadata?.sessionId!;
//     const restaurentId = paymentIntent.metadata?.restaurentId!;
//     const planId = paymentIntent.metadata?.planId!;
//     const amountInRupees = paymentIntent.amount ? paymentIntent.amount / 100 : 0;

//     await this._paymentRepository.addPayment(
//       sessionId,
//       "failed",
//       restaurentId,
//       planId,
//       amountInRupees,
//       paymentIntent.id
//     );
//   }
// }



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
      console.log("⚠️ No Checkout Session found for failed payment");
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

  console.log(`Unhandled event type: ${event.type}`);
}



}
