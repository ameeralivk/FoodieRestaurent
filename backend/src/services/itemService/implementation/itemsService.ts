import { inject, injectable } from "inversify";
import { IItemsRepository } from "../../../Repositories/items/interface/interface";
import { IItemsService } from "../interface/IItemsService";
import { TYPES } from "../../../DI/types";
import { IItemInterface } from "../../../types/items";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";
import { FilterQuery } from "mongoose";
import { deleteFromCloudinary } from "../../../helpers/cloudinaryService";
import HttpStatus from "../../../constants/htttpStatusCode";
import { Request } from "express";
@injectable()
export class ItemsService implements IItemsService {
  constructor(
    @inject(TYPES.itemsRepository) private _itemsRepo: IItemsRepository
  ) {}

  async addItem(req: Request,data: IItemInterface): Promise<IItemInterface> {
    const existingItem = await this._itemsRepo.findByName(
      data.name,
      data.restaurantId.toString()
    );

    if (existingItem) {
      throw new AppError("Item with this name already exists", 409);
    }
    const itemCount = req.activePlan.planSnapshot.noOfDishes;
    const existingItemCount = await this._itemsRepo.getAllItems(data.restaurantId.toString())
    if(itemCount <= existingItemCount.length){
      throw new AppError("You have exceeded the subscription plan limit");
    }
    return this._itemsRepo.createItem(data);
  }


  async editItem(
    id: string,
    data: Partial<IItemInterface>,
    newImages: string[]
  ): Promise<IItemInterface | undefined> {
    const item = await this._itemsRepo.find(id);

    if (!item) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const existingImages = item.images || [];
    const incomingCount = newImages.length;
    const MAX_IMAGES = 3;
    if (incomingCount === 0) {
      await this._itemsRepo.editItem(id, data, existingImages);
    }

    const imagesToDelete = existingImages.slice(MAX_IMAGES - incomingCount);
    for (const oldImage of imagesToDelete) {
      if (oldImage && oldImage.includes("res.cloudinary.com")) {
        await deleteFromCloudinary(oldImage);
      }
    }
    const imagesToKeep = existingImages.slice(0, MAX_IMAGES - incomingCount);

    const finalImages = [...imagesToKeep, ...newImages];

    const updated = await this._itemsRepo.editItem(id, data, finalImages);

    if (!updated) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return updated;
  }

  async deleteItem(id: string): Promise<IItemInterface> {
    const deleted = await this._itemsRepo.deleteItem(id);
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
    role:string,
    search?: string,
  ): Promise<{ data: IItemInterface[]; total: number }> {
    const filter: FilterQuery<IItemInterface> = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    return this._itemsRepo.getAllByRestaurant(
      restaurantId,
      filter,
      page,
      limit,
      role
    );
  }

  async getItem(id: string): Promise<{ success: boolean , data: IItemInterface|null }> {
    let res = await this._itemsRepo.find(id)
    return {success:true,data:res}
  }
}

