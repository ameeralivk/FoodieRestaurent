// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import Navbar from "../../../Components/Layouts/userLayouts/Navbar";
// import { Box } from "@mui/material";
// import { useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { getAllRestaurent } from "../../../services/superAdmin";
// import Pagination from "../../../Components/Elements/Reusable/Pagination";
// import { useNavigate } from "react-router-dom";
// import jsQR from "jsqr";
// import { RestaurantCard } from "../../../Components/user/reservationCard";
// import { ToastContainer } from "react-toastify";
// const UserLandingPage: React.FC = () => {
//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });
//   const [loating, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [restaurants, setRestaurants] = useState<any[]>([]);
//   const [total, setTotal] = useState(10);
//   const limit = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllRestaurent(false, page, limit, searchTerm);
//         if (response && response.success) {
//           await new Promise((res) => setTimeout(res, 300));
//           setRestaurants(response.data);
//           setTotal(response.pagination.totalPages);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [searchTerm, page]);

//   const handlePageChange = (page: number) => {
//     setPage(page);
//   };

//   const handleFileUpload = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];

//     // Convert file to ImageData
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");

//       if (!ctx) return;

//       ctx.drawImage(img, 0, 0, img.width, img.height);
//       const imageData = ctx.getImageData(0, 0, img.width, img.height);

//       const code = jsQR(imageData.data, imageData.width, imageData.height);

//       if (code) {
//         // code.data contains the URL from QR
//         navigate(new URL(code.data).pathname + new URL(code.data).search);
//       } else {
//         alert("No QR code detected");
//       }
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Navbar />
//       <ToastContainer />
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">
//             Welcome back, Sarah 👋
//           </h2>

//           {/* Scan QR Button */}
//           <div className="flex flex-col">
//             <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-6 inline-block">
//               Scan QR to Enter
//             </button>
//             <Button
//               className="h-12 rounded-lg"
//               component="label"
//               role={undefined}
//               variant="contained"
//               tabIndex={-1}
//               startIcon={<CloudUploadIcon />}
//             >
//               Upload files
//               <VisuallyHiddenInput
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(event) => handleFileUpload(event.target.files)}
//                 multiple={false}
//               />
//             </Button>
//           </div>

//           {/* Search Bar */}
//           <div className="max-w-7xl mx-auto mt-5">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(1);
//                 }}
//                 type="text"
//                 placeholder="Search for a restaurant..."
//                 className="w-full pl-12 pr-4 py-3 bg-orange-50 border border-orange-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
//               />
//             </div>
//           </div>
//         </div>
//         {/* Nearby Restaurants Section */}
//         <div className="mt-12">
//           <h3 className="text-2xl font-bold text-gray-900 mb-6">
//             Nearby Restaurants
//           </h3>

//           {/* Restaurant Grid */}
//           <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {restaurants.map((restaurant) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//               >
//                 {/* Restaurant Card with overlay */}
//                 <RestaurantCard
//                   image={restaurant.restaurantPhoto}
//                   title={restaurant.restaurantName}
//                   width="100%" // full width of parent card
//                 />

//                 {/* Restaurant Info */}
//                 <div className="p-4">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-1">
//                     {restaurant.restaurantName}
//                   </h4>
//                   <p className="text-sm text-gray-500">{restaurant.distance}</p>
//                 </div>
//               </div>
//             ))}
//           </Box>
//         </div>
//         <Pagination
//           currentPage={page}
//           totalPages={total}
//           onPageChange={handlePageChange}
//         />
//       </main>
//     </div>
//   );
// };

// export default UserLandingPage;

