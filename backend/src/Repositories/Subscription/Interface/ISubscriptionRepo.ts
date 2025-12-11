import { AddSubscriptionType, ISubscriptiontype } from "../../../types/subscription"
export interface ISubscriptionRepo {
    addSubcription(data:AddSubscriptionType):Promise<ISubscriptiontype>
    findOne(restaurentId:string):Promise<ISubscriptiontype|null>
    findActivePlan(Id:string):Promise<ISubscriptiontype|null>;
}