
import { Request,Response } from "express";
export interface ICategoryController{
     addCategory(req:Request,res:Response):Promise<Response>;
     editCategory(req:Request,res:Response):Promise<Response>;
     getAllCategory(req:Request,res:Response):Promise<Response>;
     deleteCategory(req:Request,res:Response):Promise<Response>;
}    