
import type{ ICart } from "../../../types/cart"
export interface ICartService {
    addToCart(userId: string,itemId: string,restaurantId: string,tableId:string,quantity:string):Promise<ICart|null> 
    updateQuantity( cartId:string,restaurantId:string,itemId:string,action:"inc"|"dec"):Promise<{success:boolean,message:string}>
    getCart(userId: string, restaurantId: string):Promise<ICart|null>
    deleteCart(cartId: string, restaurantId: string,itemId:string):Promise<{success:boolean,message:string}>
}