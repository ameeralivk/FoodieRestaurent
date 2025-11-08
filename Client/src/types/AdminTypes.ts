

export interface FormData {
  restaurantName: string;
  adminEmail: string;
  adminPassword: string;
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

