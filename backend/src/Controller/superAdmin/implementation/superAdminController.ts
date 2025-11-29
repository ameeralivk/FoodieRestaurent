import ISuperAdminService from "../../../services/superAdmin/interface/ISuperAdminService";
import ISuperAdminController from "../interface/ISuperAdminController";
import { Request, Response } from "express";
export class SuperAdminController implements ISuperAdminController {
  constructor(private _superAdminService: ISuperAdminService) {}

  getAllRestaurent = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._superAdminService.getAllRestaurants();

      res.status(200).json({
        success: true,
        message: "Restaurants fetched successfully",
        data: result.data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch restaurants",
      });
    }
  };

  approveRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedRestaurant = await this._superAdminService.approveRestaurant(
        id as string
      );
      res.status(200).json({
        success: true,
        message: "Restaurant approved successfully",
        data: updatedRestaurant,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Failed to approve restaurant",
      });
    }
  };
}
