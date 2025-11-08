import { NextFunction, Request, Response } from "express";
import IAdminAuthService from "../../../services/admin/interface/IAdminAuthService";
import IAdminAuthController from "../interface/IAdminAuthController";
import { AppError } from "../../../utils/Error";
import HttpStatus from "../../../constants/htttpStatusCode";
import { registerSchema } from "../../../utils/dto/zodvalidation";
export class AdminAuthController implements IAdminAuthController {
  constructor(private _adminauthService: IAdminAuthService) {}
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
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
      res.status(200).json({ message: "Register endpoint hit", data: message });
    } catch (error) {
      next(error);
    }
  };
}
