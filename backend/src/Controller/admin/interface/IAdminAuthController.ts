import { Response, Request, NextFunction } from "express";
import { IAdmin } from "../../../types/admin";

export default interface IAdminAuthController {
  register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  googleAuth(req: Request, res: Response): Promise<Response>;
  refreshToken(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  updatePassword(req: Request, res: Response): Promise<Response>;
  registerRestaurant(req: Request, res: Response): Promise<Response>;
  getStatus(req: Request, res: Response): Promise<Response>;
  updateDoc(req: Request, res: Response): Promise<Response>;
}
