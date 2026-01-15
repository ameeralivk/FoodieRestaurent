import { IUserWallet } from "../../../types/wallet";
import { BaseRepository } from "../../IBaseRepository";
import { UserWallet } from "../../../models/userWallet";
import { IUserWalletRepository } from "../interface/IImplementation";

export class UserWalletRepository
  extends BaseRepository<IUserWallet>
  implements IUserWalletRepository
{
  constructor() {
    super(UserWallet);
  }

   async creditWallet(
    userId: string,
    amount: number,
    description: string,
    method: string
  ): Promise<IUserWallet | null> {
    return this.findOneAndUpdateUpsert(
      { userId },
      {
        $push: {
          transaction: {
            amount,
            description,
            method,
            type: "credit",
            createdAt: new Date(),
          },
        },
        $inc: {
          balance: amount,
        },
      }
    );
  }
}
