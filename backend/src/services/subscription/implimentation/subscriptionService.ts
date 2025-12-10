import { injectable, inject } from "inversify";
import { ISubscriptionRepo } from "../../../Repositories/Subscription/Interface/ISubscriptionRepo";
import { ISubcriptionService } from "../interface/ISubscriptionServer";
import { TYPES } from "../../../DI/types";
import mongoose from "mongoose";
import { calculateRenewalDateFrom } from "../../../helpers/subscriptionHelpers/calaculateRenewalDateFrom";
import calculateRenewalDate from "../../../helpers/subscriptionHelpers/createRenavalDate";
import { IAdminPlanRepository } from "../../../Repositories/planRepositories/interface/IAdminPlanRepositories";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";
@injectable()
export class SubcriptionServer implements ISubcriptionService {
  constructor(
    @inject(TYPES.SubcriptionRepo) private _subcriptionRepo: ISubscriptionRepo,
    @inject(TYPES.AdminPlanRepository)
    private _adminPlanRepo: IAdminPlanRepository
  ) {}
  async addSubcription(data: {
    restaurentId: mongoose.Types.ObjectId;
    planId: mongoose.Types.ObjectId;
    planName: string;
    planPrice: number;
    stripeSessionId: string;
    stripePaymentIntentId: string;
  }) {
    const Id = data.planId?.toString();
    const planDetail = await this._adminPlanRepo.find(Id);
    if (!planDetail) {
      return { success: false, message: MESSAGES.SUBCRIPTION_ADDED_FAILED};
    }
    const activeSub = await this._subcriptionRepo.findOne(
      data.restaurentId.toString()
    );
    if (activeSub) {
      const startDate = activeSub.renewalDate;
      const renewalDate = calculateRenewalDateFrom(
        startDate,
        planDetail.duration
      );

      await this._subcriptionRepo.addSubcription({
        ...data,
        startDate,
        renewalDate,
        status: "queued",
      });
      return { success: true, message: MESSAGES.SUBCRIPTION_ADDED_SUCCESS };
    }
    const startDate = new Date();
    const renewalDate = calculateRenewalDate(planDetail.duration);
    await this._subcriptionRepo.addSubcription({
      ...data,
      startDate,
      renewalDate,
      status: "active",
    });

    return { success: true, message: MESSAGES.SUBCRIPTION_ADDED_SUCCESS };
  }
}
