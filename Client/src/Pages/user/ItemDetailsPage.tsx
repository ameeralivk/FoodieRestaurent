// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import {
// //   ChevronLeft,
// //   Clock,
// //   Star,
// //   Plus,
// //   Minus,
// //   ShoppingCart,
// // } from "lucide-react";
// // import { getItem, sendToAi } from "../../services/user";
// // import type { GetMenuItemsResponse } from "../../types/Items";
// // import { useNavigate } from "react-router-dom";
// // import { AddToCart } from "../../services/cart";
// // import type { RootState } from "../../redux/store/store";
// // import { useSearchParams } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { showErrorToast } from "../../Components/Elements/ErrorToast";
// // import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// // import { ToastContainer } from "react-toastify";
// // const ItemDetailPage: React.FC = () => {
// //   const { itemId } = useParams<{ itemId: string }>();
// //   const [quantity, setQuantity] = useState(1);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [aiDescription, setAiDescription] = useState<string>("");
// //   const [loadingNutrition, setLoadingNutrition] = useState(true);
// //   const [nutrition, setNutrition] = useState({
// //     calories: 0,
// //     protein: 0,
// //     carbs: 0,
// //     fat: 0,
// //   });
// //   const [searchParams] = useSearchParams();
// //   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
// //   const { restaurantId } = useParams<{ restaurantId: string }>();
// //   const table = searchParams.get("tableId");
// //   const navigate = useNavigate();
// //   const { data, isLoading } = useQuery<GetMenuItemsResponse>({
// //     queryKey: ["item", itemId],
// //     queryFn: () => getItem(itemId as string),
// //     enabled: !!itemId,
// //   });

// //   const item = data?.data.data;
// //   const images = item?.images ?? [];

// //   // Image carousel
// //   useEffect(() => {
// //     if (!images.length) return;
// //     const interval = setInterval(() => {
// //       setCurrentImageIndex((prev) =>
// //         prev === images.length - 1 ? 0 : prev + 1
// //       );
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, [images.length]);

// //   useEffect(() => {
// //     if (images.length > 0) setCurrentImageIndex(0);
// //   }, [images]);

// //   // Fetch AI description + nutrition
// //   useEffect(() => {
// //     const fetchDescriptionAndNutrition = async () => {
// //       if (!item?.name) return;
// //       setLoadingNutrition(true);

// //       try {
// //         const res =
// //           await sendToAi(`Give me a JSON with description and nutritional info (Calories, Protein in g, Carbs in g, Fat in g) for ${item.name}.
// // Example format:
// // {
// //   "description": "...",
// //   "calories": 520,
// //   "protein": 32,
// //   "carbs": 45,
// //   "fat": 18
// // }`);
// //         const jsonMatch = res.reply.match(/\{[\s\S]*\}/);
// //         if (!jsonMatch) throw new Error("No JSON found in AI response");

// //         const data = JSON.parse(jsonMatch[0]);

// //         setAiDescription(data.description);
// //         setNutrition({
// //           calories: data.calories,
// //           protein: data.protein,
// //           carbs: data.carbs,
// //           fat: data.fat,
// //         });
// //       } catch (error) {
// //         console.error("Error parsing AI response:", error);
// //       } finally {
// //         setLoadingNutrition(false);
// //       }
// //     };

// //     fetchDescriptionAndNutrition();
// //   }, [item]);

// //   if (isLoading || !item) {
// //     return <div className="text-center py-20">Loading item...</div>;
// //   }

// //   async function handleAddToCart(id: string) {
// //     try {
// //       if (userId && restaurantId && table) {
// //         const res = await AddToCart(
// //           userId,
// //           restaurantId,
// //           id,
// //           table,
// //           quantity.toString()
// //         );
// //         if (res.success) {
// //           showSuccessToast("Added to Cart Successfully");
// //           navigate(`/user/${restaurantId}/cart`);
// //         }
// //       } else {
// //         showErrorToast("userId or restaurentId or tableId is not found");
// //       }
// //     } catch (error) {
// //       return;
// //     }
// //   }

