import React from "react";
import { Search } from "lucide-react";
import Navbar from "../../../Components/Layouts/userLayouts/Navbar";
const UserLandingPage: React.FC = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Olive Branch",
      distance: "1.2 km away",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Spice Route",
      distance: "2.5 km away",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "The Cozy Corner",
      distance: "0.8 km away",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome back, Sarah 👋
          </h2>

          {/* Scan QR Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-6 inline-block">
            Scan QR to Enter
          </button>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Restaurant Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Reserve Seat Button */}
                  <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                    Reserve Seat
                  </button>
                </div>

                {/* Restaurant Info */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {restaurant.name}
                  </h4>
                  <p className="text-sm text-gray-500">{restaurant.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLandingPage;
