export interface PlanDto {
  _id: string;
  planName: string;
  planPrice: number;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  renewalDate: string;
}

// Response type for checkPlan API
export interface CheckPlanResponse {
  success: boolean;
  message: string;
  data?: {
    success: boolean;
    plan: PlanDto;
  };
}


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