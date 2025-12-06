import { NextFunction, Request,Response } from "express"


export interface IPlanController{
    addPlan(req:Request,res:Response):Promise<Response>
    getAllPlan(req:Request,res:Response):Promise<Response>
    editPlan(req:Request,res:Response):Promise<Response>
    delPlan(req:Request,res:Response):Promise<Response>
}