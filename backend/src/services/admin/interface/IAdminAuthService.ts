import { otpResponse } from "../../../utils/dto/sentOtp";
import { AdminDocument } from "../../../models/admin";
export default interface IAdminAuthService {
  register(
    restaurantName: String,
    email: String,
    password: String,
    role: "admin" | "superadmin"
  ): Promise<{ success: boolean; message: otpResponse }>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{ success: boolean; message: string ,data:{admin:AdminDocument}}>;
  resendOtp(
    email:string
  ):Promise<{success:boolean,message:string}>
}
