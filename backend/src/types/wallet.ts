import { Types } from "mongoose";

export interface IWalletTransaction {
  amount: number;
  description: string;
  method: string;
  type: "credit" | "debit";
  createdAt: Date;
}

export interface IUserWallet extends Document {
  userId: Types.ObjectId;
  transaction: IWalletTransaction[];
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}