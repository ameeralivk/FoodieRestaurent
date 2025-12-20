import { BaseRepository } from "../../IBaseRepository";
import { IItemsRepository } from "../interface/interface";
import Items, { itemsDocument } from "../../../models/items";
import { IItemInterface } from "../../../types/items";
import { AppError } from "../../../utils/Error";
import { FilterQuery, UpdateQuery } from "mongoose";
export class ItemsRepository
  extends BaseRepository<itemsDocument>
  implements IItemsRepository
{
  constructor() {
    super(Items);
  }

  async findByName(
    name: string,
    restaurantId: string
  ): Promise<IItemInterface | null> {
    return this.getByFilter({
      name: { $regex: `^${name}$`, $options: "i" },
      restaurantId,
    });
  }

  async createItem(data: IItemInterface): Promise<IItemInterface> {
    return this.create(data);
  }

  async editItem(
    id: string,
    data: Partial<IItemInterface>
  ): Promise<IItemInterface | null> {
    return await this.findByIdAndUpdate(id, data);
  }

  async deleteItem(id: string): Promise<IItemInterface | null> {
    try {
      return await this.findByIdAndDel(id, "isDeleted", false);
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async changeStatus(id: string, isActive: boolean): Promise<IItemInterface | null> {
    return await this.findByIdAndUpdate(id,{isActive});
  }
}
