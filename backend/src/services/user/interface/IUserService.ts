import { IUser } from "../../../types/usert";
import { IMappedUserData, IUserResponseDto } from "../../../utils/dto/userDto";


export interface IUserService{
     getAllUsers(search:string,page:number,limit:number):Promise<{users:IMappedUserData[],total:number,page:number,limit:number,totalPages:number}>;
     updateUserStatus(userId: string, isBlocked: boolean):Promise<IUser>
}