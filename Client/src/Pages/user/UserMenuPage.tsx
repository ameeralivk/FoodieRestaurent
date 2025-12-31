import React, { useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import { useEffect } from "react";
import ItemCard from "../../Components/user/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import HeroBanner from "../../Components/user/BannerSection";
import { getAllItems } from "../../services/ItemsService";
import { useParams, useSearchParams } from "react-router-dom";
import type { IItemResponse } from "../../types/Items";
import DraggableAIChatbot from "../../Components/Component/user/chatBot";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../../services/cart";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";

const UserRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const banners = [
    {
      title: "Friday pizza!",
      description: "Time to enjoy our delicious pizza.",
      emoji: "🍕",
      bg: "from-yellow-100 to-orange-100",
    },
    {
      title: "Hot & Spicy!",
      description: "Feel the heat with our special recipes.",
      emoji: "🌶️",
      bg: "from-red-100 to-orange-200",
    },
    {
      title: "Cheese Burst",
      description: "Loaded with extra cheese & love.",
      emoji: "🧀",
      bg: "from-yellow-200 to-yellow-100",
    },
  ];

  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [sizes, setSizes] = useState<Record<number | string, string>>({});
  const restaurentId = useSelector((state: RootState) => state.auth.admin?._id);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const userId = useSelector((state:RootState)=>state.userAuth.user?._id)
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const {
    data: ItemsList,
    isLoading: isItemCaLoading,
    isFetching: isItemFetching,
  } = useQuery<IItemResponse, Error>({
    queryKey: ["ItemsList", restaurentId, currentPage, debouncedSearch],
    queryFn: () =>
      getAllItems(restaurantId as string, currentPage, limit, debouncedSearch),
  });

  const handleSizeChange = (id: number | string, size: string) => {
    setSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
  };

  const Items = ItemsList?.data;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (id: number, value: string) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = async(e:React.MouseEvent<HTMLButtonElement>,id:string) => {
     e.stopPropagation();
    try {
          if (userId && restaurantId && table) {
            const res = await AddToCart(
              userId,
              restaurantId,
              id,
              table,
              "1"
            );
            if (res.success) {
              showSuccessToast("Added to Cart Successfully");
              navigate(`/user/${restaurantId}/cart`);
            }
          } else {
            showErrorToast("userId or restaurentId or tableId is not found");
          }
        } catch (error) {
          return;
        }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed bottom-6 right-6 z-[9999]">
        <DraggableAIChatbot />
      </div>

      <Navbar restaurantName="Foodie Restaurent" />
      {/* Hero Section */}
      <HeroBanner banners={banners} current={current} onChange={setCurrent} />

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Recommended menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cursor-pointer">
          {Items?.map((item) => (
            <ItemCard
              key={item?._id}
              Item={item}
              selectedSize={sizes[item?._id]}
              onSizeChange={handleSizeChange}
              onAddToCart={handleAddToCart}
              onClick={() => {
                navigate(`/user/${restaurantId}/items/${item._id}?tableId=${table}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRestaurantPage;
