export interface CategoryInput {
  name?: string;
  description?: string;
}

export const validateCategory = (data: CategoryInput) => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim() === "") {
    errors.name = "Category name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "Category name must be at least 3 characters";
  } else if (data.name.trim().length > 50) {
    errors.name = "Category name must be at most 50 characters";
  }

  // Description validation (optional)
 if (!data.description || data.description.trim() === "") {
  errors.description = "Description is required";
} else if (data.description.trim().length < 5) {
  errors.description = "Description must be at least 5 characters";
} else if (data.description.trim().length > 200) {
  errors.description = "Description must be at most 200 characters";
}


  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
