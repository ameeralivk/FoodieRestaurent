import { IMappedAdminData } from "../../../utils/dto/SuperAdminDto";
import { AdminDocument } from "../../../models/admin";
export default interface ISuperAdminService {
  getAllRestaurants(): Promise<{ success: boolean; data: IMappedAdminData[] }>;
  approveRestaurant(id: string): Promise<AdminDocument | null>;
  rejectRestaurant(id: string, reason: string): Promise<AdminDocument | null>;
}
