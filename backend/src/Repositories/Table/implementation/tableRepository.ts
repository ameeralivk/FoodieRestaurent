import { BaseRepository } from "../../IBaseRepository";
import { ITableRepository } from "../interface/ITableRepository";
import Table from "../../../models/table";
import { ITable } from "../../../types/table";
import mongoose from "mongoose";
export class TableRepository extends BaseRepository<ITable> implements ITableRepository{
    constructor(){
      super(Table)
    }

    async findByTableNo(
    restaurantId: mongoose.Types.ObjectId,
    tableNo: number
  ): Promise<ITable | null> {
    return this.getByFilter({ restaurantId, tableNo });
  }

  async createTable(data: Partial<ITable>): Promise<ITable> {
    return this.create(data);
  }
}