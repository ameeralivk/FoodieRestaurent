import React, { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../../Components/Layouts/userLayouts/Navbar";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getAllRestaurent } from "../../../services/superAdmin";
import Pagination from "../../../Components/Elements/Reusable/Pagination";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { RestaurantCard } from "../../../Components/user/reservationCard";
import { ToastContainer } from "react-toastify";
const UserLandingPage: React.FC = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [loating, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [total, setTotal] = useState(10);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurent(false, page, limit, searchTerm);
        if (response && response.success) {
          await new Promise((res) => setTimeout(res, 300));
          setRestaurants(response.data);
          setTotal(response.pagination.totalPages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Convert file to ImageData
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        // code.data contains the URL from QR
        navigate(new URL(code.data).pathname + new URL(code.data).search);
      } else {
        alert("No QR code detected");
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <ToastContainer />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome back, Sarah 👋
          </h2>

          {/* Scan QR Button */}
          <div className="flex flex-col">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-6 inline-block">
              Scan QR to Enter
            </button>
            <Button
              className="h-12 rounded-lg"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                accept="image/*,application/pdf"
                onChange={(event) => handleFileUpload(event.target.files)}
                multiple={false}
              />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto mt-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search for a restaurant..."
                className="w-full pl-12 pr-4 py-3 bg-orange-50 border border-orange-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        {/* Nearby Restaurants Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Nearby Restaurants
          </h3>

          {/* Restaurant Grid */}
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Restaurant Card with overlay */}
                <RestaurantCard
                  image={restaurant.restaurantPhoto}
                  title={restaurant.restaurantName}
                  width="100%" // full width of parent card
                />

                {/* Restaurant Info */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {restaurant.restaurantName}
                  </h4>
                  <p className="text-sm text-gray-500">{restaurant.distance}</p>
                </div>
              </div>
            ))}
          </Box>
        </div>
        <Pagination
          currentPage={page}
          totalPages={total}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default UserLandingPage;

