
import React from "react";
import { Search, MapPin, ArrowUpDown, ChevronDown } from "lucide-react";

interface RestaurantFiltersProps {
  maxDistance: number;
  setMaxDistance: (value: number) => void;

  openNow: boolean;
  setOpenNow: (value: boolean) => void;

  selectedCity: string;
  setSelectedCity: (value: string) => void;

  sortBy: "distance" | "name";
  setSortBy: (value: "distance" | "name") => void;
}

const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({
  maxDistance,
  setMaxDistance,
  openNow,
  setOpenNow,
  selectedCity,
  setSelectedCity,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Search/City Input */}
      <div className="relative w-full md:w-auto md:flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Filter by City"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border-2 border-transparent focus:border-orange-500/20 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 shadow-sm hover:shadow-md transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        {/* Distance Dropdown */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </div>
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="appearance-none bg-white border-2 border-transparent hover:border-orange-100 px-4 py-3 pl-11 pr-10 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-orange-500/10 shadow-sm hover:shadow-md cursor-pointer transition-all"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={30}>30 km</option>
            <option value={50}>50 km</option>
          </select>
          <div className="absolute inset-y-0 right-0 px-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Open Now Chip */}
        <button
          onClick={() => setOpenNow(!openNow)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md ${
            openNow
              ? "bg-green-50 border-green-100 text-green-700"
              : "bg-white border-transparent text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${openNow ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-300"}`}
          />
          Open Now
        </button>

        {/* Sort Dropdown */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ArrowUpDown className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "distance" | "name")}
            className="appearance-none bg-white border-2 border-transparent hover:border-orange-100 px-4 py-3 pl-11 pr-10 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-orange-500/10 shadow-sm hover:shadow-md cursor-pointer transition-all"
          >
            <option value="distance">Nearest First</option>
            <option value="name">Alphabetical</option>
          </select>
          <div className="absolute inset-y-0 right-0 px-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFilters;
