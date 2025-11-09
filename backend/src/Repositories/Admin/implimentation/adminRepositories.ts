import Admin,{ AdminDocument  } from "../../../models/admin";
import { BaseRepository } from "../../IBaseRepository";
import { IAdminAuthRepository } from "../interface/IAdminRepositories";
import redisClient from "../../../config/redisClient";
export class AdminAuthRepository
  extends BaseRepository<AdminDocument>
  implements IAdminAuthRepository
{
  constructor() {
    super(Admin);
  }
  async register(adminData: {
    role:string,
    restaurantName: string;
    email: string;
    password: string;
  }): Promise<{ admin: AdminDocument }> {
    const redisDataKey = `adminData:${adminData.email}`
     const cachedData = await redisClient.get(redisDataKey);

        const data = JSON.parse(cachedData?cachedData:"")
        console.log(data,'fdsfjdlskajf')

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
