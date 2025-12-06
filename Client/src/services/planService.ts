import { apiRequest } from "../api/apiRequest";
import type { SubscriptionPlan } from "../types/SuperAdmin";

export interface CreatePlanResponse {
  success: boolean;
  message: string;
}

export interface ISubscriptionPlan {
  planName: string;
  price: number;
  duration: string;
  noOfDishes: number;
  noOfStaff: number;
  features: string[];
}

export interface GetAllPlanResponse {
  success: boolean;
  data: {
    data: ISubscriptionPlan[];
  };
}

export const createPlan = (
  Data: SubscriptionPlan
): Promise<CreatePlanResponse> => {
  return apiRequest("POST", "/superadmin/plan", Data);
};

export const getAllPlan = async (): Promise<GetAllPlanResponse> => {
  let res = await apiRequest<GetAllPlanResponse>(
    "GET",
    "/superadmin/plan"
  );
  return res;
};
