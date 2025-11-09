import { Response, Request, NextFunction } from "express";

export default interface IAdminAuthController {
  register(req:Request,res:Response,next:NextFunction):Promise<void>;
  verifyOtp(req:Request,res:Response,next:NextFunction):Promise<void>;
  resendOtp(req:Request,res:Response,next:NextFunction):Promise<void>;
}
