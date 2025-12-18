import { Request, Response } from "express";
export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<Response>;
  updateUserStatus(req:Request,res:Response):Promise<Response>
}
