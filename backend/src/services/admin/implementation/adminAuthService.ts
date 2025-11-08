import HttpStatus from "../../../constants/htttpStatusCode";
import { ADMIN_ALREADY_EXIST } from "../../../constants/messages";
import { IAdminAuthRepository } from "../../../Repositories/Admin/interface/IAdminRepositories";
import { AppError } from "../../../utils/Error";

export class AdminAuthService {
  constructor(private _adminAuthRepository: IAdminAuthRepository) {}
  async register(
    restaurantName: String,
    email: string,
    password: String,
    role: String
  ) {
    const data = {
      restaurantName,
      email,
      password,
      role,
    };
    const existing = await this._adminAuthRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError(ADMIN_ALREADY_EXIST,HttpStatus.NOT_FOUND);
    }
    await this._adminAuthRepository.register(data);
    return { message: "Admin registered successfully" };
  }
}
