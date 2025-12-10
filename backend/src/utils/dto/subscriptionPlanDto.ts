
export interface ISubscriptionPlanDTO {
  _id:string;
  planName: string;
  price: number;
  duration: string|number;
  noOfDishes: number;
  noOfStaff: number;
  features: string[];
}


export function subscriptionPlanDTO(plan:ISubscriptionPlanDTO): ISubscriptionPlanDTO{
  return {
    _id:plan._id,
    planName: plan.planName,
    price: plan.price,
    duration: plan.duration,
    noOfDishes: plan.noOfDishes,
    noOfStaff: plan.noOfStaff,
    features: plan.features || [],
  };
}
