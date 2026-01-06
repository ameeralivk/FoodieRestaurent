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
      console.log(data.items,'data is here')
      const orderItems = data.items.map((item) => ({
        itemId: item.itemId,
        itemName: item.name,
        itemImages:item.images,
        price: item.price,
        quantity: item.quantity,
        assignedCookId: null,
        itemStatus: "PENDING" as const,
      }));

      let res = await this.create({
        userId: data.userId,
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

  async getAllOrders(
    restaurantId: string,
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<{ data: IUserOrderDocument[]; total: number }> {
    const filter: any = {
      restaurantId,
      userId,
    };

    if (search) {
      filter.$or = [
        { tableId: { $regex: search, $options: "i" } },
        { orderStatus: { $regex: search, $options: "i" } },
      ];
    }

    return await this.getAll(filter, { page, limit });
  }
}
