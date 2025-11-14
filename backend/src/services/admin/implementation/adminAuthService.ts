import HttpStatus from "../../../constants/htttpStatusCode";
import {
  ACCOUNT_IS_BLOCKED,
  ADMIN_ALREADY_EXIST,
  ADMIN_NOT_FOUND,
  INVALID_TOKEN,
  NO_REFRESH_TOKEN_FOUND,
  OTP_RESENT_SUCCESS,
  OTP_VERIFY_sUCCESS,
  PASS_CHANGE_SUCCESS,
  RESTAURANT_REGISTER_COMPLETE,
} from "../../../constants/messages";
import { IAdminAuthRepository } from "../../../Repositories/Admin/interface/IAdminRepositories";
import { generateOtp } from "../../../utils/dto/generateOtp";
import { AppError } from "../../../utils/Error";
import redisClient from "../../../config/redisClient";
import bcrypt from "bcrypt";
import axios from "axios";
import { sendResetPasswordEmail, sentOtp } from "../../../utils/dto/sentOtp";
import crypto from "crypto";
import { resendOtpEmail } from "../../../utils/dto/sentOtp";

import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../../../middleware/jwt";
import { IAdmin, IRestaurantRegisterData } from "../../../types/admin";
import { email, string, success } from "zod";
import IAdminAuthService from "../interface/IAdminAuthService";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
export class AdminAuthService implements IAdminAuthService {
  constructor(private _adminAuthRepository: IAdminAuthRepository) {}

  async register(
    restaurantName: string,
    email: string,
    password: string,
    role: string
  ) {
    const existing = await this._adminAuthRepository.findByEmail(email);
    if (existing) {
      throw new AppError(ADMIN_ALREADY_EXIST, HttpStatus.NOT_FOUND);
    }
    const redisDataKey = `adminData:${email}`;
    const redisOtpKey = `otp:${email}`;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      restaurantName,
      email,
      password: hashedPassword,
      role,
    };
    const { hashedOtp, otp } = generateOtp();
    await redisClient.setEx(redisDataKey, 600, JSON.stringify(data));
    await redisClient.setEx(redisOtpKey, 120, hashedOtp);
    let res = await sentOtp(email, otp);

