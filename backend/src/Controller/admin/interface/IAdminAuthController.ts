import { Response, Request, NextFunction } from "express";

export default interface IAdminAuthController {
  register(req:Request,res:Response,next:NextFunction):Promise<void>;
}