// //   const handleQuantityDecrease = () => {
// //     if (quantity > 1) setQuantity(quantity - 1);
// //   };
// //   const handleQuantityIncrease = () => setQuantity(quantity + 1);
// //   const totalPrice = item.price * quantity;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <ToastContainer />
// //       {/* Header */}
// //       <div className="bg-white shadow-sm sticky top-0 z-10">
// //         <div className="max-w-8xl mx-auto px-4 py-4 flex items-center">
// //           <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
// //             <ChevronLeft onClick={() => navigate(-1)} className="w-6 h-6" />
// //           </button>
// //           <h1 className="ml-2 text-lg font-semibold">Item Details</h1>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 py-6">
// //         {/* Image Gallery */}
// //         <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
// //           <div className="relative aspect-[4/2] bg-gray-100">
// //             <img
// //               src={images[currentImageIndex]}
// //               alt={item?.name}
// //               className="w-full h-full object-cover"
// //             />
// //             {item?.isStock && (
// //               <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
// //                 In Stock
// //               </div>
// //             )}
// //           </div>
// //           {/* Thumbnails */}
// //           <div className="flex gap-2 p-4 overflow-x-auto">
// //             {images.map((image, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => setCurrentImageIndex(index)}
// //                 className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
// //                   currentImageIndex === index
// //                     ? "border-red-500"
// //                     : "border-gray-200"
// //                 }`}
// //               >
// //                 <img
// //                   src={image}
// //                   alt={`${item.name} ${index + 1}`}
// //                   className="w-full h-full object-cover"
// //                 />
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Item Details */}
// //         <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
// //           <div className="flex items-start justify-between mb-4">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-2">
// //                 {item?.name}
// //               </h2>
// //               <div className="flex items-center gap-4 text-sm text-gray-600">
// //                 <div className="flex items-center gap-1">
// //                   <Clock className="w-4 h-4" />
// //                   <span>{item?.preparationTime} mins</span>
// //                 </div>
// //                 <div className="flex items-center gap-1">
// //                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// //                   <span>4.5 (120+ ratings)</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="text-right">
// //               <div className="text-2xl font-bold text-green-600">
// //                 ₹{item?.price}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Description */}
// //           <div className="border-t pt-4 mb-4">
// //             <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
// //             {aiDescription ? (
// //               <p className="text-gray-600 text-sm leading-relaxed">
// //                 {aiDescription}
// //               </p>
// //             ) : (
// //               <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
// //             )}
// //           </div>

// //           {/* Nutritional Info */}
// //           <div className="border-t pt-4">
// //             <h3 className="font-semibold text-gray-900 mb-3">
// //               Nutritional Info
// //             </h3>
// //             <div className="grid grid-cols-4 gap-4 text-center">
// //               {["calories", "protein", "carbs", "fat"].map((key) => (
// //                 <div key={key} className="bg-gray-50 rounded-lg p-3">
// //                   <div className="text-lg font-bold text-gray-900 h-6">
// //                     {loadingNutrition ? (
// //                       <div className="h-6 w-12 mx-auto bg-gray-200 rounded animate-pulse"></div>
// //                     ) : key === "calories" ? (
// //                       nutrition.calories
// //                     ) : key === "protein" ? (
// //                       `${nutrition.protein}g`
// //                     ) : key === "carbs" ? (
// //                       `${nutrition.carbs}g`
// //                     ) : (
// //                       `${nutrition.fat}g`
// //                     )}
// //                   </div>
// //                   <div className="text-xs text-gray-600 capitalize">
// //                     {key === "calories"
// //                       ? "Calories"
// //                       : key.charAt(0).toUpperCase() + key.slice(1)}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Add to Cart Section */}
// //         <div className="bg-white rounded-2xl shadow-sm p-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <span className="text-gray-700 font-medium">Quantity</span>
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={handleQuantityDecrease}
// //                 className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition"
// //               >
// //                 <Minus className="w-5 h-5" />
// //               </button>
// //               <span className="text-xl font-bold w-8 text-center">
// //                 {quantity}
// //               </span>
// //               <button
// //                 onClick={handleQuantityIncrease}
// //                 className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition"
// //               >
// //                 <Plus className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>

