import { Request, Response, NextFunction } from "express";

export interface IUserAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  googleAuth(req: Request, res: Response): Promise<void>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePassword(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<void>;
}
