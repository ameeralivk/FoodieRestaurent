
import { AdminDocument } from "../../../models/admin";
import { IRestaurantRegisterData } from "../../../types/admin";

export interface IAdminAuthRepository {
  register(adminData: {
    restaurantName: String;
    email: String;
    password?: String;
    role: String;
    googleID?: string;
    imageUrl?: string;
  }): Promise<{
    admin: AdminDocument;
  }>;
  findByEmail(email: string): Promise<AdminDocument | null>;
  updatePasswordByEmail(
    email: string,
    password: string
  ): Promise<AdminDocument | null>;
  findById(id: string): Promise<AdminDocument | null>;
  registerRestaurent(
    id: string,
    data: IRestaurantRegisterData
  ): Promise<AdminDocument | null>;
  getAllRestaurant(page:number,limit:number,filter:string): Promise<{data: AdminDocument[]; total: number }>;
  updateById(id: string, updateData: Partial<AdminDocument>): Promise<AdminDocument | null>

}
