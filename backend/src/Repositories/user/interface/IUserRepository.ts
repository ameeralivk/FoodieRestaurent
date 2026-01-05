
import { IUser } from "../../../types/usert";
export interface IUserRepository{
      getAllUsers(search: string,page: number,limit: number): Promise<{ data: IUser[]; total: number }>;
      updateStatus(userId: string,isBlocked: boolean):Promise<IUser|null>;
      findById(id:string):Promise<IUser|null>
      updateUser(userId:string,data:{name:string,phone:string,email?:string}):Promise<IUser|null>
      updateProfileImage(image:string,userId:string):Promise<IUser|null>
      updatePassword(userId:string,newPassword:string):Promise<IUser|null>
}