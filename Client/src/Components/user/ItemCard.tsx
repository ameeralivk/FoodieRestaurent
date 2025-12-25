import React from "react";
export interface IItem {
  _id: string | number;
  name: string;
  description?: string;
  price: number;
  images: File[];
}

interface PizzaCardProps {
  Item: IItem;
  selectedSize?: string;
  onSizeChange: (id: IItem["_id"], size: string) => void;
  onAddToCart: (pizza: IItem) => void;
}

const ItemCard: React.FC<PizzaCardProps> = ({
  Item,
  selectedSize,
  onSizeChange,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="p-6">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center overflow-hidden">
          <img
            src={
              Item.images[0]
                ? typeof Item.images[0] === "string"
                  ? Item.images[0]
                  : URL.createObjectURL(Item.images[0])
                : "/fallback-image.png"
            }
            alt={Item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {Item.name}
        </h3>

        <p className="text-gray-500 text-sm text-center mb-4">
          {Item.description}
        </p>

        <p className="text-2xl font-bold text-green-600 text-center mb-4">
          ₹{Item.price.toFixed(2)}
        </p>

        <select
          value={selectedSize ?? "Regular"}
          onChange={(e) => onSizeChange(Item._id, e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="Regular">Regular</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button
          onClick={() => onAddToCart(Item)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
