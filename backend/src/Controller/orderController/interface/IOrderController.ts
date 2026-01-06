
import { Response,Request } from "express"
export interface IOrderController{
    getAllOrders(req:Request,res:Response):Promise<Response>
}