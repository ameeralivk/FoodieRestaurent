
import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { getAllItems } from "../../services/ItemsService";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import type { IItemResponse } from "../../types/Items";
import DraggableAIChatbot from "../../Components/Component/user/chatBot";
import { AddToCart } from "../../services/cart";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import CategorySubCategoryFilter from "../../Components/user/filterComponent";
import BottomNavBar from "../../Components/user/DownBar";
import { setRestaurantId, setTableNo } from "../../redux/slice/userSlice";
import UserPagination from "../../Components/Component/user/userPagination";
import { ToastContainer } from "react-toastify";

const UserRestaurantPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurentId = useSelector((state: RootState) => state.auth.admin?._id);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [totalPages, setTotalPages] = useState(3);
  const [search, setSearch] = useState("");
  const limit = 12;

  // Header scroll effect state
  const [scrolled, setScrolled] = useState(false);

  const { data: ItemsList } = useQuery<IItemResponse, Error>({
    queryKey: ["ItemsList", restaurentId, currentPage, debouncedSearch],
    queryFn: () =>
      getAllItems(restaurantId as string, currentPage, limit, debouncedSearch),
  });

  useEffect(() => {
    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
      dispatch(setTableNo(table ? table : ""));
    }
  }, [restaurantId, dispatch, table]);

  const Items = ItemsList?.data;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (ItemsList?.total) {
      setTotalPages(Math.ceil(ItemsList.total / limit));
    }
  }, [ItemsList]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredItems = Items?.filter((item) => {
    if (selectedCategory !== "all" && item.categoryId.name !== selectedCategory)
      return false;

    if (
      selectedSubCategory !== "all" &&
      item?.subCategoryId?.name !== selectedSubCategory
    )
      return false;

    return true;
  });

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    try {
      if (userId && restaurantId && table) {
        const res = await AddToCart(userId, restaurantId, id, table, "1");
        if (res.success) {
          showSuccessToast("Added to Cart Successfully");
        }
      } else {
        showErrorToast("Session expired or invalid table. Please rescan QR.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="fixed bottom-24 right-4 z-[99]">
        <DraggableAIChatbot />
      </div>
      <ToastContainer />

      <Navbar restaurantName="Foodie Restaurant" />

      {/* Hero Header */}
      <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
          alt="Restaurant Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
            Foodie Restaurant
          </h1>
          <p className="text-gray-200 text-sm md:text-base flex items-center gap-2">
            <span className="bg-orange-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-bold">
              4.8 ★
            </span>
            <span>• Italian, Fast Food • 30-40 min</span>
          </p>
        </div>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div
        className={`sticky top-20 z-30 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-full mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all"
            />
          </div>

          {/* Categories */}
          <div className="overflow-x-auto no-scrollbar pb-1">
            <CategorySubCategoryFilter
              onChange={(category, subCategory) => {
                setSelectedCategory(category);
                setSelectedSubCategory(subCategory);
              }}
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory !== "all"
              ? selectedCategory
              : "Recommended for you"}
          </h2>
        </div>

        {!ItemsList && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems?.map((item) => {
            const imageUrl = item.images?.[0]
              ? typeof item.images[0] === "string"
                ? item.images[0]
                : URL.createObjectURL(item.images[0])
              : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
            const isOutOfStock = !item.isStock || item.stock === 0;

            return (
              <div
                key={item._id}
                onClick={() =>
                  !isOutOfStock &&
                  navigate(
                    `/user/${restaurantId}/items/${item._id}?tableId=${table}`,
                  )
                }
                className={`group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl border border-transparent hover:border-orange-100 transition-all duration-300 cursor-pointer ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {!isOutOfStock && (
                    <button
                      onClick={(e) => handleAddToCart(e, item._id)}
                      className="absolute bottom-2 right-2 bg-white text-orange-600 p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-50"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="flex-shrink-0 font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg text-sm">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 pt-2 text-xs text-gray-400 font-medium border-t border-gray-50 mt-2">
                    {item.categoryId?.name && (
                      <span>• {item.categoryId.name}</span>
                    )}
                    {(item as any).preparationTime && (
                      <span>• {(item as any).preparationTime} min</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems?.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No items found trying a different search.</p>
          </div>
        )}
      </div>

      {filteredItems && filteredItems.length > 0 && (
        <div className="flex justify-center pb-8">
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <BottomNavBar restaurantId={restaurantId} tableNo={table ? table : ""} />
    </div>
  );
};

export default UserRestaurantPage;
