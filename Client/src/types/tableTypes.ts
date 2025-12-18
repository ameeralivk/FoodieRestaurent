

export interface ITableForm {
  tableNo: number;
  seatingCapacity: number;
  description:string[];
  tableId?:string;
}


export interface ITable extends Document {
  _id: string; 
  restaurantId:string;
  tableNo: number;
  seatingCapacity: number;
  description: string[];
  isAvailable: boolean;
  qrCodeUrl: string;
}

export interface GetTablesResponse {
  success: boolean;
  message: string;
  data: ITable[];
  total: number;
  page: number;
  limit: number;
}

