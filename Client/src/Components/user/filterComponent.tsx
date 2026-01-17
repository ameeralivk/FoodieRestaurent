import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getAllCategory } from "../../services/category";
import { getAllSubCategory } from "../../services/subCategory";

import type { CategoryResponse } from "../../types/category";
import type { SubCategory, SubCategoryResponse } from "../../types/subCategory";

interface CategorySubCategoryFilterProps {
  onChange: (category: string, subCategory: string) => void;
}

const CategorySubCategoryFilter: React.FC<CategorySubCategoryFilterProps> = ({
  onChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  const { restaurantId } = useParams<{ restaurantId: string }>();

  /* -------------------- CATEGORY QUERY -------------------- */
  const { data: categoryData } = useQuery<CategoryResponse, Error>({
    queryKey: ["categories", restaurantId],
    queryFn: () =>
      getAllCategory(restaurantId as string, undefined, undefined, ""),
    enabled: !!restaurantId,
  });

  /* -------------------- SUB CATEGORY QUERY -------------------- */
  const { data: subCategoryData } = useQuery<SubCategoryResponse, Error>({
    queryKey: ["subCategories", restaurantId],
    queryFn: () => getAllSubCategory(restaurantId as string, 1, 10000, ""),
    enabled: !!restaurantId,
  });

  /* -------------------- FILTER SUB CATEGORIES -------------------- */
  const currentSubCategories =
    selectedCategory !== "all"
      ? subCategoryData?.data.filter((x) => x.categoryName === selectedCategory)
      : [];

  /* -------------------- HANDLERS -------------------- */
  const handleCategoryChange = (categoryName: string): void => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("all");
    onChange(categoryName, "all");
  };

  const handleSubCategoryChange = (subCategoryName: string): void => {
    setSelectedSubCategory(subCategoryName);
    onChange(selectedCategory, subCategoryName);
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="w-full space-y-4">
      {/* Category Filter */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {/* All Button */}
        <button
          onClick={() => handleCategoryChange("all")}
          className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${selectedCategory === "all"
              ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-200"
              : "bg-white text-gray-700 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 shadow-sm"
            }`}
        >
          All Items
        </button>

        {/* Dynamic Categories */}
        {categoryData?.data.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.name)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.name
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-200"
                : "bg-white text-gray-700 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 shadow-sm"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* SubCategory Filter - Appears smoothly when needed */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${currentSubCategories && currentSubCategories.length > 0
          ? "max-h-20 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
        }`}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 flex-shrink-0">
            Tags:
          </span>

          <button
            onClick={() => handleSubCategoryChange("all")}
            className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedSubCategory === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            All
          </button>

          {currentSubCategories?.map((subCategory: SubCategory) => (
            <button
              key={subCategory.id}
              onClick={() => handleSubCategoryChange(subCategory.name)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedSubCategory === subCategory.name
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {subCategory.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySubCategoryFilter;
