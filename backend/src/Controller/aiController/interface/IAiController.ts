
import { Response,Request } from "express"
export interface IAiController {
    sendResponse(req:Request,res:Response):Promise<Response>
}