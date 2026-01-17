export type WalletTransactionType = "credit" | "debit";

export interface IWalletTransaction {
  amount: number;
  description: string;
  method: string;
  type: WalletTransactionType;
  createdAt: string; // ISO date string
}

export interface IUserWallet {
  _id: string;
  userId: string;
  balance: number;
  transaction: IWalletTransaction[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: IUserWallet;
}

