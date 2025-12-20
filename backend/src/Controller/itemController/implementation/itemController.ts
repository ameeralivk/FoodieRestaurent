import { injectable, inject } from "inversify";
import { IItemsService } from "../../../services/itemService/interface/IItemsService";
import { IItemController } from "../interface/IItemController";
import { TYPES } from "../../../DI/types";
import { Request, Response } from "express";
import HttpStatus from "../../../constants/htttpStatusCode";
import { AppError } from "../../../utils/Error";
import Items from "../../../models/items";
import { MESSAGES } from "../../../constants/messages";
@injectable()
export class ItemController implements IItemController {
  constructor(
    @inject(TYPES.itemsService) private _itemsService: IItemsService
  ) {}

  addItems = async (req: Request, res: Response): Promise<Response> => {
    try {
      const item = await this._itemsService.addItem(req.body);
      if (item) {
        return res.status(HttpStatus.CREATED).json({
          success: true,
          message: MESSAGES.ITEM_ADDED_SUCCESS,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          succcess: false,
          message: MESSAGES.ITEM_ADDED_FAILED,
        });
      }
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };

  editItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { itemId } = req.params;
      const item = await this._itemsService.editItem(
        itemId as string,
        req.body
      );
      if (item) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: MESSAGES.ITEM_EDITED_SUCCESS,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: MESSAGES.ITEM_EDITED_SUCCESS,
        });
      }
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };

  deleteItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { itemId } = req.params;
      const item = await this._itemsService.deleteItem(itemId as string);
      if(item){
        return res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.ITEM_DEL_SUCCESS,
      });
      }else{
      return res.status(HttpStatus.BAD_REQUEST).json({
        success:false,
        message: MESSAGES.ITEM_DEL_FAILED,
      });
      }
     
    } catch (error: any) {
      throw new AppError(error.message);
    }
  };

   changeStatus = async(req: Request, res: Response): Promise<Response> => {
    try {
    const { itemId } = req.params;
    const { isActive } = req.body;

    const item = await this._itemsService.changeStatus(itemId as string, isActive);
    if(item){
      return res.status(HttpStatus.OK).json({
      success: true,
      message:MESSAGES.ITEM_STATUS_CHANGE_SUCCESS ,
    });
    }else{
      return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.ITEM_STATUS_CHANGE_FAILED,
    });
    }
    } catch (error:any) {
       throw new AppError(error.message)
    }
  }
}
