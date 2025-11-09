import { NextFunction, Request, Response } from "express";
import IAdminAuthService from "../../../services/admin/interface/IAdminAuthService";
import IAdminAuthController from "../interface/IAdminAuthController";
import { AppError } from "../../../utils/Error";
import HttpStatus from "../../../constants/htttpStatusCode";
import { registerSchema } from "../../../utils/dto/zodvalidation";
import { success } from "zod";
export class AdminAuthController implements IAdminAuthController {
  constructor(private _adminauthService: IAdminAuthService) {}
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body,'body')
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMessages = parsed.error.issues.map((e) => e.message);
        throw new AppError(errorMessages.join(","), HttpStatus.NOT_FOUND);
      }
      const { restaurantName, email, password, role } = parsed.data;
      const { message } = await this._adminauthService.register(
        restaurantName,
        email,
        password,
        role
      );
      console.log(message, "message is here");
      if (message.success) {
        res.status(HttpStatus.OK).json({ message });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: "Failed to SentOtp" });
      }
    } catch (error) {
      next(error);
    }
  };
  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, otp } = req.body;
      const { success, message, data } = await this._adminauthService.verifyOtp(
        email,
        otp
      );
      if (success) {
        res.status(HttpStatus.OK).json({ message });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: "Failed to SentOtp" });
      }
    } catch (error) {
      next(error);
    }
  };
  resendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!email || !emailRegex.test(email)) {
        throw new AppError("Email Format are not Correct",HttpStatus.BAD_REQUEST);
      }
       const { message ,success } = await this._adminauthService.resendOtp(email);
      if(success){
        res.status(HttpStatus.OK).json({
        success: true,
        message: message,
      });
      }else{
        res.status(HttpStatus.BAD_REQUEST).json({
          success:false,
          message:message,
        })
      }
    } catch (error) {
      next(error)
    }
  };
}
