import { AdminDocument } from "../../models/admin";
import { Types } from "mongoose";
export interface IMappedAdminData {
  _id: Types.ObjectId;
  restaurantName: string;
  ownerName?: string;
  email: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  isBlocked: boolean;
  contactNumber?: Number;
  placeName?: string;
  location?: {
    type: "Point";
    coordinates: number[];
  };
  imageUrl?: string;
  restaurantPhoto?: string;
  openingTime?: string;
  closingTime?: string;
  proofDocument: string;
}
export const adminDataMapping = (
  restaurant: AdminDocument
): IMappedAdminData => {
  return {
    _id: restaurant.id,
    restaurantName: restaurant.restaurantName,
    ownerName: restaurant.ownerName,
    email: restaurant.email,
    role: restaurant.role,
    status: restaurant.status as "pending" | "approved" | "rejected",
    isBlocked: restaurant.isBlocked,
    contactNumber: restaurant.contactNumber,
    placeName: restaurant.placeName,
    location: restaurant.location,
    imageUrl: restaurant.imageUrl,
    restaurantPhoto: restaurant.restaurantPhoto,
    openingTime: restaurant.openingTime,
    closingTime: restaurant.closingTime,
    proofDocument: restaurant.proofDocument,
  };
};
