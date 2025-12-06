import { IAdminPlanService } from "../Interface/IAdminPlanService";
import { ISubscription, ISubscriptionPlan } from "../../../types/plan";
import { IAdminPlanRepository } from "../../../Repositories/planRepositories/interface/IAdminPlanRepositories";
import { MESSAGES } from "../../../constants/messages";
import { subscriptionPlanDTO } from "../../../utils/dto/subscriptionPlanDto";
import { idnEmail } from "zod/v4/core/regexes.cjs";
export class AdminPlanService implements IAdminPlanService {
  constructor(private _adminPlanRepository: IAdminPlanRepository) {}
  async addPlan(
    PlanData: ISubscriptionPlan
  ): Promise<{ success: boolean; message: string }> {
    const existingPlan = await this._adminPlanRepository.findByName(
      PlanData.planName.trim()
    );
    if (existingPlan) {
      return { success: false, message: MESSAGES.PLAN_ALREADY_EXISTS };
    }
    const created = await this._adminPlanRepository.add(PlanData);

    if (!created) {
      return { success: false, message: MESSAGES.PLAN_ADDED_FAILED };
    }

    return { success: true, message: MESSAGES.PLAN_ADDED_SUCCESSFULL };
  }

  async getAllPlan(): Promise<{ success: boolean; data: ISubscriptionPlan[] }> {
    const res = await this._adminPlanRepository.findAll();
    const mappeddata = res.map((ele)=>subscriptionPlanDTO(ele))
    if (mappeddata.length > 0) {
      return { success: true, data: mappeddata };
    } else {
      return { success: true, data: [] };
    }
  }


  async editPlan(id: string, newData: ISubscriptionPlan): Promise<{ success: boolean; message: string; }> {
       const find = await this._adminPlanRepository.find(id)
       if(!find){
        return {success:false,message:MESSAGES.PLAN_NOT_FOUND}
       }
       await this._adminPlanRepository.findAndUpdate(id,newData)
       return {success:true,message:MESSAGES.PLAN_UPDATED_SUCCESS}
  }

  async deletePlan(id: string): Promise<{ success: boolean; message: string; }> {
      const find = await this._adminPlanRepository.find(id)
      if(!find){
        return {success:false,message:MESSAGES.PLAN_DEL_FAILED}
      }
      await this._adminPlanRepository.findByIdDel(id)
      return {success:true,message:MESSAGES.PLAN_DEL_SUCCESS}
  }
}
