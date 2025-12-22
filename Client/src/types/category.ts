

export interface Category {
  id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string; 
}

export interface CategoryResponse {
  success: boolean;
  total: number;
  data: Category[];
}

export interface CategoryFormData {
  name: string;
  description: string;
  features: string[];
  images: string[];
  skills: string[];
}

