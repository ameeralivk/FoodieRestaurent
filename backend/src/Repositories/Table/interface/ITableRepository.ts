import mongoose from "mongoose";
import { ITable } from "../../../types/table";
export interface ITableRepository{
     findByTableNo( restaurantId: mongoose.Types.ObjectId,tableNo: number):Promise<ITable|null>
     createTable(data: Partial<ITable>):Promise<ITable> 
}