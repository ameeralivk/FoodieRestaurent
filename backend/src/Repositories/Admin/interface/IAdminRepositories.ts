import { AdminDocument } from "../../../models/admin";
import { IAdmin } from "../../../types/admin";

export interface IAdminAuthRepository {
  register(adminData: {
    restaurantName: String;
    email: String;
    password?: String;
    role:String;
    googleID?:string,
    imageUrl?: string,
  }): Promise<{
    admin:AdminDocument
  }>
   findByEmail(email: string): Promise<AdminDocument | null>;
   updatePasswordByEmail(email: string,password:string): Promise<AdminDocument | null>;
   findById(id: string): Promise<AdminDocument | null>;
}
