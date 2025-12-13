export interface IStaffAdd {
  restaurantId: string;
  staffName: string;
  email: string;
  role: "staff" | "chef";
}

interface IAddStaff {
  success: boolean;
  message: string;
}

export interface Staff {
  _id: string;
  restaurantId: string;
  staffName: string;
  email: string;
  role: "staff" | "chef";
  status: boolean;
  isBlocked: boolean;
  createdAt: string; 
  updatedAt: string; 
};

export interface AddStaffResponse {
  success: boolean;
  message:string;
  data: IAddStaff;
}

export interface StaffListResponse {
  success: boolean;
  data: Staff[];
  total?: number;
}

