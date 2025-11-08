import { AdminDocument } from "../../../models/admin";
import { IAdmin } from "../../../types/admin";

export interface IAdminAuthRepository {
  register(adminData: {
    restaurantName: String;
    email: String;
    password: String;
    role:String;
  }): Promise<{
    admin:AdminDocument
  }>
   findByEmail(email: string): Promise<AdminDocument | null>;
}
