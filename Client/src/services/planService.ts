import { apiRequest } from "../api/apiRequest";
import type { SubscriptionPlan } from "../types/SuperAdmin";

export interface CreatePlanResponse {
  success: boolean;
  message: string;
}

export interface ISubscriptionPlan {
  _id: string;
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
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export const createPlan = (
  Data: SubscriptionPlan
): Promise<CreatePlanResponse> => {
  return apiRequest("POST", "/superadmin/plan", Data);
};

export const getAllPlan = async (
  page?: number,
  limit?: number
): Promise<GetAllPlanResponse> => {
  let res = await apiRequest<GetAllPlanResponse>(
    "GET",
    `/superadmin/plan?page=${page}&limit=${limit}`
  );
  return res;
};

export const editPlan = async (
  id: string,
  data: SubscriptionPlan
): Promise<{ success: boolean; message: string }> => {
  let res = await apiRequest<{ success: boolean; message: string }>(
    "PUT",
    `/superadmin/plan/${id}`,
    data
  );
  console.log(res, "response is here ameer ali vk");
  return res;
};

export const deletePlan = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  console.log("hi here");
  let res = await apiRequest<{ success: boolean; message: string }>(
    "DELETE",
    `/superadmin/plan/${id}`
  );
  return res;
};

export const makePayment = async (
  amount: number,
  currency: string
): Promise<{ success: boolean; data: { clientSecret: string } }> => {
  console.log(amount, currency, "ldajfsdlkj");
  const res = await apiRequest<{
    success: boolean;
    data: { clientSecret: string };
  }>("POST", "/create-payment", { amount, currency });

  return res;
};
