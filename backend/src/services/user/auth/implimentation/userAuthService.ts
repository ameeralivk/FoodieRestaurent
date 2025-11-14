import {
  OTP_SENT_SUCCESS,
  USER_ALREADY_EXIST,
  USER_CREATED_SUCCESS,
} from "../../../../constants/messages";
import IUserAuthService from "../interface/IUserAuthService";
import IUserAuthRepository from "../../../../Repositories/user/auth/interface/IUserAuthRepository";
import bcrypt from "bcrypt";
import { generateOtp } from "../../../../utils/dto/generateOtp";
import { sentOtp } from "../../../../utils/dto/sentOtp";
import redisClient from "../../../../config/redisClient";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
export class UserAuthService implements IUserAuthService {
  constructor(private _userAuthRepository: IUserAuthRepository) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      let isExist = await this._userAuthRepository.findByEmail(email);
      if (isExist) {
        return { success: false, message: USER_ALREADY_EXIST };
      }
      const redisDataKey = `adminData:${email}`;
      const redisOtpKey = `otp:${email}`;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = {
        Name: name,
        Email: email,
        password: hashedPassword,
      };
      const { hashedOtp, otp } = generateOtp();
      await redisClient.setEx(redisDataKey, 600, JSON.stringify(data));
      await redisClient.setEx(redisOtpKey, 120, hashedOtp);
      let res = await sentOtp(email, otp);
      return { success: true, message: OTP_SENT_SUCCESS };
    } catch (error) {
      let err = error as Error;
      throw new Error(err.message);
    }
  }
}
