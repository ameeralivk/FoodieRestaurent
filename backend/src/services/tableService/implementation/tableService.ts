import { injectable, inject } from "inversify";
import { ITableRepository } from "../../../Repositories/Table/interface/ITableRepository";
import { ITableService } from "../interface/ITableService";
import { TYPES } from "../../../DI/types";
import mongoose from "mongoose";
import { CreateTableInput } from "../../../types/table";
import { MESSAGES } from "../../../constants/messages";

@injectable()
export class TableService implements ITableService {
  constructor(
    @inject(TYPES.tableRepository) private _tableRepo: ITableRepository
  ) {}

  async createTable(
    data: CreateTableInput
  ): Promise<{ success: boolean; message: string }> {
    console.log('hi')
    const { restaurantId, tableNo, seatingCapacity, description } = data;

    if (!tableNo || !seatingCapacity) {
      throw new Error(MESSAGES.TABLE_ALREADY_EXIST);
    }
    const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

    const existing = await this._tableRepo.findByTableNo(
      restaurantObjectId,
      tableNo
    );
    if (existing) {
      throw new Error("Table number already exists");
    }
    const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/r/${restaurantId}?table=${tableNo}`;
     const res = await this._tableRepo.createTable({
      restaurantId: restaurantObjectId,
      tableNo,
      seatingCapacity,
      description,
      qrCodeUrl,
      isAvailable: true,
    });
    if(res){
       return {success:true,message:MESSAGES.TABLE_CREATED_SUCCESS}
    }else{
       return {success:true,message:MESSAGES.TABLE_CREATED_FAILED}
    }
  }
}
