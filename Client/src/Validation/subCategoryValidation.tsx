import type { subCategoryData } from "../types/subCategory";

export const validateSubCategory = (data: subCategoryData) => {
  const errors: Record<string, string> = {};

  // SubCategory Name
  if (!data.name || data.name.trim() === "") {
    errors.name = "SubCategory name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "SubCategory name must be at least 3 characters";
  } else if (data.name.trim().length > 50) {
    errors.name = "SubCategory name must be at most 50 characters";
  }

  // Description
  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  } else if (data.description.trim().length < 5) {
    errors.description = "Description must be at least 5 characters";
  } else if (data.description.trim().length > 200) {
    errors.description = "Description must be at most 200 characters";
  }

  // Main Category (Select)
  if (!data.categoryId) {
    errors.categoryName = "Please select a main category";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
