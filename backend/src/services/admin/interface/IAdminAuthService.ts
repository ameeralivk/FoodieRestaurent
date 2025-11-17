import { otpResponse } from "../../../utils/dto/sentOtp";
import { AdminDocument } from "../../../models/admin";
import { IAdmin } from "../../../types/admin";
import type { IRestaurantRegisterData } from "../../../types/admin";
import type { GeoLocation } from "../../../types/admin";
export default interface IAdminAuthService {
  login(
    email: string,
    password: string
  ): Promise<{ admin: IAdmin; token: string; refreshToken: string }>;
  register(
    restaurantName: String,
    email: String,
    password: String,
    role: "admin" | "superadmin"
  ): Promise<{ success: boolean; message: otpResponse }>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { admin: AdminDocument };
    accesstoken: string;
  }>;
  resendOtp(email: string): Promise<{ success: boolean; message: string }>;
  googleAuth(
    accessToken: string
  ): Promise<{ admin: IAdmin; accesstoken: string; refreshToken: string }>;
  refreshToken(refreshToken: string): Promise<{ newAccessToken: string }>;
  createLink(email: string): Promise<{ success: boolean; message: string }>;
  updatePassword(
    token: string,
    email: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }>;
  registerRestaurant(
    Data: IRestaurantRegisterData
  ): Promise<{ success: boolean; message: string }>;
  getAllRestaurants(): Promise<{ success: boolean; data: IAdmin[] }>;

}
