import { injectable, inject } from "inversify";
import { IUserService } from "../../../services/user/interface/IUserService";
import { IUserController } from "../interface/IUserController";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../utils/Error";
import HttpStatus from "../../../constants/htttpStatusCode";
import { Response, Request } from "express";
import { MESSAGES } from "../../../constants/messages";
@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.userService) private _userService: IUserService) {}

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const search = (req.query.search as string) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = await this._userService.getAllUsers(search, page, limit);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.USER_FETCHED_SUCCESS,
        users,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };

  updateUserStatus = async (req: Request, res: Response):Promise<Response> => {
  const { userId } = req.params;
  const { status } = req.body;

  if (typeof status !== "boolean") {
    throw new AppError(
      "isBlocked must be boolean",
      HttpStatus.BAD_REQUEST
    );
  }

  const user = await this._userService.updateUserStatus(userId as string, status);
  if(!user){
    throw new AppError(MESSAGES.USER_FAILED_UPDATE_STATUS)
  }
  return res.status(HttpStatus.OK).json({
    success: true,
    message: status
      ? MESSAGES.USER_BLOCKED_SUCCESS
      : MESSAGES.USER_UNBLOCKED_SUCESS,
  });
};

}
