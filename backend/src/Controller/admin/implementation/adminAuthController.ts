import { NextFunction, Request, Response } from "express";
import IAdminAuthService from "../../../services/admin/interface/IAdminAuthService";
import IAdminAuthController from "../interface/IAdminAuthController";
import { AppError } from "../../../utils/Error";
import HttpStatus from "../../../constants/htttpStatusCode";
import { getS3SignedUrl } from "../../../config/Bucket";
import { loginSchema, registerSchema } from "../../../helpers/zodvalidation";
import crypto from "crypto";
import { http } from "winston";
import { any, string, success } from "zod";
import { generateToken } from "../../../middleware/jwt";
import { MESSAGES } from "../../../constants/messages";
const refreshTokenMaxAge =
  Number(process.env.REFRESH_TOKEN_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;
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
      const { success, message, data, accesstoken } =
        await this._adminauthService.verifyOtp(email, otp);
      if (success) {
        res.status(HttpStatus.OK).json({ message, data, accesstoken });
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
        throw new AppError(
          "Email Format are not Correct",
          HttpStatus.BAD_REQUEST
        );
      }
      const { message, success } = await this._adminauthService.resendOtp(
        email
      );
      if (success) {
        res.status(HttpStatus.OK).json({
          success: true,
          message: message,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: message,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      const { admin, accesstoken, refreshToken } =
        await this._adminauthService.googleAuth(token);
      const data = {
        _id: admin._id,
        role: admin.role,
        restaurantName: admin.restaurantName,
        email: admin.email,
        googleId: admin.googleID,
        imageUrl: admin.imageUrl,
        status: admin.status,
      };

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: refreshTokenMaxAge,
      });
      res.status(200).json({
        success: true,
        data,
        accesstoken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Google auth failed" });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        throw {
          status: HttpStatus.UNAUTHORIZED,
          message: MESSAGES.NO_REFRESH_TOKEN_FOUND,
        };
      }

      const { newAccessToken } = await this._adminauthService.refreshToken(
        refreshToken
      );

      res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
    } catch (error) {
      const err = error as Error;
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err?.message || MESSAGES.NO_REFRESH_TOKEN_FOUND });
      console.error("Error while creating refreshToken.", err);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMessages = parsed.error.issues.map((e) => e.message);
        throw new AppError(errorMessages.join(","), HttpStatus.NOT_FOUND);
      }
      const { email, password } = parsed.data;

      const { admin, token, refreshToken } = await this._adminauthService.login(
        email,
        password
      );

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: refreshTokenMaxAge,
      });
      res.json({ admin, token });
    } catch (error) {
      const err = error as Error;
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err?.message || MESSAGES.SERVER_ERROR });
    }
  };

  forgetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Email is required" });
      }
      let response = await this._adminauthService.createLink(email);
      if (response.success) {
        res
          .status(HttpStatus.CREATED)
          .json({ succes: true, message: MESSAGES.LINK_SENT_SUCCESS });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ succes: false, message: MESSAGES.LINK_SENT_FAILED });
      }
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Something went Wrong",
      });
    }
  };

  updatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.query.token as string;
      const { newPassword, email } = req.body;
      if (!token) throw new AppError("Token is Missing");
      if (!newPassword)
        res.status(400).json({ message: "New password is required" });
      let response = await this._adminauthService.updatePassword(
        token,
        newPassword,
        email
      );
      if (response.success) {
        res
          .status(HttpStatus.OK)
          .json({ success: true, message: MESSAGES.PASS_CHANGE_SUCCESS });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: response.message });
      }
    } catch (error: any) {
      console.log(error.message, "eer");
      throw new AppError(error);
    }
  };

  registerRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        restaurantName,
        email,
        ownerName,
        contactNumber,
        restaurantAddress,
        openingTime,
        closingTime,
        latitude,
        longitude,
      } = req.body;

      const files = req.files as
        | {
            restaurantPhoto?: Express.Multer.File[];
            proofDocument?: Express.Multer.File[];
          }
        | undefined;
      // const restaurantPhotoPath = files?.restaurantPhoto?.[0]?.path;
      // const proofDocumentPath = files?.proofDocument?.[0]?.path;
      // const restaurantPhoto = files?.restaurantPhoto?.[0]?.location;
      // const proofDocument = files?.proofDocument?.[0]?.location;
      // const restaurantPhotoKey = files?.restaurantPhoto?.[0]?.key;
      // const proofDocumentKey = files?.proofDocument?.[0]?.key;

      // const restaurantPhoto = restaurantPhotoKey
      //   ? await getS3SignedUrl(restaurantPhotoKey)
      //   : undefined;

      // const proofDocument = proofDocumentKey
      //   ? await getS3SignedUrl(proofDocumentKey)
      //   : undefined;
       const restaurantPhotoKey = files?.restaurantPhoto?.[0]?.key;
    const proofDocumentKey = files?.proofDocument?.[0]?.key;

    // Construct public URLs directly
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION || "ap-south-1";

    const restaurantPhoto = restaurantPhotoKey
      ? `https://${bucketName}.s3.${region}.amazonaws.com/${restaurantPhotoKey}`
      : undefined;

    const proofDocument = proofDocumentKey
      ? `https://${bucketName}.s3.${region}.amazonaws.com/${proofDocumentKey}`
      : undefined;

      // const restaurantPhoto = restaurantPhotoPath
      //   ? "/uploads/" + restaurantPhotoPath.split(/[/\\]/).pop()
      //   : undefined;

      // const proofDocument = proofDocumentPath
      //   ? "/uploads/" + proofDocumentPath.split(/[/\\]/).pop()
      //   : undefined;

      console.log(restaurantPhoto, proofDocument);
      const response = await this._adminauthService.registerRestaurant({
        email,
        restaurantName,
        ownerName,
        contactNumber,
        restaurantAddress,
        openingTime,
        closingTime,
        latitude,
        longitude,
        restaurantPhoto,
        proofDocument,
      });
      console.log(response, "ameer");
      res.status(200).json({
        success: true,
        message: MESSAGES.RESTAURANT_REGISTER_COMPLETE,
      });
    } catch (error: any) {
      throw new AppError(error?.message || "Something went wrong");
    }
  };

 
}
