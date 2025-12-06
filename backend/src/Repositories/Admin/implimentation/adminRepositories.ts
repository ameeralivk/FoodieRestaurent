import Admin, { AdminDocument } from "../../../models/admin";
import { BaseRepository } from "../../IBaseRepository";
import { IAdminAuthRepository } from "../interface/IAdminRepositories";
import redisClient from "../../../config/redisClient";
import { IAdmin, IRestaurantRegisterData } from "../../../types/admin";
import getPlaceName from "../../../config/getPlaceName";
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
    return await this.getById(id);
  }

  async updatePasswordByEmail(
    email: string,
    hashedPassword: string
  ): Promise<AdminDocument | null> {
    return this.updateOne({ email }, { password: hashedPassword });
  }

  async registerRestaurent(
    id: string,
    data: IRestaurantRegisterData
  ): Promise<AdminDocument | null> {
    const place = await getPlaceName(
      parseFloat(data.latitude),
      parseFloat(data.longitude)
    );
    const updateData = {
      restaurantName: data.restaurantName,
      ownerName: data.ownerName,
      contactNumber: data.contactNumber,
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      address: data.restaurantAddress,
      restaurantPhoto: data.restaurantPhoto,
      proofDocument: data.proofDocument,
      location: {
        type: "Point",
        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
      },
      status: "pending",
      placeName: place,
    };

    return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async getAllRestaurant(
    page: number,
    limit: number,
    filter: any = {}
  ): Promise<{ data: AdminDocument[]; total: number }> {
    try {
      // return await this.getAll(
      //   { role: "admin", status: { $exists: true } },
      //   { page, limit }
      // );
      const finalFilter = {
        role: "admin",
        status: { $exists: true },
        ...filter,
      };
      return await this.getAll(finalFilter,{page,limit});
    } catch (error: any) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }

  async updateById(
    id: string,
    updateData: Partial<AdminDocument>
  ): Promise<AdminDocument | null> {
    return this.findByIdAndUpdate(id, updateData);
  }
}
