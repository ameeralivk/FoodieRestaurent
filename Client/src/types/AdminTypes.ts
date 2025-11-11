export interface FormData {
  restaurantName: string;
  email: string;
  password: string;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface RestaurantFormData {
  restaurantName: string;
  ownerName: string;
  contactNumber: string;
  address: string;
  openingTime: string;
  closingTime: string;
  proofDocument: File | null;
  restaurantPhoto: File | null;
  latitude: string;
  longitude: string;
}

export interface AdminType {
  _id: string,
  role: string;
  restaurantName?: string;
  email: string;
  googleId: string;
  imageUrl: string;
}

export interface ForgetPasswordFormData {
  email: string;
}