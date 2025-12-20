
import { Request ,Response } from "express";
export default interface ISuperAdminController{
   getAllRestaurent(req:Request,res:Response):Promise<Response>
    approveRestaurant(req:Request,res:Response):Promise<Response>;
    rejectRestaurant(req:Request,res:Response):Promise<Response>;
    changeStatus(req:Request,res:Response):Promise<Response>;
}