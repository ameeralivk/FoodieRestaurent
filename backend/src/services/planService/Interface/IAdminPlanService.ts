import { ISubscriptionPlan } from "../../../types/plan";


export interface IAdminPlanService{
     addPlan(PlanData:ISubscriptionPlan):Promise<{success:boolean,message:string}>
     getAllPlan():Promise<{success:boolean,data:ISubscriptionPlan[]}>
     editPlan(id:string,newData:ISubscriptionPlan):Promise<{success:boolean,message:string}>
     deletePlan(id:string):Promise<{success:boolean,message:string}>
}