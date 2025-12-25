
import { IUser } from "../../../types/usert";
export interface IUserRepository{
      getAllUsers(search: string,page: number,limit: number): Promise<{ data: IUser[]; total: number }>;
      updateStatus(userId: string,isBlocked: boolean):Promise<IUser|null>;
      findById(id:string):Promise<IUser|null>
}