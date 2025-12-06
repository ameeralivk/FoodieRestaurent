import { SubscriptionDocument } from "../../../models/plan";
import { BaseRepository } from "../../IBaseRepository"
import SubscriptionPlan from "../../../models/plan";
import { IAdminPlanRepository } from "../interface/IAdminPlanRepositories";
import { ISubscriptionPlan ,ISubscription } from "../../../types/plan";
import { UpdateQuery } from "mongoose";
import { AppError } from "../../../utils/Error";
export class AdminPlanRepository extends BaseRepository<SubscriptionDocument> implements IAdminPlanRepository{
    constructor(){
        super(SubscriptionPlan)
    }
    async add(data: ISubscriptionPlan): Promise<ISubscription | null> {
    try {
      return await this.create(data);
    } catch (error) {
      console.error("Error creating subscription plan:", error);
      return null;
    }
  }

  async findByName(name: string): Promise<ISubscription | null> {
    try {
      return await this.getByFilter({ planName: name });
    } catch (error) {
      console.error("Error checking plan by name:", error);
      return null;
    }
  }

  async findAll(): Promise<ISubscription[]> {
    try {
      const result = await this.getAll();
      return result.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      return [];
    }
  }
  async find(id: string): Promise<ISubscription|null> {
    try {
       const result = await this.getById(id)
       return result
    } catch (error:any) {
      throw new AppError(error.message)
    }

  }
  async findAndUpdate(id: string, update: UpdateQuery<SubscriptionDocument>): Promise<ISubscription|null> {
     try {
        const result = await this.findByIdAndUpdate(id,update)
        return result
     } catch (error:any) {
       throw new AppError(error.message)
     }
  }

  async findByIdDel(id: string): Promise<ISubscription|null> {
    try {
      const result = await this.findByIdAndDel(id)
      return result
    } catch (error:any) {
       throw new AppError(error.message)
    }
  }
}