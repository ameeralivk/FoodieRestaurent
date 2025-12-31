import { inject, injectable } from "inversify";
import { ICartRepository } from "../../../Repositories/cart/interface/ICartRepository";
import { ICartService } from "../interface/ICartService";
import { TYPES } from "../../../DI/types";
import { IItemsRepository } from "../../../Repositories/items/interface/interface";
import { ICart, ICartItem } from "../../../types/cart";
import { AppError } from "../../../utils/Error";
import { MESSAGES } from "../../../constants/messages";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.cartRepository) private _cartRepo: ICartRepository,
    @inject(TYPES.itemsRepository) private _itemRepo: IItemsRepository
  ) {}

  async addToCart(
    userId: string,
    itemId: string,
    restaurantId: string,
    tableId: string,
    quantity: string
  ): Promise<ICart | null> {
    const item = await this._itemRepo.find(itemId);
    if (!item || item.isDeleted || !item.isActive) {
      throw new Error(MESSAGES.ITEM_NOT_FOUND);
    }
    let cart = await this._cartRepo.findByUserAndRestaurant(
      userId,
      restaurantId
    );
    if (!cart) {
      return await this._cartRepo.createCart(userId, restaurantId, tableId, [
        {
          itemId: item._id!,
          name: item.name,
          price: item.price,
          quantity: Number(quantity),
          images: item.images,
          preparationTime: item.preparationTime,
        },
      ]);
    }

    const existingItem = cart?.items.find(
      (i) => i.itemId.toString() === itemId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart?.items.push({
        itemId: item._id!,
        name: item.name,
        price: item.price,
        quantity: Number(quantity),
        images: item.images,
        preparationTime: item.preparationTime,
      });
    }
    if (cart) {
      return this._cartRepo.addCart(cart);
    } else {
      throw new AppError(MESSAGES.CART_CREATION_FAILED);
    }
  }

  async updateQuantity(
    cartId: string,
    restaurantId: string,
    itemId: string,
    action: "inc" | "dec"
  ): Promise<{ success: boolean; message: string }> {
    const cart = await this._cartRepo.findCartById(cartId, restaurantId);
    if (!cart) throw new AppError(MESSAGES.CART_NOT_FOUND);
    const item = cart.items.find(
      (i: ICartItem) => i.itemId.toString() === itemId
    );

    if (!item) throw new AppError(MESSAGES.ITEM_NOT_FOUND);

    if (action === "inc") {
      item.quantity += 1;
    } else {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i: ICartItem) => i.itemId.toString() !== itemId
        );
      }
    }

    let res = await this._cartRepo.saveCart(cart);
    if (res) {
      return { success: true, message: MESSAGES.CART_QUANTITY_UPDATED };
    } else {
      return { success: false, message: MESSAGES.CART_QUANTITY_UPDATED_FAILED };
    }
  }

  async getCart(userId: string, restaurantId: string): Promise<ICart|null> {
    const cart = await this._cartRepo.findCart(userId, restaurantId);
    return cart;
  }

  async deleteCart(
    cartId: string,
    restaurantId: string,
    itemId: string
  ): Promise<{ success: boolean; message: string }> {
    const cart = await this._cartRepo.findCartById(cartId, restaurantId);
    if (!cart) {
      throw new AppError(MESSAGES.CART_NOT_FOUND);
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId
    );

    if (itemIndex === -1) {
      throw new AppError(MESSAGES.ITEM_NOT_FOUND);
    }
    cart.items.splice(itemIndex, 1);
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (cart.items.length === 0) {
      await this._cartRepo.deleteCart(cartId);
      return {
        success: true,
        message: MESSAGES.CART_EMPTY_OR_NOT_FOUND,
      };
    }

    await this._cartRepo.findAndUpdate(cart._id.toString(),cart);

    return {
      success: true,
      message: MESSAGES.CART_ITEM_REMOVED_SUCCES,
    };
  }
}
