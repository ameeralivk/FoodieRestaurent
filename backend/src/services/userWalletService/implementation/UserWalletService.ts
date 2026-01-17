import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { IUserWalletRepository } from "../../../Repositories/userWallet/interface/IImplementation";
import { IUserWalletService } from "../interface/IUserWalletService";
import { IUserWallet} from "../../../types/wallet";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";

@injectable()
export class UserWalletService implements IUserWalletService{
    constructor(@inject(TYPES.userWalletRepository) private _userWalletRepo:IUserWalletRepository){}

   async getWallet(userId: string): Promise<{ success: boolean; data: IUserWallet|[] }> {
         if(!userId){
            throw new AppError(MESSAGES.USER_NOT_FOUND)
         }
         let res = await this._userWalletRepo.getWallet(userId)
         if(res){
            return {success:true,data:res}
         }
         return {success:false,data:[]}
    }
}