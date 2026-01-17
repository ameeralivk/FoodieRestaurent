import type { WalletResponse } from "../types/wallet";
import { apiRequest } from "../api/apiRequest";

export const getWallet = async (userId: string): Promise<WalletResponse> => {
  return apiRequest("GET", `/user/wallet?userId=${userId}`);
};
