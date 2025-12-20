import { IItemInterface } from "../../../types/items";

export interface IItemsService{
   addItem(data: IItemInterface): Promise<IItemInterface>;
   editItem(id: string,data: Partial<IItemInterface>): Promise<IItemInterface>;
   deleteItem(id:string):Promise<IItemInterface>;
   changeStatus(id:string,isActive:boolean):Promise<IItemInterface>
}