import { IUserAuthController } from "../interface/IUserAuthController";
import IUserAuthService from "../../../../services/user/auth/interface/IUserAuthService";
import { Request, Response } from "express";
import HttpStatus from "../../../../constants/htttpStatusCode";
import { AppError } from "../../../../utils/Error";
import { OTP_SENT_SUCCESS, USER_CREATED_SUCCESS } from "../../../../constants/messages";
export class UserAuthController implements IUserAuthController {
  constructor(private _userAuthService: IUserAuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name,email, password } = req.body;
      let result = await this._userAuthService.register(name,email, password);
      if(!result.success){
        throw new Error(result.message)
      }
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: OTP_SENT_SUCCESS});
    } catch (error) {
      const err = error as Error;
      throw new AppError(err.message);
    }
  };
}
