import Stripe from "stripe"
export interface IPaymentService{
    paymentCreate(amount:number,restaurentId:string,planId:string):Promise<{success:boolean,message:string,url:string}>
    handleWebhook(event:Stripe.Event):Promise<void>
}