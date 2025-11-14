import { Request,Response } from "express";

export interface IUserAuthController{
    register(req:Request,res:Response):Promise<void>;
}