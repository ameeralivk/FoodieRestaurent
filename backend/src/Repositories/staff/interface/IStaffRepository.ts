import { IStaff, RequestEditIStaff, RequestIStaff } from "../../../types/staff";

export interface IStaffRepository {
  isExist(email: string): Promise<IStaff | null>;
  addStaff(
    data: RequestIStaff
  ): Promise<{ success: boolean; data: IStaff | null }>;
  editStaff(
    staffId: string,
    updatedData: RequestEditIStaff
  ): Promise<IStaff | null>;
  deleteStaff(staffId: string): Promise<IStaff | null>;
  changeStatus(staffId: string, status: boolean): Promise<IStaff | null>;
  getAllByRestaurantId(
    restaurantId: string,
    page: number,
    limit: number
  ): Promise<{ data: IStaff[],total:number}>;
}
