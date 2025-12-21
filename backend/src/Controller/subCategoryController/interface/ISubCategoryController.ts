
import { Response,Request } from "express"

export interface ISubCategoryController{
    addSubCategory(req:Request,res:Response):Promise<Response>;
    editSubCategory(req: Request, res: Response): Promise<Response>;
    deleteSubCategory(req:Request,res:Response):Promise<Response>;
    getAllSubCategories(req:Request,res:Response):Promise<Response>
}