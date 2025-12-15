import { CreateTableInput } from "../../../types/table";


export interface ITableService {
    createTable(data:CreateTableInput):Promise<{success:boolean,message:string}>
}