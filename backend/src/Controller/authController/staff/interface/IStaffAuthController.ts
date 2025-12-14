import { Request,Response } from "express"
export interface IStaffAuthController{
    login(req:Request,res:Response):Promise<Response>
}