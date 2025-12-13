import { injectable, inject } from "inversify";
import { IStaffService } from "../../../services/staff/interface/IStaffService";
import { IStaffController } from "../interface/IStaffController";
import { Response, Request } from "express";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";
@injectable()
export class StaffController implements IStaffController {
  constructor(
    @inject(TYPES.staffService) private _staffService: IStaffService
  ) {}

  addStaff = async (req: Request, res: Response): Promise<Response> => {
    try {
      const staff = await this._staffService.addStaff(req.body);

      return res.status(201).json({
        success: true,
        message: MESSAGES.STAFF_ADDED_SUCCESS,
        data: staff,
      });
    } catch (err: any) {
      throw new AppError(err.message);
    }
  };

  editStaff = async (req: Request, res: Response): Promise<Response> => {
    try {
      const staffId = req.params.staffId;
      const updatedStaff = await this._staffService.editStaff({
        staffId,
        ...req.body,
      });
      return res.status(200).json({
        success: true,
        message: MESSAGES.STAFF_UPDATED_SUCCESS,
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };

  deleteStaff = async (req: Request, res: Response): Promise<Response> => {
    try {
      const staffId = req.params.staffId as string;

      await this._staffService.deleteStaff(staffId);

      return res.status(200).json({
        success: true,
        message: "Staff deleted successfully",
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };
  changeStatus = async(req: Request, res: Response): Promise<Response> => {
    try {
      const staffId = req.params.staffId as string;
      const { status } = req.body;

     const staff = await this._staffService.changeStaffStatus(staffId, status);

      return res.status(200).json({
        success: true,
        message: "Staff status updated successfully",
        data: staff,
      });
    } catch (error:any) {
        throw new AppError(error.message)
    }
  }


  getAllStaff = async(req: Request, res: Response): Promise<Response>=>{

    try {
        const restaurantId= req.params.restaurantId as string;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      console.log(restaurantId,'here it is')
      const staff = await this._staffService.getAllStaff(
        restaurantId,
        page,
        limit
      );

      return res.status(200).json({
        success: true,
        message: "Staff fetched successfully",
        ...staff,
      });
    } catch (error:any) {
        throw new AppError(error.message)
    }
  }
}
