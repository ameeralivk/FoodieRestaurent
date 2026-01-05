import React, { useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import { useEffect } from "react";
import ItemCard from "../../Components/user/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { getAllItems } from "../../services/ItemsService";
import { useParams, useSearchParams } from "react-router-dom";
import type { IItemResponse } from "../../types/Items";
import DraggableAIChatbot from "../../Components/Component/user/chatBot";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../../services/cart";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import CategorySubCategoryFilter from "../../Components/user/filterComponent";
import { SearchInput } from "../../Components/user/SearchComponent";
import Pagination from "../../Components/Elements/Reusable/Pagination";
import BottomNavBar from "../../Components/user/DownBar";
import { useDispatch } from "react-redux";
import { setRestaurantId, setTableNo } from "../../redux/slice/userSlice";
const UserRestaurantPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sizes, setSizes] = useState<Record<number | string, string>>({});
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
  const { data: ItemsList } = useQuery<IItemResponse, Error>({
    queryKey: ["ItemsList", restaurentId, currentPage, debouncedSearch],
    queryFn: () =>
      getAllItems(restaurantId as string, currentPage, limit, debouncedSearch),
  });
  console.log(ItemsList, "list");
  const handleSizeChange = (id: number | string, size: string) => {
    setSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
      dispatch(setTableNo(table?table:""))
    }
  }, [restaurantId, dispatch]);

  const Items = ItemsList?.data;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (ItemsList?.total) {
      setTotalPages(Math.ceil(ItemsList.total / limit));
    }
  }, [ItemsList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredItems = Items?.filter((item) => {
    // Category filter
    if (
      selectedCategory !== "all" &&
      item.categoryId.name !== selectedCategory
    ) {
      return false;
    }

    // SubCategory filter
    if (
      selectedSubCategory !== "all" &&
      item?.subCategoryId?.name !== selectedSubCategory
    ) {
      return false;
    }

    return true;
  });

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      if (userId && restaurantId && table) {
        const res = await AddToCart(userId, restaurantId, id, table, "1");
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
      <div className="max-w-7xl mx-auto mt-6">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <CategorySubCategoryFilter
        onChange={(category, subCategory) => {
          setSelectedCategory(category);
          setSelectedSubCategory(subCategory);
        }}
      />
      {/* Hero Section */}
      {/* <HeroBanner banners={banners} current={current} onChange={setCurrent} /> */}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Recommended menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cursor-pointer">
          {filteredItems?.map((item) => (
            <ItemCard
              key={item?._id}
              Item={item}
              selectedSize={sizes[item?._id]}
              onSizeChange={handleSizeChange}
              onAddToCart={handleAddToCart}
              onClick={() => {
                navigate(
                  `/user/${restaurantId}/items/${item._id}?tableId=${table}`
                );
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <BottomNavBar restaurantId={restaurantId} tableNo={table?table:""} />
    </div>
  );
};

export default UserRestaurantPage;
