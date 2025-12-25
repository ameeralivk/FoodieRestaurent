import React from "react";

export interface BannerItem {
  title: string;
  description: string;
  emoji: string;
  bg: string;
}

interface HeroBannerProps {
  banners: BannerItem[];
  current: number;
  onChange: (index: number) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  banners,
  current,
  onChange,
}) => {
  const active = banners[current];

  return (
    <>
      {/* HERO */}
      <div className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT */}
            <div
              key={current}
              className="transition-all duration-700 ease-in-out"
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {active.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {active.description}
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition duration-200">
                ORDER NOW
              </button>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-red-100 rounded-full opacity-50" />

              <div className="relative bg-white rounded-full p-8 shadow-xl">
                <div
                  className={`w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br ${active.bg} flex items-center justify-center transition-all duration-700`}
                >
                  <span className="text-8xl animate-pulse">
                    {active.emoji}
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3">
                <span className="text-3xl">🧂</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTOR */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {banners.map((item, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
              ${
                current === index
                  ? "bg-red-600 text-white border-red-600 scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-sm font-medium hidden sm:block">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default HeroBanner;
