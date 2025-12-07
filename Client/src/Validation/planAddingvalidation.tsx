// src/validation/subscriptionValidation.ts

export interface SubscriptionData {
  planName: string;
  price: number;
  duration: string;
  noOfStaff: number;
  noOfDishes: number;
  features?: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const PlanAddingValidation = (
  data: SubscriptionData
): ValidationErrors => {
  const errors: ValidationErrors = {};
  console.log(data, "fldsjafldjsfkldjlafjd=====================");
  // Plan Name
  if (!data.planName || !data.planName.trim()) {
    errors.planName = "Plan Name is required";
  } else if (data.planName.length < 3) {
    errors.planName = "Plan Name must be at least 3 characters";
  }

  // Price
  if (data.price === undefined || data.price === null) {
    errors.price = "Price is required";
  } else if (typeof data.price === "string" && isNaN(Number(data.price))) {
    errors.price = "Price must be a valid number";
  } else if (Number(data.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  // Duration
  if (!data.duration ) {
    errors.duration = "Duration is required";
  }

  // Number of Staff
  if (data.noOfStaff === undefined || data.noOfStaff === null) {
    errors.noOfStaff = "Number of staff is required";
  } else if (
    typeof data.noOfStaff === "string" &&
    isNaN(Number(data.noOfStaff))
  ) {
    errors.noOfStaff = "Number of staff must be a number";
  } else if (Number(data.noOfStaff) <= 0) {
    errors.noOfStaff = "Number of staff must be greater than 0";
  }

  if (data.noOfDishes === undefined || data.noOfDishes === null) {
    errors.noOfDishes = "Number of staff is required";
  } else if (
    typeof data.noOfStaff === "string" &&
    isNaN(Number(data.noOfDishes))
  ) {
    errors.noOfDishes = "Number of staff must be a number";
  } else if (Number(data.noOfDishes) <= 0) {
    errors.noOfDishes = "Number of staff must be greater than 0";
  }

  // Features (optional)
  if (data.features && data.features.some((f) => !f.trim())) {
    errors.features = "Features cannot be empty";
  }

  return errors;
};
