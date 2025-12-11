import { Request,Response } from "express"

export interface ISubcriptionController{
    getPlan(req:Request,res:Response):Promise<Response>
}