import React, { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../../Components/Layouts/userLayouts/Navbar";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { getDistanceInKm } from "../../../Components/Helpers/user/Location";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  RestaurantDetailsModal,
  type Restaurant,
} from "../../../Components/modals/user/UserRestauarentDetailModal";
import { getAllRestaurent } from "../../../services/superAdmin";
import TableNumberModal from "../../../Components/Component/user/TableModal";
import Pagination from "../../../Components/Elements/Reusable/Pagination";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { getUserLocation } from "../../../Components/Helpers/user/Location";
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
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [total, setTotal] = useState(10);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLocation) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllRestaurent(false, page, limit, searchTerm);
        if (response && response.success) {
          await new Promise((res) => setTimeout(res, 300));

          const updatedRestaurants = response.data.map((restaurant: any) => {
            if (!restaurant.location?.coordinates) return restaurant;
            const [lng, lat] = restaurant.location.coordinates;
            const distance = getDistanceInKm(
              userLocation.latitude,
              userLocation.longitude,
              lat,
              lng
            );
            return { ...restaurant, distance: `${distance.toFixed(1)} km` };
          });

          setRestaurants(updatedRestaurants);
          setTotal(response.pagination.totalPages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation, page, searchTerm]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    getUserLocation()
      .then((loc) => {
        setUserLocation(loc);
      })
      .catch(() => alert("Location permission denied"));
  }, []);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
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
  console.log(restaurants, "hi");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <Navbar />
      <ToastContainer />
      <RestaurantDetailsModal
        restaurant={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Welcome back! 👋
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Discover amazing restaurants and order your favorite meals
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    handleFileUpload(files);
                  };
                  input.click();
                }}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Scan QR Code
              </button>
              <Button
                className="h-14 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "#ea580c",
                  "&:hover": {
                    backgroundColor: "#fff7ed",
                  },
                }}
              >
                Upload QR Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(event) => handleFileUpload(event.target.files)}
                  multiple={false}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-orange-400" />
            </div>
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 text-gray-800 placeholder-gray-400 text-lg shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Nearby Restaurants Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Discover Restaurants
              </h2>
              <p className="text-gray-600">
                Find your next favorite dining experience
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loating && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          )}

          {/* Restaurant Grid */}
          {!loating && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl">No restaurants found</p>
                    <p className="text-sm mt-2">
                      Try adjusting your search terms
                    </p>
                  </div>
                </div>
              ) : (
                restaurants.map((restaurant) => {
                  // Generate random data for demo (you can replace with actual data from API)
                  const rating = (Math.random() * 2 + 3.5).toFixed(1); // 3.5-5.5 rating
                  const priceRange = Math.floor(Math.random() * 3 + 1); // 1-3 dollar signs

                  return (
                    <div
                      onClick={()=>handleRestaurantClick(restaurant)}
                      key={restaurant.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                    >
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            restaurant.restaurantPhoto ||
                            "/placeholder-restaurant.jpg"
                          }
                          alt={restaurant.restaurantName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle favorite logic here
                          }}
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                          aria-label="Add to favorites"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Restaurant Info */}
                      <div className="p-5">
                        {/* Restaurant Name */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 flex-1">
                            {restaurant.restaurantName}
                          </h3>
                        </div>

                        {/* Rating and Delivery Time */}
                        {/* <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="ml-1 text-sm font-semibold text-gray-900">
                                {rating}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                ({Math.floor(Math.random() * 200 + 50)})
                              </span>
                            </div>
                          </div>
                        </div> */}

                        {/* Distance and Location */}
                        {restaurant.distance && (
                          <div className="flex items-center text-gray-500 text-xs mb-3">
                            <svg
                              className="w-3.5 h-3.5 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {restaurant.distance}
                          </div>
                        )}

                        {/* Opening Hours */}
                        {restaurant.openingTime && restaurant.closingTime && (
                          <div className="flex items-center text-gray-500 text-xs mb-3">
                            <svg
                              className="w-3.5 h-3.5 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>
                              {restaurant.openingTime} -{" "}
                              {restaurant.closingTime}
                            </span>
                          </div>
                        )}

                        {/* Action Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRestaurantId(restaurant._id);
                            setIsTableModalOpen(true);
                          }}
                          className="w-full mt-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <span>View Menu</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loating && restaurants.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={total}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <TableNumberModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          restaurantId={selectedRestaurantId}
        />
      </main>
    </div>
  );
};

export default UserLandingPage;
