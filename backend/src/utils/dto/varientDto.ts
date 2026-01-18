
import { Types } from "mongoose";
import { IGroup, IVariant } from "../../types/varient";

export interface IVarientResponseDto{
    _id:Types.ObjectId
    name:string,
    Varient:IVariant[],
    createdAt:Date
}
export interface IGetAllVariantResponse {
  success: boolean;
  data: IVarientResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const VarientResponseDto = (group: IGroup) => {
  return {
    _id: group._id,
    name: group.name,
    Varient: group.Varients,
    createdAt: group.createdAt
  };
};