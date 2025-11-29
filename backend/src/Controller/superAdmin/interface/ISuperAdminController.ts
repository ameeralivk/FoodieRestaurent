
import { Request ,Response } from "express";
export default interface ISuperAdminController{
   getAllRestaurent(req:Request,res:Response):Promise<void>
    approveRestaurant(req:Request,res:Response):Promise<void>;
}