export interface IVarient {
    name:string
}

export interface IVariantItem {
  _id: string;
  name: string;
}

export interface IVariant {
  _id: string;
  name: string;
  restaurantId:string;
  Varient: IVariantItem[]; // ⚠️ matches backend key exactly
  createdAt: string;
}
export interface IGetVariantsResponse {
  success: boolean;
  data: IVariant[];
  total:number;
}
