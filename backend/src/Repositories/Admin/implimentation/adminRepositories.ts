import Admin,{ AdminDocument  } from "../../../models/admin";
import { BaseRepository } from "../../IBaseRepository";
import { IAdminAuthRepository } from "../interface/IAdminRepositories";

export class AdminAuthRepository
  extends BaseRepository<AdminDocument>
  implements IAdminAuthRepository
{
  constructor() {
    super(Admin);
  }
  async register(adminData: {
    role:String,
    restaurantName: String;
    email: String;
    password: String;
  }): Promise<{ admin: AdminDocument }> {

     const admin = await this.model.create({
      role:adminData.role,
      restaurantName: adminData.restaurantName,
      email: adminData.email,
      password: adminData.password,
    });
    return { admin };
  }
   async findByEmail(email: string) {
    return await this.getByFilter({ email: email, isDeleted: false })
  }
 
}
