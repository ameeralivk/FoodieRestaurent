import { IMappedAdminData } from "../../../utils/dto/SuperAdminDto";
import { AdminDocument } from "../../../models/admin";
export default interface ISuperAdminService {
  getAllRestaurants(page:number,limit:number,filter:string): Promise<{ success: boolean; data: IMappedAdminData[]; pagination:{total:number,totalPages:number,page:number,limit:number} }>;
  approveRestaurant(id: string): Promise<AdminDocument | null>;
  rejectRestaurant(id: string, reason: string): Promise<AdminDocument | null>;
}
