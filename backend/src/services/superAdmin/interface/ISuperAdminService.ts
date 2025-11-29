import { IMappedAdminData } from "../../../utils/dto/adminDto";
import { AdminDocument } from "../../../models/admin";
export default interface ISuperAdminService{
  getAllRestaurants(): Promise<{ success: boolean; data: IMappedAdminData[] }>;
  approveRestaurant(id: string): Promise<AdminDocument | null>;
}