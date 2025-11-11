import Admin, { AdminDocument } from "../../../models/admin";
import { BaseRepository } from "../../IBaseRepository";
import { IAdminAuthRepository } from "../interface/IAdminRepositories";
import redisClient from "../../../config/redisClient";
import { IAdmin } from "../../../types/admin";
export class AdminAuthRepository
  extends BaseRepository<AdminDocument>
  implements IAdminAuthRepository
{
  constructor() {
    super(Admin);
  }
  async register(adminData: {
    role: string;
    restaurantName: string;
    email: string;
    password?: string;
    googleID?: string;
    imageUrl?: string;
  }): Promise<{ admin: AdminDocument }> {
    const redisDataKey = `adminData:${adminData.email}`;
    // const cachedData = await redisClient.get(redisDataKey);

    // const data = JSON.parse(cachedData ? cachedData : "");
    try {
      console.log(adminData, "data");
      const admin = await this.model.create({
        role: adminData.role,
        restaurantName: adminData.restaurantName,
        email: adminData.email,
        password: adminData.password ? adminData.password : "",
        googleID: adminData.googleID,
        imageUrl: adminData.imageUrl,
      });

      return { admin };
    } catch (error: any) {
      console.error("Error while creating admin:", error.message);
      console.dir(error, { depth: null });
      throw error;
    }
  }
  async findByEmail(email: string) {
    return await this.getByFilter({ email: email, isDeleted: false });
  }
   async findById(id: string) {
    return await this.getById(id)
  }
   
  async updatePasswordByEmail(email: string, hashedPassword: string): Promise<AdminDocument | null> {
    return this.updateOne({ email }, { password: hashedPassword });
  }
}
