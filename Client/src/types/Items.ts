
export interface IItem {
  _id: string;
  name: string;
  price: number;
  stock: number;
  points: number;
  isStock: boolean;
  isActive: boolean;
  isDeleted: boolean;
  restaurantId: string;
  category: string; // categoryId
  images:File[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface IItemResponse {
  success: boolean;
  message: string;
  data: IItem[];
  total: number;
  page: number;
  limit: number;
}

export interface addItemInterface {
  name: string;
  price: number;
  restaurantId: string;
  stock?: string;
  images:File[]
  points?: number;
  category:string;
  subCategory?:string;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubCategory {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IItem {
  _id: string;
  name: string;
  price: number;
  stock: number;
  points: number;
  isActive: boolean;
  categoryName?:string;
  isDeleted: boolean;
  isStock: boolean;
  images: File[];
  restaurantId: string;
  categoryId: ICategory; // Nested object
  subCategoryId: ISubCategory; // Nested object
  createdAt: string;
  updatedAt: string;
}



