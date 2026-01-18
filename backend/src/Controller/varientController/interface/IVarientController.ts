import { Request,Response } from "express"
export interface IVarientController {
   addVarient(req:Request,res:Response):Promise<Response>
   editVarient(req:Request,res:Response):Promise<Response>
   deleteVarient(req:Request,res:Response):Promise<Response>
   getAllVarient(req:Request,res:Response):Promise<Response>
}