    if (res.success) {
      return { success: true, message: res };
    } else {
      return { success: false, message: res };
    }
  }

  googleAuth = async (accessToken: string) => {
    const response = await axios.get(process.env.GOOGLE_USERINFO_URL!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { sub, name, email, picture } = response.data;
    let admin = await this._adminAuthRepository.findByEmail(email);
    if (!admin) {
      const result = await this._adminAuthRepository.register({
        restaurantName: "",
        email,
        role: "admin",
        googleID: sub,
        imageUrl: picture,
      });

      admin = result.admin;
    }
    const accesstoken = generateToken(admin?._id as string, admin?.role);
    const refreshToken = generateRefreshToken(
      admin?._id as string,
      admin?.role
    );

    return { admin, accesstoken, refreshToken };
  };

  async verifyOtp(email: string, otp: string) {
    const redisOtpKey = `otp:${email}`;
    const redisDataKey = `adminData:${email}`;

    const hashedOtp = await redisClient.get(redisOtpKey);

    if (!hashedOtp) {
      throw new AppError("OTP expired or not found", HttpStatus.BAD_REQUEST);
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    if (hashedInputOtp !== hashedOtp) {
      throw new AppError("Invalid OTP", HttpStatus.UNAUTHORIZED);
    }
    const userDataString = await redisClient.get(redisDataKey);
    if (!userDataString) {
      throw new AppError(
        "Admin data expired or not found",
        HttpStatus.BAD_REQUEST
      );
    }

    const userData = JSON.parse(userDataString);

    const createdUser = await this._adminAuthRepository.register(userData);

    await redisClient.del(redisOtpKey);
    await redisClient.del(redisDataKey);
    const accesstoken = generateToken(
      createdUser.admin._id as string,
      createdUser.admin?.role
    );
    const refreshToken = generateRefreshToken(
      createdUser.admin._id as string,
      createdUser.admin?.role
    );
    return {
      success: true,
      message: OTP_VERIFY_sUCCESS,
      data: createdUser,
      accesstoken,
    };
  }

  resendOtp = async (email: string) => {
    const { otp, hashedOtp } = generateOtp();

    const redisOtpKey = `otp:${email}`;
    await redisClient.setEx(redisOtpKey, 120, hashedOtp);

    await resendOtpEmail(email, otp);

    return { success: true, message: OTP_RESENT_SUCCESS };
  };

  async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new Error(NO_REFRESH_TOKEN_FOUND);

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw { status: HttpStatus.UNAUTHORIZED, message: INVALID_TOKEN };
    }

    const admin = await this._adminAuthRepository.findById(decoded.id);
    if (!admin) {
      throw { status: HttpStatus.NOT_FOUND, message: ADMIN_NOT_FOUND };
    }

    if (admin.isBlocked) {
      throw { status: HttpStatus.FORBIDDEN, message: ACCOUNT_IS_BLOCKED };
    }
    const newAccessToken = generateToken(decoded.id, decoded.role);

    return { newAccessToken };
  }

  createLink = async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    const admin = await this._adminAuthRepository.findByEmail(email);
    if (!admin) throw new Error(ADMIN_NOT_FOUND);
    const token = crypto.randomBytes(32).toString("hex");
    await redisClient.setEx(`resetPassword:${email}`,120, token);
    await sendResetPasswordEmail(email, token);
    return { success: true, message: "Password reset link sent to your email" };
  };

  async login(
    email: string,
    password: string
  ): Promise<{ admin: IAdmin; token: string; refreshToken: string }> {
    const admin = await this._adminAuthRepository.findByEmail(email);
    if (!admin) {
      throw new AppError(ADMIN_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    const token = generateToken(admin._id as string, admin.role);
    const refreshToken = generateRefreshToken(admin._id as string, admin.role);

    return { admin, token, refreshToken };
  }
  // async updatePassword(
  //   token: string,
  //   newPassword: string,
  //   email: string
  // ): Promise<{ success: boolean; message: string }> {

  //   const storedToken = await redisClient.get(`resetPassword:${email}`);
  //   console.log(storedToken,'token')
  //   if (!storedToken || storedToken !== token) {
  //     console.log('hhhhhhhhh')
  //     return { success: false, message: "Invalid or expired token" };
  //   }
  //   const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  //   const admin = await this._adminAuthRepository.updatePasswordByEmail(
  //     email,
  //     hashedPassword
  //   );
  //   console.log(admin,'admin')
  //   if (!admin) {
  //     return { success: false, message: "Admin not found" };
  //   }
  //   await redisClient.del(`resetPassword:${email}`);
  //   return { success: true, message: "Password updated successfully" };
  // }

  async updatePassword(
    token: string,
    newPassword: string,
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const storedToken = await redisClient.get(`resetPassword:${email}`);
      if (!storedToken || storedToken !== token) {
        console.log("Token is invalid or expired");
        return { success: false, message: "Invalid or expired token" };
      }
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const admin = await this._adminAuthRepository.updatePasswordByEmail(
        email,
        hashedPassword
      );
      if (!admin) {
        return { success: false, message: ADMIN_NOT_FOUND };
      }
      await redisClient.del(`resetPassword:${email}`);

      return { success: true, message: PASS_CHANGE_SUCCESS };
    } catch (error) {
      console.error("Error in updatePassword:", error);
      return { success: false, message: "Internal Server Error" };
    }
  }

  async registerRestaurant(data:IRestaurantRegisterData):Promise <{success:boolean,message:string}>{
        try {
           let res = await this._adminAuthRepository.findByEmail(data.email)
           if(!res){
              throw new AppError(ADMIN_NOT_FOUND)
           }
           const adminId = res?._id as string
           let result = await this._adminAuthRepository.registerRestaurent(adminId,data)
         
           return {success:true,message:RESTAURANT_REGISTER_COMPLETE}
        } catch (error:any) {
             throw new AppError(error)
        }
    }

}
