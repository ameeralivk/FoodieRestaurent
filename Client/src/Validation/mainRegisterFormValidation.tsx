import type { RestaurantFormData } from "../types/AdminTypes";
const allowedProofTypes = ["application/pdf", "image/jpeg", "image/png"];
const allowedPhotoTypes = ["image/jpeg", "image/png"];
interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof RestaurantFormData, string>>;
}

export const validateRestaurantForm = (
  data: RestaurantFormData
): ValidationResult => {
  const errors: Partial<Record<keyof RestaurantFormData, string>> = {};

  // 🔹 Restaurant Name: Only letters, spaces, and 3–50 chars
  if (!data.restaurantName.trim()) {
    errors.restaurantName = "Restaurant name is required";
  } else if (!/^[A-Za-z\s]{3,50}$/.test(data.restaurantName)) {
    errors.restaurantName = "Enter a valid restaurant name (3–50 letters)";
  }

  // 🔹 Owner Name: Letters and spaces only
  if (!data.ownerName.trim()) {
    errors.ownerName = "Owner name is required";
  } else if (!/^[A-Za-z\s]{3,40}$/.test(data.ownerName)) {
    errors.ownerName = "Enter a valid owner name";
  }

  // 🔹 Contact Number: 10 digits only
  if (!data.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required";
  } else if (!/^[0-9]{10}$/.test(data.contactNumber)) {
    errors.contactNumber = "Contact number must be 10 digits";
  }

  // 🔹 Address: Minimum 5 characters
  if (!data.address.trim()) {
    errors.address = "Address is required";
  } else if (data.address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  // 🔹 Opening / Closing Time (24-hour format like 09:00 or 18:30)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!data.openingTime) {
    errors.openingTime = "Opening time is required";
  } else if (!timeRegex.test(data.openingTime)) {
    errors.openingTime = "Enter time in HH:MM format";
  }

  if (!data.closingTime) {
    errors.closingTime = "Closing time is required";
  } else if (!timeRegex.test(data.closingTime)) {
    errors.closingTime = "Enter time in HH:MM format";
  }

  if (
    timeRegex.test(data.openingTime || "") &&
    timeRegex.test(data.closingTime || "")
  ) {
    const [openHour, openMin] = data.openingTime.split(":").map(Number);
    const [closeHour, closeMin] = data.closingTime.split(":").map(Number);

    const openTotalMinutes = openHour * 60 + openMin;
    const closeTotalMinutes = closeHour * 60 + closeMin;

    if (closeTotalMinutes <= openTotalMinutes) {
      errors.closingTime = "Closing time must be greater than opening time";
    }
  }

  if (!data.proofDocument) {
    errors.proofDocument = "Proof document is required";
  } else if (!allowedProofTypes.includes(data.proofDocument.type)) {
    errors.proofDocument = "Invalid file type. Allowed: PDF, JPG, PNG";
  }

  // 🔹 Restaurant Photo
  if (!data.restaurantPhoto) {
    errors.restaurantPhoto = "Restaurant photo is required";
  } else if (!allowedPhotoTypes.includes(data.restaurantPhoto.type)) {
    errors.restaurantPhoto = "Invalid file type. Allowed: JPG, PNG";
  }

  // 🔹 Latitude / Longitude numeric check
  if (!data.latitude || !data.longitude) {
    errors.latitude = "Select a location";
    errors.longitude = "Select a location";
  } else if (
    !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(data.latitude) ||
    !/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(data.longitude)
  ) {
    errors.latitude = "Enter a valid latitude (-90 to 90)";
    errors.longitude = "Enter a valid longitude (-180 to 180)";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
