// src/validation/staffValidation.ts

export interface StaffFormData {
  staffName: string;
  email: string;
  role: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const StaffValidation = (data: StaffFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Staff Name
  if (!data.staffName || !data.staffName.trim()) {
    errors.staffName = "Staff name is required";
  } else if (data.staffName.trim().length < 2) {
    errors.staffName = "Staff name must be at least 2 characters";
  }

  // Email
  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email address";
    }
  }

  // Role
  if (!data.role || !data.role.trim()) {
    errors.role = "Role is required";
  } else if (!["staff", "chef"].includes(data.role.toLowerCase())) {
    errors.role = "Role must be either staff or chef";
  }

  return errors;
};
