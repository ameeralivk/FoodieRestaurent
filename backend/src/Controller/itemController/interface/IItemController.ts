import { Response, Request } from "express"

export interface IItemController{
    addItems(req:Request,res:Response):Promise<Response>;
    editItem(req:Request,res:Response):Promise<Response>;
    deleteItem(req:Request,res:Response):Promise<Response>;
    changeStatus(req:Request,res:Response):Promise<Response>
}