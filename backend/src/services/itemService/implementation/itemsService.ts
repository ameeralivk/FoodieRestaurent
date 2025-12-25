import { inject, injectable } from "inversify";
import { IItemsRepository } from "../../../Repositories/items/interface/interface";
import { IItemsService } from "../interface/IItemsService";
import { TYPES } from "../../../DI/types";
import { IItemInterface } from "../../../types/items";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";
import { FilterQuery } from "mongoose";
import s3 from "../../../config/Bucket";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import HttpStatus from "../../../constants/htttpStatusCode";

@injectable()
export class ItemsService implements IItemsService {
  constructor(
    @inject(TYPES.itemsRepository) private _itemsRepo: IItemsRepository
  ) {}

  async addItem(data: IItemInterface): Promise<IItemInterface> {
    const existingItem = await this._itemsRepo.findByName(
      data.name,
      data.restaurantId.toString()
    );

    if (existingItem) {
      throw new AppError("Item with this name already exists", 409);
    }

    return this._itemsRepo.createItem(data);
  }

  async editItem(
    id: string,
    data: Partial<IItemInterface>,
    images: string[]
  ): Promise<IItemInterface> {
    const item = await this._itemsRepo.find(id);

    if (!item) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    /** 🔹 DELETE OLD IMAGES FROM S3 */
    if (item.images?.length) {
      const bucketName = process.env.S3_BUCKET_NAME!;
      const region = process.env.AWS_REGION || "ap-south-1";

      for (const oldImage of item.images) {
        const key = oldImage.replace(
          `https://${bucketName}.s3.${region}.amazonaws.com/`,
          ""
        );

        if (key) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: bucketName,
              Key: key,
            })
          );
        }
      }
    }

    const updated = await this._itemsRepo.editItem(id, data, images);

    if (!updated) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, 404);
    }

    return updated;
  }

  async deleteItem(id: string): Promise<IItemInterface> {
    const deleted = await this._itemsRepo.deleteItem(id);
    console.log(deleted, "dele");
    if (!deleted) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, 404);
    }

    return deleted;
  }

  async changeStatus(id: string, isActive: boolean): Promise<IItemInterface> {
    const updated = await this._itemsRepo.changeStatus(id, isActive);

    if (!updated) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, 404);
    }

    return updated;
  }

  async getAllItemsByRestaurant(
    restaurantId: string,
    page: number,
    limit: number,
    search?: string
  ): Promise<{ data: IItemInterface[]; total: number }> {
    const filter: FilterQuery<IItemInterface> = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    return this._itemsRepo.getAllByRestaurant(
      restaurantId,
      filter,
      page,
      limit
    );
  }
}
