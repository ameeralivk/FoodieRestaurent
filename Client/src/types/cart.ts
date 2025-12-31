export interface CartItem {
  _id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  preparationTime: number;
}

export interface ResponseCart{
    success:boolean,
    cart:Cart
}

export interface Cart {
  _id: string;
  userId: string;
  restaurantId: string;
  tableId: string;
  items: CartItem[];
  totalAmount: number;
  isDeleted: boolean;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  __v: number;
}
