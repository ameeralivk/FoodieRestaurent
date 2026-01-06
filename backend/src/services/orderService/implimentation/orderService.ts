import { inject, injectable } from "inversify";
import { IOrderService } from "../interface/IOrderService";
import { TYPES } from "../../../DI/types";
import { IOrderRepo } from "../../../Repositories/order/interface/interface";
import { IUserOrder, IUserOrderDocument } from "../../../types/order";

@injectable()
export class OrderService implements IOrderService {
  constructor(@inject(TYPES.orderRepository) private _orderRepo: IOrderRepo) {}

  getAllOrders(
    restaurantId: string,
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<{ data: IUserOrderDocument[]|null; total: number }> {
    return this._orderRepo.getAllOrders(
      restaurantId,
      userId,
      page,
      limit,
      search
    );
  }
}
