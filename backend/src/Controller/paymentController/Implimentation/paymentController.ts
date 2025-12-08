import HttpStatus from "../../../constants/htttpStatusCode";
import { IPaymentService } from "../../../services/paymentService/Interface/IPaymentService";
import { AppError } from "../../../utils/Error";
import { IPaymentController } from "../Interface/IPaymentController";
import { Request, Response } from "express";
import Stripe from "stripe"
export class PaymentController implements IPaymentController {
  constructor(private _paymentService: IPaymentService) {}

  createPayment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body as any;

      if (!data?.amount || !data.restaurentId || !data.planId) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Missing required fields" });
      }
      console.log(data, "data is ehre");
      const result = await this._paymentService.paymentCreate(
        data.amount,
        data.restaurentId,
        data.planId
      );

      return res.status(200).json({
        success: true,
        data: { url: result.url },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };



   webhook  = async(req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    try {
      const event = Stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      await this._paymentService.handleWebhook(event);

      res.status(200).send("Webhook received");
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }


}
