import { Types } from "mongoose";
import { IUser } from "../../types/usert";

export interface IMappedUserData {
  id: Types.ObjectId | string;
  name: string;
  email: string;
  phone: string;
  allergies?: string;
  dietaryRestriction?: string;
  imageUrl: string;
  isBlocked: boolean;
  createdAt?:Date;
}

export interface IUserResponseDto {
  success: boolean;
  user: IMappedUserData;
}

export const mapUserToDto = (user: IUser): IUserResponseDto => {
  return {
    success: true,
    user: {
      id: user._id.toString(),
      name: user.Name,
      email: user.Email,
      phone: user.phone,
      allergies: user.Allergies,
      dietaryRestriction: user.DietaryRestriction,
      imageUrl: user.imageUrl,
      isBlocked: user.isBlocked
    }
  };
};

export const mapUserDto = (user: IUser): IMappedUserData => {
  return {
      id: user._id.toString(),
      name: user.Name,
      email: user.Email,
      phone: user.phone,
      allergies: user.Allergies,
      dietaryRestriction: user.DietaryRestriction,
      imageUrl: user.imageUrl,
      isBlocked: user.isBlocked,
      createdAt:user.createdAt
    }
};