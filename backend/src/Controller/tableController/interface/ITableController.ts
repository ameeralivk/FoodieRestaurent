
import { Request,Response } from "express"
export interface ITableController{
     addTable(req:Request,res:Response):Promise<Response>
}