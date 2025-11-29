import ISuperAdminService from "../interface/ISuperAdminService";
import { IAdminAuthRepository } from "../../../Repositories/Admin/interface/IAdminRepositories";
import { IMappedAdminData } from "../../../utils/dto/adminDto";
import { AppError } from "../../../utils/Error";
import { adminDataMapping } from "../../../utils/dto/adminDto";
export class SuperAdminService implements ISuperAdminService {
  constructor(private _adminAuthRepository: IAdminAuthRepository) {}

  async getAllRestaurants(): Promise<{
    success: boolean;
    data: IMappedAdminData[];
  }> {
    try {
      const restaurants = await this._adminAuthRepository.getAllRestaurant();
      console.log(restaurants, "1");
      const mappedRestaurants = restaurants.map((restaurant) =>
        adminDataMapping(restaurant)
      );
      console.log(mappedRestaurants, "2");
      return {
        success: true,
        data: mappedRestaurants,
      };
    } catch (error: any) {
      throw new AppError(error.message || "Failed to fetch restaurants");
    }
  }

  async approveRestaurant(id: string) {
    const restaurant = await this._adminAuthRepository.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Update status to "approved"
    const updated = await this._adminAuthRepository.updateById(id, {
      status: "approved",
    });
    return updated;
  }
}
