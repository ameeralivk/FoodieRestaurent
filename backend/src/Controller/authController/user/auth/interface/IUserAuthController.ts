import { Request, Response, NextFunction } from "express";

export interface IUserAuthController {
  register(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  verifyOtp(req: Request, res: Response, next: NextFunction): Promise<Response>;
  googleAuth(req: Request, res: Response): Promise<Response>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<Response>;
  updatePassword(req: Request, res: Response): Promise<Response>;
  forgetPassword(req: Request, res: Response): Promise<Response>;
}
