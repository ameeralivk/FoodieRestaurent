import { injectable, inject } from "inversify";
import { IStaffRepository } from "../../../Repositories/staff/interface/IStaffRepository";
import { IStaffService } from "../interface/IStaffService";
import { TYPES } from "../../../DI/types";
import { IStaff, StaffResponseDTO } from "../../../types/staff";
import {
  EditIStaff,
  RequestEditIStaff,
  RequestIStaff,
} from "../../../types/staff";
import { MESSAGES } from "../../../constants/messages";
import { generateRandomPassword } from "../../../helpers/staff/generateRandonPass";
import { sendStaffAccountEmail } from "../../../helpers/sentOtp";
import { AppError } from "../../../utils/Error";
import { mapStaffToDTO } from "../../../utils/dto/staffDto";
@injectable()
export class StaffService implements IStaffService {
  constructor(
    @inject(TYPES.staffRepository) private _staffRepo: IStaffRepository
  ) {}

  async addStaff(
    data: RequestIStaff
  ): Promise<{ success: boolean; message: string }> {
    const role = data.role.toLowerCase() as "chef" | "staff";
    const existing = await this._staffRepo.isExist(data.email);
    if (existing) {
      throw new Error(MESSAGES.STAFF_ALREADY_EXIST);
    }
    const password = generateRandomPassword();
    await sendStaffAccountEmail(
      data.email,
      data.staffName,
      password,
      "foodieRestaurent"
    );
    const res = await this._staffRepo.addStaff({
      restaurantId: data.restaurantId,
      staffName: data.staffName,
      email: data.email,
      role,
      password,
    });
    if (res.success) {
      return { success: true, message: MESSAGES.STAFF_ADDED_SUCCESS };
    } else {
      return { success: false, message: MESSAGES.STAFF_ADDED_FAILED };
    }
  }
  async editStaff(
    data: EditIStaff
  ): Promise<{ success: boolean; message: string }> {
    const { staffId, ...updateData } = data;
    const updatedStaff = await this._staffRepo.editStaff(staffId, updateData);
    console.log(updatedStaff, "======================");
    if (!updatedStaff) {
      throw new AppError(MESSAGES.STAFF_NOT_FOUND, 404);
    }
    return { success: true, message: MESSAGES.STAFF_UPDATED_SUCCESS };
  }

  async deleteStaff(
    staffId: string
  ): Promise<{ success: boolean; message: string }> {
    const deletedStaff = await this._staffRepo.deleteStaff(staffId);
    if (!deletedStaff) {
      throw new AppError(MESSAGES.STAFF_NOT_FOUND, 404);
    }
    return { success: true, message: MESSAGES.STAFF_DELETED_SUCCESS };
  }

  async changeStaffStatus(
    staffId: string,
    status: boolean
  ): Promise<{ success: boolean; message: string }> {
    const staff = await this._staffRepo.changeStatus(staffId, status);

    if (!staff) {
      throw new AppError(MESSAGES.STAFF_NOT_FOUND, 404);
    }
    return { success: true, message: MESSAGES.STATUS_CHANGED_SUCCESS };
  }

  async getAllStaff(
    restaurantId: string,
    page: number,
    limit: number
  ): Promise<{ data: StaffResponseDTO[]; total: number }> {
    if (!restaurantId) {
      throw new AppError("Restaurant ID is required", 400);
    }
    let res = await this._staffRepo.getAllByRestaurantId(
      restaurantId,
      page,
      limit
    );
    return {
      total: res.total,
      data: res.data.map(mapStaffToDTO),
    };
  }
}
