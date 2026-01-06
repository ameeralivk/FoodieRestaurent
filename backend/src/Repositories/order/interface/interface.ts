import { IUserOrderDocument } from "../../../types/order";
import { ICart } from "../../../types/cart";



export interface IOrderRepo{
    addOrder(data:ICart):Promise<IUserOrderDocument>
    getAllOrders(restaurantId:string,userId:string,page:number,limit:number,search:string):Promise<{data:IUserOrderDocument[]|null,total:number}>
}