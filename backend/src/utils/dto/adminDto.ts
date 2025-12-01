import { AdminDocument } from "../../models/admin";
import { Types } from "mongoose";
export interface AdminDTO {
  _id: Types.ObjectId;
  role: string;
  restaurantName: string;
  email: string;
  googleId: string | null;
  imageUrl: string | null;
  status: string;
  rejectedAt: Date | null;
  rejectionReason: string | null;
}

export interface AdminStatusDTO {
  status: "pending" | "approved" | "rejected" | "resubmitted" | undefined;
  role: string;
  isBlocked: boolean;
  restaurantName: string;
  email: string;
  rejectionReason?: string;
  rejectedAt?: Date | null;
}

export const adminDTO = (admin: AdminDocument): AdminDTO => {
  return {
    _id: admin.id,
    role: admin.role,
    restaurantName: admin.restaurantName,
    email: admin.email,
    googleId: admin.googleID || null,
    imageUrl: admin.imageUrl || null,
    status: admin.status??"",
    rejectedAt: admin.rejectedAt || null,
    rejectionReason: admin.rejectionReason || null,
  };
};


export const mapAdminStatusDTO = (admin: AdminDocument): AdminStatusDTO => {
  const dto: AdminStatusDTO = {
    status:admin.status,
    role: admin.role,
    isBlocked: admin.isBlocked,
    restaurantName: admin.restaurantName,
    email: admin.email,
  };

  if (admin.status === "rejected") {
    dto.rejectionReason = admin.rejectionReason || "";
    dto.rejectedAt = admin.rejectedAt || null;
  }

  return dto;
};
