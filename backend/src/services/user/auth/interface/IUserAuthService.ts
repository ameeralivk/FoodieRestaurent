import { UserDocument } from "../../../../models/user";
import { IUser } from "../../../../types/usert";

export default interface IUserAuthService {
  register(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }>;
  googleAuth(
    accessToken: string
  ): Promise<{ user: IUser; accesstoken: string; refreshToken: string }>;
  login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; refreshToken: string }>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { user: UserDocument };
    accesstoken: string;
  }>;
  createLink(email: string): Promise<{ success: boolean; message: string }>;
   updatePassword(
    token:string,
    email:string,
    newPassword:string,
  ):Promise<{success:boolean,message:string }>;
   resendOtp(
    email:string
  ):Promise<{success:boolean,message:string}>
}
