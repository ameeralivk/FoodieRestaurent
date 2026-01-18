import { Document, Types } from 'mongoose';

export interface IVariant {
  name: string;
}

export interface IVarientReq {
  name: string;
  Varients: IVariant[]; 
}

export interface IGroup extends Document {
  _id:Types.ObjectId;
  name: string;
  Varients: IVariant[];
  isActive: boolean;
  restaurantId:Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
}
