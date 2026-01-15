// import type { CartItem } from "../../../types/cart";

// interface CartItemCardProps {
//   item: CartItem;
//   onUpdateQuantity: (_id: string, change: number) => void;
//   onRemove: (id: string) => void;
// }

// const CartItemCard = ({
//   item,
//   onUpdateQuantity,
//   onRemove,
// }: CartItemCardProps) => {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-4">
//         <div className="w-32 h-16 bg-amber-50 rounded-lg overflow-hidden flex items-center justify-center">
//           <img
//             src={item.images[0]}
//             alt={item.name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div>
//           <h3 className="font-semibold text-lg">{item.name}</h3>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => onUpdateQuantity(item.itemId, -1)}
//             className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
//           >
//             -
//           </button>

//           <span className="w-8 text-center font-medium">{item.quantity}</span>

//           <button
//             onClick={() => onUpdateQuantity(item.itemId, 1)}
//             className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
//           >
//             +
//           </button>
//         </div>

//         <button
//           onClick={() => onRemove(item.itemId)}
//           className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-md font-medium uppercase"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItemCard;

import type { CartItem } from "../../../types/cart";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (_id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="w-32 h-16 bg-amber-50 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>

          {/* PRICE INFO */}
          <p className="text-sm text-gray-500">
            ₹{item.price} × {item.quantity}
          </p>

          <p className="font-semibold text-green-600">
            ₹{item.price * item.quantity}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.itemId, -1)}
            className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
          >
            -
          </button>

          <span className="w-8 text-center font-medium">{item.quantity}</span>

          <button
            onClick={() => onUpdateQuantity(item.itemId, 1)}
            className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(item.itemId)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-md font-medium uppercase"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