// //           <div className="flex items-center justify-between pt-4 border-t mb-4">
// //             <span className="text-gray-700 font-medium">Total Price</span>
// //             <span className="text-2xl font-bold text-green-600">
// //               ₹{totalPrice.toFixed(2)}
// //             </span>
// //           </div>

// //           <button
// //             onClick={() => handleAddToCart(item._id)}
// //             className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-red-500/30"
// //           >
// //             <ShoppingCart className="w-5 h-5" />
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ItemDetailPage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import {
//   ChevronLeft,
//   Clock,
//   Star,
//   Plus,
//   Minus,
//   ShoppingCart,
// } from "lucide-react";
// import { getItem, sendToAi } from "../../services/user";
// import type { GetMenuItemsResponse } from "../../types/Items";
// import { useNavigate } from "react-router-dom";
// import { AddToCart } from "../../services/cart";
// import type { RootState } from "../../redux/store/store";
// import { useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { showErrorToast } from "../../Components/Elements/ErrorToast";
// import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// import { ToastContainer } from "react-toastify";
// const ItemDetailPage: React.FC = () => {
//   const { itemId } = useParams<{ itemId: string }>();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [aiDescription, setAiDescription] = useState<string>("");
//   const [loadingNutrition, setLoadingNutrition] = useState(true);
//   const [nutrition, setNutrition] = useState({
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fat: 0,
//   });
//   const [searchParams] = useSearchParams();
//   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const { restaurantId } = useParams<{ restaurantId: string }>();
//   const table = searchParams.get("tableId");
//   const navigate = useNavigate();
//   const { data, isLoading } = useQuery<GetMenuItemsResponse>({
//     queryKey: ["item", itemId],
//     queryFn: () => getItem(itemId as string),
//     enabled: !!itemId,
//   });

//   const item = data?.data.data;
//   const images = item?.images ?? [];

//   // Image carousel
//   useEffect(() => {
//     if (!images.length) return;
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) =>
//         prev === images.length - 1 ? 0 : prev + 1
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   useEffect(() => {
//     if (images.length > 0) setCurrentImageIndex(0);
//   }, [images]);

//   // Fetch AI description + nutrition
//   useEffect(() => {
//     const fetchDescriptionAndNutrition = async () => {
//       if (!item?.name) return;
//       setLoadingNutrition(true);

//       try {
//         const res =
//           await sendToAi(`Give me a JSON with description and nutritional info (Calories, Protein in g, Carbs in g, Fat in g) for ${item.name}.
// Example format:
// {
//   "description": "...",
//   "calories": 520,
//   "protein": 32,
//   "carbs": 45,
//   "fat": 18
// }`);
//         const jsonMatch = res.reply.match(/\{[\s\S]*\}/);
//         if (!jsonMatch) throw new Error("No JSON found in AI response");

//         const data = JSON.parse(jsonMatch[0]);

//         setAiDescription(data.description);
//         setNutrition({
//           calories: data.calories,
//           protein: data.protein,
//           carbs: data.carbs,
//           fat: data.fat,
//         });
//       } catch (error) {
//         console.error("Error parsing AI response:", error);
//       } finally {
//         setLoadingNutrition(false);
//       }
//     };

//     fetchDescriptionAndNutrition();
//   }, [item]);

//   if (isLoading || !item) {
//     return <div className="text-center py-20">Loading item...</div>;
//   }

//   async function handleAddToCart(id: string) {
//     try {
//       if (userId && restaurantId && table) {
//         const res = await AddToCart(
//           userId,
//           restaurantId,
//           id,
//           table,
//           quantity.toString()
//         );
//         if (res.success) {
//           showSuccessToast("Added to Cart Successfully");
//           navigate(`/user/${restaurantId}/cart`);
//         }
//       } else {
//         showErrorToast("userId or restaurentId or tableId is not found");
//       }
//     } catch (error) {
//       return;
//     }
//   }

//   const handleQuantityDecrease = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };
//   const handleQuantityIncrease = () => setQuantity(quantity + 1);
//   const totalPrice = item.price * quantity;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
//       <ToastContainer />
//       {/* Header */}
//       <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-orange-100">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-2 -ml-2 hover:bg-orange-50 rounded-full transition"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-700" />
//           </button>
//           <h1 className="ml-2 text-lg font-semibold text-gray-900">
//             Item Details
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Image Gallery */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
//           <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-100">
//             <img
//               src={images[currentImageIndex]}
//               alt={item?.name}
//               className="w-full h-full object-cover"
//             />
//             {item?.isStock ? (
//               <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                 In Stock
//               </div>
//             ) : (
//               <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                 Out of Stock
//               </div>
//             )}
//           </div>
//           {/* Thumbnails */}
//           <div className="flex gap-3 p-4 overflow-x-auto">
//             {images.map((image, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
//                   currentImageIndex === index
//                     ? "border-orange-500 shadow-lg scale-105"
//                     : "border-gray-200 hover:border-orange-300"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={`${item.name} ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Item Details */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex items-start justify-between mb-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 {item?.name}
//               </h2>
//               <div className="flex items-center gap-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>{item?.preparationTime} mins</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   <span>4.5 (120+ ratings)</span>
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-3xl font-bold text-orange-600">
//                 ₹{item?.price}
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="border-t border-gray-100 pt-4 mb-4">
//             <h3 className="font-bold text-gray-900 mb-3 text-lg">
//               Description
//             </h3>
//             {aiDescription ? (
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {aiDescription}
//               </p>
//             ) : (
//               <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
//             )}
//           </div>

//           {/* Nutritional Info */}
//           <div className="border-t border-gray-100 pt-4">
//             <h3 className="font-bold text-gray-900 mb-4 text-lg">
//               Nutritional Info
//             </h3>
//             <div className="grid grid-cols-4 gap-3 text-center">
//               {["calories", "protein", "carbs", "fat"].map((key) => (
//                 <div
//                   key={key}
//                   className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100"
//                 >
//                   <div className="text-xl font-bold text-orange-600 h-7">
//                     {loadingNutrition ? (
//                       <div className="h-7 w-12 mx-auto bg-gray-200 rounded animate-pulse"></div>
//                     ) : key === "calories" ? (
//                       nutrition.calories
//                     ) : key === "protein" ? (
//                       `${nutrition.protein}g`
//                     ) : key === "carbs" ? (
//                       `${nutrition.carbs}g`
//                     ) : (
//                       `${nutrition.fat}g`
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-600 capitalize mt-1">
//                     {key === "calories"
//                       ? "Calories"
//                       : key.charAt(0).toUpperCase() + key.slice(1)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Add to Cart Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex items-center justify-between mb-6">
//             <span className="text-gray-700 font-semibold text-lg">
//               Quantity
//             </span>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleQuantityDecrease}
//                 disabled={quantity <= 1}
//                 className="w-12 h-12 rounded-full border-2 border-orange-200 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Minus className="w-5 h-5" />
//               </button>
//               <span className="text-2xl font-bold w-12 text-center text-gray-900">
//                 {quantity}
//               </span>
//               <button
//                 onClick={handleQuantityIncrease}
//                 className="w-12 h-12 rounded-full border-2 border-orange-200 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all"
//               >
//                 <Plus className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-6 border-t border-gray-100 mb-6">
//             <span className="text-gray-700 font-semibold text-lg">
//               Total Price
//             </span>
//             <span className="text-3xl font-bold text-orange-600">
//               ₹{totalPrice.toFixed(2)}
//             </span>
//           </div>

//           <button
//             onClick={() => handleAddToCart(item._id)}
//             disabled={!item?.isStock}
//             className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
//               item?.isStock
//                 ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-xl transform hover:scale-[1.02]"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             <ShoppingCart className="w-5 h-5" />
//             {item?.isStock ? "Add to Cart" : "Out of Stock"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetailPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Clock,
  Star,
  Plus,
  Minus,
  Share2,
  Heart,
} from "lucide-react";
import { getItem, sendToAi } from "../../services/user";
import type { GetMenuItemsResponse } from "../../types/Items";
import { AddToCart } from "../../services/cart";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import { ToastContainer } from "react-toastify";

const ItemDetailPage: React.FC = () => {
  const { itemId, restaurantId } = useParams<{
    itemId: string;
    restaurantId: string;
  }>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [loadingNutrition, setLoadingNutrition] = useState(true);
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [searchParams] = useSearchParams();
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const table = searchParams.get("tableId");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<GetMenuItemsResponse>({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId as string),
    enabled: !!itemId,
  });

  const item = data?.data.data;
  const images = item?.images ?? [];

  // Carousel Logic
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // AI Description Fetching
  useEffect(() => {
    const fetchDescriptionAndNutrition = async () => {
      if (!item?.name) return;
      setLoadingNutrition(true);
      try {
        const res = await sendToAi(`Give me a JSON with description and nutritional info (Calories, Protein in g, Carbs in g, Fat in g) for ${item.name}.
Example format:
{
  "description": "...",
  "calories": 520,
  "protein": 32,
  "carbs": 45,
  "fat": 18
}`);
        const jsonMatch = res.reply.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        const data = JSON.parse(jsonMatch[0]);
        setAiDescription(data.description);
        setNutrition({
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingNutrition(false);
      }
    };
    fetchDescriptionAndNutrition();
  }, [item]);

  const handleAddToCart = async () => {
    try {
      if (userId && restaurantId && table && item?._id) {
        const res = await AddToCart(
          userId,
          restaurantId,
          item._id,
          table,
          quantity.toString()
        );
        if (res.success) {
          showSuccessToast("Added to Cart Successfully");
          navigate(-1);
        }
      } else {
        showErrorToast("Session expired. Please rescan QR.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const totalPrice = item.price * quantity;

  return (
    <div className="min-h-screen bg-white pb-32">
      <ToastContainer />

      {/* Hero Image Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-100">
        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image */}
        <img
          src={images[currentImageIndex] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto -mt-10 relative z-10 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          {/* Header Info */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight flex-1 mr-4">
              {item.name}
            </h1>
            <div className="bg-green-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-green-100">
              <Star className="w-4 h-4 fill-green-500 text-green-500" />
              <span className="text-sm font-bold text-green-700">4.5</span>
            </div>
          </div>

          {/* Price & Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-orange-600">₹{item.price}</span>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>{item.preparationTime || "15-20"} min</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-gray-900 font-bold mb-2">Description</h3>
            {aiDescription ? (
              <p className="text-gray-600 text-sm leading-relaxed">{aiDescription}</p>
            ) : (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              </div>
            )}
          </div>

          {/* Nutrition Cards */}
          <div>
            <h3 className="text-gray-900 font-bold mb-3">Nutrition (approx.)</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { k: 'cal', l: 'Calories', v: nutrition.calories, u: 'kcal' },
                { k: 'pro', l: 'Protein', v: nutrition.protein, u: 'g' },
                { k: 'fat', l: 'Fat', v: nutrition.fat, u: 'g' },
                { k: 'car', l: 'Carbs', v: nutrition.carbs, u: 'g' }
              ].map((n, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                  <div className="text-orange-600 font-bold text-lg">
                    {loadingNutrition ? "-" : n.v}
                    <span className="text-xs font-normal text-gray-400 ml-0.5">{n.u}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">{n.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 md:px-8 z-50 rounded-t-3xl md:rounded-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Quantity Counter */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 hover:text-orange-600 active:scale-95 transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 hover:text-orange-600 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={!item.isStock}
            className={`flex-1 flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-95 ${item.isStock ? "bg-gradient-to-r from-orange-500 to-amber-500" : "bg-gray-300 cursor-not-allowed shadow-none"
              }`}
          >
            <span>{item.isStock ? "Add to Cart" : "Out of Stock"}</span>
            <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;

