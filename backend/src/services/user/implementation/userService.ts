import { IUserRepository } from "../../../Repositories/user/interface/IUserRepository";
import { IUserService } from "../interface/IUserService";
import { IUser } from "../../../types/usert";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";
import HttpStatus from "../../../constants/htttpStatusCode";
import { injectable ,inject } from "inversify";
import { TYPES } from "../../../DI/types";
import {IMappedUserData, mapUserDto } from "../../../utils/dto/userDto";
@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.userRepository) private _userRepo: IUserRepository) {}

  async getAllUsers(search:string,page:number,limit:number): Promise<{users:IMappedUserData[],total:number,page:number,limit:number,totalPages:number}> {
    const users = await this._userRepo.getAllUsers(search,page,limit);
    const mappedUser = users.data.map((user)=>mapUserDto(user))
    if (!users || users.data.length === 0) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return {
      users: mappedUser,
      total: users.total,
      page,
      limit,
      totalPages: Math.ceil(users.total / limit),
    };
  }


  async updateUserStatus(
  userId: string,
  isBlocked: boolean
):Promise<IUser> {
  const user = await this._userRepo.updateStatus(userId, isBlocked);
  if (!user) {
    throw new AppError(
      MESSAGES.USER_NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }
  return user
}
}
