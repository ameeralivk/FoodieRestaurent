import { IUserOrderDocument } from "../../../types/order";
import { ICart } from "../../../types/cart";



export interface IOrderRepo{
    addOrder(data:ICart):Promise<IUserOrderDocument>
}