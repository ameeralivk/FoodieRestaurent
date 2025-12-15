import { inject, injectable } from "inversify";
import { ITableService } from "../../../services/tableService/interface/ITableService";
import { ITableController } from "../interface/ITableController";
import { TYPES } from "../../../DI/types";
import { Response, Request } from "express";
import HttpStatus from "../../../constants/htttpStatusCode";
@injectable()
export class TableController implements ITableController {
  constructor(
    @inject(TYPES.tableService) private _tableService: ITableService
  ) {}

   addTable = async(req: Request, res: Response): Promise<Response>=> {
    try {
      console.log('hi helo')
      const table = await this._tableService.createTable(req.body);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Table created successfully",
      });
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }
}
