
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Clock, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { getItem, sendToAi } from "../../services/user";
import type { GetMenuItemsResponse } from "../../types/Items";
import { useNavigate } from "react-router-dom";
const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [loadingNutrition, setLoadingNutrition] = useState(true);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
   const navigate = useNavigate();
  const { data, isLoading } = useQuery<GetMenuItemsResponse>({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId as string),
    enabled: !!itemId,
  });

  const item = data?.data.data;
  const images = item?.images ?? [];

  // Image carousel
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0) setCurrentImageIndex(0);
  }, [images]);

  // Fetch AI description + nutrition
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
        if (!jsonMatch) throw new Error("No JSON found in AI response");

        const data = JSON.parse(jsonMatch[0]);

        setAiDescription(data.description);
        setNutrition({
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
        });
      } catch (error) {
        console.error("Error parsing AI response:", error);
      } finally {
        setLoadingNutrition(false);
      }
    };

    fetchDescriptionAndNutrition();
  }, [item]);

  if (isLoading || !item) {
    return <div className="text-center py-20">Loading item...</div>;
  }

  const handleQuantityDecrease = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleQuantityIncrease = () => setQuantity(quantity + 1);
  const totalPrice = item.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-8xl mx-auto px-4 py-4 flex items-center">
          <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft onClick={()=>navigate(-1)} className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-lg font-semibold">Item Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="relative aspect-[4/2] bg-gray-100">
            <img src={images[currentImageIndex]} alt={item?.name} className="w-full h-full object-cover" />
            {item?.isStock && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                In Stock
              </div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 p-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  currentImageIndex === index ? "border-red-500" : "border-gray-200"
                }`}
              >
                <img src={image} alt={`${item.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{item?.name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item?.preparationTime} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.5 (120+ ratings)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹{item?.price}</div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            {aiDescription ? (
              <p className="text-gray-600 text-sm leading-relaxed">{aiDescription}</p>
            ) : (
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>

          {/* Nutritional Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Nutritional Info</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {["calories", "protein", "carbs", "fat"].map((key) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900 h-6">
                    {loadingNutrition ? (
                      <div className="h-6 w-12 mx-auto bg-gray-200 rounded animate-pulse"></div>
                    ) : key === "calories" ? (
                      nutrition.calories
                    ) : key === "protein" ? (
                      `${nutrition.protein}g`
                    ) : key === "carbs" ? (
                      `${nutrition.carbs}g`
                    ) : (
                      `${nutrition.fat}g`
                    )}
                  </div>
                  <div className="text-xs text-gray-600 capitalize">
                    {key === "calories" ? "Calories" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 font-medium">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={handleQuantityDecrease}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={handleQuantityIncrease}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t mb-4">
            <span className="text-gray-700 font-medium">Total Price</span>
            <span className="text-2xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-red-500/30">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;

