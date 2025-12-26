import { IItemInterface } from "../../../types/items";

export interface IItemsService{
   addItem(data: IItemInterface): Promise<IItemInterface>;
   editItem(id: string,data: Partial<IItemInterface>,images:string[]): Promise<IItemInterface|undefined>;
   deleteItem(id:string):Promise<IItemInterface>;
   changeStatus(id:string,isActive:boolean):Promise<IItemInterface>;
   getAllItemsByRestaurant(restaurantId: string,page: number,limit: number,search?: string): Promise<{ data: IItemInterface[]; total: number }>
}