import {
  EditIStaff,
  IStaff,
  RequestEditIStaff,
  RequestIStaff,
  StaffResponseDTO,
} from "../../../types/staff";

export interface IStaffService {
  addStaff(data: RequestIStaff): Promise<{ success: boolean; message: string }>;
  editStaff(data: EditIStaff): Promise<{ success: boolean; message: string }>;
  deleteStaff(staffId: string): Promise<{ success: boolean; message: string }>;
  changeStaffStatus(
    staffId: string,
    status: boolean
  ): Promise<{ success: boolean; message: string }>;
  getAllStaff(
    restaurantId: string,
    page: number,
    limit: number
  ): Promise<{ data: StaffResponseDTO[],total:number }>;
}
