

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName?:string,
  restaurantId: string;
  status: boolean;
  createdAt: string;
}
export interface SubCategoryResponse {
  success: boolean;
  message: string;
  data: SubCategory[];
  page: number;
  limit: number;
  total: number;
}


export interface subCategoryData {
    name:string,
    description:string,
    restaurantId?:string,
    categoryId?:string
}

export interface SubCategoryFormData {
  name: string;
  description: string;
  categoryName: string;
  features: string[];
  skills: string[];
  images: string[];
}
