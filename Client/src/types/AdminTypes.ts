

export interface FormData {
  restaurantName: string;
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

