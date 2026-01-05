// src/utils/validators/profileValidator.ts

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export interface ProfileFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const validateProfileForm = (
  formData: ProfileFormData
): {
  isValid: boolean;
  errors: ProfileFormErrors;
} => {
  const errors: ProfileFormErrors = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Enter a valid email";
  }

  // Phone
  const phoneRegex = /^[0-9]{10}$/;
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = "Phone must be 10 digits";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
