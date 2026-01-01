// import React, { useState } from "react";
// import type { CategoryResponse } from "../../types/category";
// import { getAllCategory } from "../../services/category";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { getAllSubCategory } from "../../services/subCategory";
// import type{ SubCategory } from "../../types/subCategory";
// import type {
//   SubCategoryResponse,
// } from "../../types/subCategory";

// const CategorySubCategoryFilter: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

//   const { restaurantId } = useParams<{ restaurantId: string }>();
//   const {
//     data: categoryData,
//   } = useQuery<CategoryResponse, Error>({
//     queryKey: ["categories", restaurantId],
//     queryFn: () =>
//       getAllCategory(restaurantId as string, undefined, undefined, ""),
//   });

//   const {
//     data: subCategoryData,
//   } = useQuery<SubCategoryResponse, Error>({
//     queryKey: ["subCategories", restaurantId],
//     queryFn: () => getAllSubCategory(restaurantId as string, 1, 10, ""),
//   });

//   // Dummy subcategories based on selected category

//   const currentSubCategories=
//     selectedCategory !== "all"
//       ? subCategoryData?.data.filter((x) => x.categoryName === selectedCategory)
//       : [];
//   console.log(currentSubCategories, selectedCategory);
//   const handleCategoryChange = (categoryName: string): void => {
//     setSelectedCategory(categoryName);
//     setSelectedSubCategory("all");
//   };

//   return (
//     <div className="bg-white">
//       {/* Category Filter */}
//       <div className="border-b border-gray-200 py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
//             {/* All Categories Button */}
//             <button
//               onClick={() => handleCategoryChange("all")}
//               className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all ${
//                 selectedCategory === "all"
//                   ? "border-orange-500 bg-orange-50"
//                   : "border-gray-200 bg-white hover:border-gray-300"
//               }`}
//             >
//               <div className="w-14 h-14 mb-2 flex items-center justify-center bg-gray-50 rounded-xl">
//                 <span className="text-3xl">🍽️</span>
//               </div>
//               <span className="text-sm font-medium text-gray-900">All</span>
//               {selectedCategory === "all" && (
//                 <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
//                   <svg
//                     className="w-3 h-3 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={3}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//               )}
//             </button>

//             {/* Category Items */}
//             {categoryData?.data.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryChange(category.name)}
//                 className={`relative flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all ${
//                   selectedCategory === category.name
//                     ? "border-orange-500 bg-orange-50"
//                     : "border-gray-200 bg-white hover:border-gray-300"
//                 }`}
//               >
//                 {/* <div className="w-14 h-14 mb-2 flex items-center justify-center bg-gray-50 rounded-xl">
//                   <span className="text-3xl">{category.icon}</span>
//                 </div> */}
//                 <span className="text-sm font-medium text-gray-900 truncate px-2 text-center w-full">
//                   {category.name}
//                 </span>
//                 {selectedCategory === category.name && (
//                   <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-3 h-3 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={3}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SubCategory Filter - Only shown when a category is selected */}
//       {currentSubCategories && currentSubCategories.length > 0 && (
//         <div className="bg-gray-50 border-b border-gray-200 py-4">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
//               <button
//                 onClick={() => setSelectedSubCategory("all")}
//                 className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
//                   selectedSubCategory === "all"
//                     ? "bg-orange-500 text-white shadow-sm"
//                     : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 All
//               </button>
//               {currentSubCategories?.map((subCategory: SubCategory) => (
//                 <button
//                   key={subCategory.id}
//                   onClick={() => setSelectedSubCategory(subCategory.name)}
//                   className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
//                     selectedSubCategory === subCategory.name
//                       ? "bg-orange-500 text-white shadow-sm"
//                       : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   {subCategory.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Selected Info Display */}
//     </div>
//   );
// };

// export default CategorySubCategoryFilter;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getAllCategory } from "../../services/category";
import { getAllSubCategory } from "../../services/subCategory";

import type { CategoryResponse } from "../../types/category";
import type { SubCategory, SubCategoryResponse } from "../../types/subCategory";
import { Pagination } from "@mui/material";

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
    <div className="bg-white">
      {/* Category Filter */}
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
            {/* All Categories */}
            <button
              onClick={() => handleCategoryChange("all")}
              className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all ${
                selectedCategory === "all"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="w-14 h-14 mb-2 flex items-center justify-center bg-gray-50 rounded-xl">
                <span className="text-3xl">🍽️</span>
              </div>
              <span className="text-sm font-medium text-gray-900">All</span>
            </button>

            {/* Category Items */}
            {categoryData?.data.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`relative flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border-2 transition-all ${
                  selectedCategory === category.name
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-sm font-medium text-gray-900 truncate px-2 text-center w-full">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SubCategory Filter */}
      {currentSubCategories && currentSubCategories.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => handleSubCategoryChange("all")}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedSubCategory === "all"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                All
              </button>

              {currentSubCategories.map((subCategory: SubCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => handleSubCategoryChange(subCategory.name)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedSubCategory === subCategory.name
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {subCategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySubCategoryFilter;
