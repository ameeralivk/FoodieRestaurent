 export interface FormData {
    email: string;
    password: string;
  }

  export interface userType {
  _id: string;
  role: string;
  email: string;
  restaurantId?:string,
  googleId?: string;
  imageUrl?: string;
  status:string;
}