import { Request, Response } from "express";
export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<Response>;
  updateUserStatus(req:Request,res:Response):Promise<Response>
  getUser(req:Request,res:Response):Promise<Response>
  updateProfile(req:Request,res:Response):Promise<Response>
  verifyEmailOtp(req:Request,res:Response):Promise<Response>
  updateImage(req:Request,res:Response):Promise<Response>
  changePassword(req:Request,res:Response):Promise<Response>
}
