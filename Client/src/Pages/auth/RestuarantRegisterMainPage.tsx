import { useState } from "react";
import {
  Upload,
  MapPin,
  Clock,
  Phone,
  User,
  FileText,
  Camera,
} from "lucide-react";
import type { RestaurantFormData } from "../../types/AdminTypes";
import StaticMap from "../../Components/Component/RestaurantMainRegistraction/Map";

const RestaurantMainRegistration = () => {
  const [formData, setFormData] = useState<RestaurantFormData>({
    restaurantName: "",
    ownerName: "",
    contactNumber: "",
    address: "",
    openingTime: "",
    closingTime: "",
    proofDocument: null,
    restaurantPhoto: null,
    latitude: "",
    longitude: "",
  });

  const [search, setSearch] = useState("");
  const [position, setPosition] = useState<[number, number]>([11.051, 76.0711]);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await response.json();
      console.log(data,'dat')
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "proofDocument" | "restaurantPhoto"
  ) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  return (
    <>
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-5xl font-bold text-yellow-500 text-center mb-12">
            Restaurant Registration
          </h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-linear-to-b from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 space-y-6">
              {/* Restaurant Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  placeholder="Enter restaurant name"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter owner name"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Restaurant Address */}
              <div>
                <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Restaurant Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete address"
                  rows={4}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className=" bg-linear-to-b from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 space-y-6">
              {/* Opening and Closing Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Opening Time
                  </label>
                  <input
                    type="time"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Closing Time
                  </label>
                  <input
                    type="time"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Restaurant Proof Document */}
              <div>
                <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Restaurant Proof Document
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "proofDocument")}
                    className="hidden"
                    id="proofDocument"
                  />
                  <label
                    htmlFor="proofDocument"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 rounded-lg px-4 py-3 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="truncate">
                      {formData.proofDocument
                        ? formData.proofDocument.name
                        : "Upload Document"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Restaurant Photo */}
              <div>
                <label className=" text-white font-semibold mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Restaurant Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "restaurantPhoto")}
                    className="hidden"
                    id="restaurantPhoto"
                  />
                  <label
                    htmlFor="restaurantPhoto"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 rounded-lg px-4 py-3 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="truncate">
                      {formData.restaurantPhoto
                        ? formData.restaurantPhoto.name
                        : "Upload Photo"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-8"
              >
                Register Restaurant
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  Already have an account? Login
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search location..."
              className="w-full border text-white border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 rounded-md hover:bg-yellow-600 transition"
            >
              Search
            </button>
          </form>
          <div>
            <h1 className="text-white text-2xl p-3">Select Your location</h1>
            <StaticMap
              initialLatitude={position[0]}
              initialLongitude={position[1]}
              zoom={13}
              height="h-80"
              onLocationSelect={(lat, lng) =>
                console.log("Selected:", lat, lng)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantMainRegistration;
