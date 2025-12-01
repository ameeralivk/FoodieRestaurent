import { Response, Request, NextFunction } from "express";
import { IAdmin } from "../../../types/admin";

export default interface IAdminAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  googleAuth(req: Request, res: Response): Promise<void>;
  refreshToken(req:Request, res: Response): Promise<void>;
  forgetPassword(req:Request, res: Response): Promise<void>;
  login(req:Request,res:Response): Promise<void>;
  updatePassword(req:Request,res:Response): Promise<void>;
  registerRestaurant(req:Request,res:Response): Promise<void>;
  getStatus(req:Request,res:Response):Promise<void>;
  updateDoc(req:Request,res:Response):Promise<void>;
}
