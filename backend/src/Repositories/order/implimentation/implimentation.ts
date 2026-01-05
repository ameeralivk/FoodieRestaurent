import { BaseRepository } from "../../IBaseRepository";
import { IOrderRepo } from "../interface/interface";
import { IUserOrderDocument } from "../../../types/order";
import UserOrder from "../../../models/order";
import { ICart } from "../../../types/cart";
import { Types } from "mongoose";
import { AppError } from "../../../utils/Error";
export class OrderRepository
  extends BaseRepository<IUserOrderDocument>
  implements IOrderRepo
{
  constructor() {
    super(UserOrder);
  }

  async addOrder(data: ICart): Promise<IUserOrderDocument> {
    try {
      const orderItems = data.items.map((item) => ({
        itemId: item.itemId,
        itemName: item.name,
        price: item.price,
        quantity: item.quantity,
        assignedCookId: null,
        itemStatus: "PENDING" as const,
      }));
      console.log(
        data.restaurantId,
        data.tableId,
        data.totalAmount,
        "orderItems"
      );
      let res = await this.create({
        restaurantId: data.restaurantId,
        tableId: String(data.tableId),
        items: orderItems,
        subTotal: data.totalAmount,
        totalAmount: data.totalAmount,
        currency: "INR",
        orderStatus: "PLACED",
      });
      return res;
    } catch (error: any) {
      console.log(error);
      throw new AppError(error.message);
    }
  }
}
