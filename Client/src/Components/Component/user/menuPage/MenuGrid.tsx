import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  items: any[];
  restaurantId?: string;
  table?: string | null;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, item: any) => void;
}

const MenuGrid: React.FC<Props> = ({
  items,
  restaurantId,
  table,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map((item) => {
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
            className={`group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl border border-transparent hover:border-orange-100 transition-all duration-300 cursor-pointer ${
              isOutOfStock ? "opacity-60 grayscale" : ""
            }`}
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
                  onClick={(e) => onAddToCart(e, item)}
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
                <span className="font-bold bg-gray-50 px-2 py-1 rounded-lg text-sm">
                  ₹{item.price}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs text-gray-400 border-t mt-2">
                {item.categoryId?.name && <span>• {item.categoryId.name}</span>}
                {(item as any).preparationTime && (
                  <span>• {(item as any).preparationTime} min</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;
