import { ISubscription, ISubscriptionPlan } from "../../../types/plan";

export interface IAdminPlanRepository {
  add(data: ISubscriptionPlan): Promise<ISubscription | null>;
  findByName(name: string): Promise<ISubscription | null>;
  findAll(page?: number,limit?:number): Promise<{data:ISubscription[];total:number}>;
  find(id: string): Promise<ISubscription | null>;
  findAndUpdate(
    id: string,
    newData: ISubscriptionPlan
  ): Promise<ISubscription | null>;
  findByIdDel(id: string): Promise<ISubscription | null>;
}
