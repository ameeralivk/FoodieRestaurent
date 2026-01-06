import { inject, injectable } from "inversify";
import { IOrderController } from "../interface/IOrderController";
import { TYPES } from "../../../DI/types";
import { IOrderService } from "../../../services/orderService/interface/IOrderService";
import { AppError } from "../../../utils/Error";
import { Response, Request } from "express";
import HttpStatus from "../../../constants/htttpStatusCode";
@injectable()
export class OrderController implements IOrderController {
  constructor(
    @inject(TYPES.orderService) private _orderService: IOrderService
  ) {}

  getAllOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        restaurentId,
        userId,
        page = 1,
        limit = 10,
        search = "",
      } = req.query;


      const result = await this._orderService.getAllOrders(
        restaurentId as string,
        userId as string,
        Number(page),
        Number(limit),
        search as string
      );

      return res.status(HttpStatus.OK).json({
        success: true,
        data: result.data,
        total: result.total,
        page: Number(page),
        limit: Number(limit),
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };
}
