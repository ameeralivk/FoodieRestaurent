import HttpStatus from "../../../constants/htttpStatusCode";
import { ADMIN_ALREADY_EXIST, OTP_RESENT_SUCCESS } from "../../../constants/messages";
import { IAdminAuthRepository } from "../../../Repositories/Admin/interface/IAdminRepositories";
import { generateOtp } from "../../../utils/dto/generateOtp";
import { AppError } from "../../../utils/Error";
import redisClient from "../../../config/redisClient";
import bcrypt from "bcrypt";
import { sentOtp } from "../../../utils/dto/sentOtp";
import crypto from "crypto"
import { resendOtpEmail } from "../../../utils/dto/sentOtp";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
export class AdminAuthService {
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
  async verifyOtp(
    email:string,
    otp:string,
  ){
    const redisOtpKey = `otp:${email}`;
    const redisDataKey = `adminData:${email}`;

 
    const hashedOtp = await redisClient.get(redisOtpKey);

    if (!hashedOtp) {
      throw new AppError("OTP expired or not found", HttpStatus.BAD_REQUEST);
    }

     const hashedInputOtp = crypto.createHash("sha256").update(otp).digest("hex");
      if (hashedInputOtp !== hashedOtp) {
      throw new AppError("Invalid OTP", HttpStatus.UNAUTHORIZED);
      }
    const userDataString = await redisClient.get(redisDataKey);
    if (!userDataString) {
      throw new AppError("Admin data expired or not found", HttpStatus.BAD_REQUEST);
    }

    const userData = JSON.parse(userDataString);


    const createdUser = await this._adminAuthRepository.register(userData);

   
    await redisClient.del(redisOtpKey);
    await redisClient.del(redisDataKey);

    return {
      success: true,
      message:OTP_RESENT_SUCCESS ,
      data: createdUser,
    };
  }
  resendOtp = async(
    email:string,
  )=>{
     const { otp, hashedOtp } = generateOtp();

    const redisOtpKey = `otp:${email}`;
    await redisClient.setEx(redisOtpKey, 120, hashedOtp);

    await resendOtpEmail(email, otp);

    return { success:true, message: OTP_RESENT_SUCCESS };
  }
}
