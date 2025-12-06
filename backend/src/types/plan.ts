import { Document } from "mongoose";

export interface ISubscription extends Document {
  _id:string;
  planName: string;
  price: number;
  duration: string|number;
  noOfDishes: number;
  noOfStaff: number;
  features: string[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ISubscriptionPlan {
  planName: string;
  price: number;       
  duration: string|number;    
  noOfDishes: number;  
  noOfStaff: number;   
  features: string[];  
}

export interface ISubscriptionDTO {
  _id:String;
  planName: string;
  price: number;       
  duration: string|number;    
  noOfDishes: number;  
  noOfStaff: number;   
  features: string[];  
}