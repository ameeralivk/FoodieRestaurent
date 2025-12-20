import { IItemInterface } from "../../../types/items"
export interface IItemsRepository {
    findByName(name: string,restaurantId: string): Promise<IItemInterface | null>;
    createItem(data: IItemInterface): Promise<IItemInterface>;
    editItem(id:string,data:Partial<IItemInterface>):Promise<IItemInterface|null>;
    deleteItem(id:string):Promise<IItemInterface|null>;
    changeStatus(id:string,isActive:boolean):Promise<IItemInterface|null>
}