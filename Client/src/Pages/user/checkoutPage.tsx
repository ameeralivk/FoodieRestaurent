// // import React, { useState } from "react";
// // import { CreditCard, Lock, Package } from "lucide-react";
// // import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// // import BottomNavBar from "../../Components/user/DownBar";
// // import { useQuery } from "@tanstack/react-query";
// // import { getCart } from "../../services/cart";
// // import type { RootState } from "../../redux/store/store";
// // import { useSelector } from "react-redux";
// // import { useEffect } from "react";
// // import type { CartItem } from "../../types/cart";
// // import type { ResponseCart } from "../../types/cart";
// // import { orderPayment } from "../../services/order";
// // interface FormData {
// //   email: string;
// //   firstName: string;
// //   lastName: string;
// //   address: string;
// //   city: string;
// //   state: string;
// //   zipCode: string;
// //   cardNumber: string;
// //   cardName: string;
// //   expiryDate: string;
// //   cvv: string;
// // }

// // export default function CheckoutPage() {
// //   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
// //   const restaurantId = useSelector(
// //     (state: RootState) => state.userAuth.user?.restaurantId
// //   );
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
// //   const [formData, setFormData] = useState<FormData>({
// //     email: "",
// //     firstName: "",
// //     lastName: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     cardNumber: "",
// //     cardName: "",
// //     expiryDate: "",
// //     cvv: "",
// //   });

// //   const {
// //     data: cartData,
// //     isLoading: isCartCaLoading,
// //     isFetching: isCartFetching,
// //   } = useQuery<ResponseCart, Error>({
// //     queryKey: ["ItemsList"],
// //     queryFn: () => getCart(userId as string, restaurantId as string),
// //   });
// //   useEffect(() => {
// //     setCartItems(cartData?.cart?.items ?? []);
// //   }, [cartData]);

// //   const subtotal = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );
// //   const total = subtotal;

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async(e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //          const res = await orderPayment(Number(cartData?.cart.totalAmount),restaurantId as string,userId as string,cartData?.cart.items as CartItem[])
// //          if(res.success){
// //              window.location.href = res.data.url;
// //          }
// //     } catch (error) {
// //         return
// //     }
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="min-h-screen bg-white">
// //         <div className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
// //             <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
// //               <Lock className="w-4 h-4" />
// //               <span>Secure checkout</span>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             <div className="lg:col-span-2">
// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div className="bg-white border border-gray-200 rounded-lg p-6">
// //                   <div className="flex items-center mb-4">
// //                     <CreditCard className="w-5 h-5 text-gray-700 mr-2" />
// //                     <h2 className="text-xl font-semibold text-gray-900">
// //                       Payment Information
// //                     </h2>
// //                   </div>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Card Number
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="cardNumber"
// //                         value={formData.cardNumber}
// //                         onChange={handleInputChange}
// //                         placeholder="1234 5678 9012 3456"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">
// //                         Cardholder Name
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="cardName"
// //                         value={formData.cardName}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                         required
// //                       />
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Expiry Date
// //                         </label>
// //                         <input
// //                           type="text"
// //                           name="expiryDate"
// //                           value={formData.expiryDate}
// //                           onChange={handleInputChange}
// //                           placeholder="MM/YY"
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                           required
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           CVV
// //                         </label>
// //                         <input
// //                           type="text"
// //                           name="cvv"
// //                           value={formData.cvv}
// //                           onChange={handleInputChange}
// //                           placeholder="123"
// //                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                           required
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <button
// //                   type="submit"
// //                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
// //                 >
// //                   Place Order
// //                 </button>
// //               </form>
// //             </div>

// //             <div className="lg:col-span-1">
// //               <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
// //                 <div className="flex items-center mb-4">
// //                   <Package className="w-5 h-5 text-gray-700 mr-2" />
// //                   <h2 className="text-xl font-semibold text-gray-900">
// //                     Order Summary
// //                   </h2>
// //                 </div>
// //                 <div className="space-y-4 mb-6">
// //                   {cartItems.map((item) => (
// //                     <div key={item._id} className="flex items-center space-x-4">
// //                       <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
// //                         <img
// //                           src={item.images[0]}
// //                           alt={item.name}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       </div>
// //                       <div className="flex-1">
// //                         <p className="text-sm font-medium text-gray-900">
// //                           {item.name}
// //                         </p>
// //                         <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
// //                           ₹{item.price}
// //                         </span>

// //                         <p className="text-sm text-gray-600">
// //                           Qty: {item.quantity}
// //                         </p>
// //                       </div>
// //                       <p className="text-sm font-semibold text-gray-900">
// //                         ₹{(item.price * item.quantity).toFixed(2)}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="border-t border-gray-200 pt-4 space-y-2">
// //                   <div className="flex justify-between text-sm text-gray-600">
// //                     <span>Subtotal</span>
// //                     <span>₹{subtotal.toFixed(2)}</span>
// //                   </div>
// //                   {/* <div className="flex justify-between text-sm text-gray-600">
// //                     <span>Shipping</span>
// //                     <span>₹{shipping.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-sm text-gray-600">
// //                     <span>Tax</span>
// //                     <span>₹{tax.toFixed(2)}</span>
// //                   </div> */}
// //                   <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
// //                     <span>Total</span>
// //                     <span>₹{total.toFixed(2)}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <BottomNavBar restaurantId={restaurantId} />
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { Package, Lock, ChevronDown, ChevronUp } from "lucide-react";
// import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// import BottomNavBar from "../../Components/user/DownBar";
// import { useQuery } from "@tanstack/react-query";
// import { getCart } from "../../services/cart";
// import type { RootState } from "../../redux/store/store";
// import { useSelector } from "react-redux";
// import type { CartItem, ResponseCart } from "../../types/cart";
// import { orderPayment } from "../../services/order";

// export default function CheckoutPage() {
//   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const restaurantId = useSelector(
//     (state: RootState) => state.userAuth.user?.restaurantId
//   );

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [openSummary, setOpenSummary] = useState(true);
//   const [activeItem, setActiveItem] = useState<string | null>(null);
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);

//   const { data: cartData } = useQuery<ResponseCart, Error>({
//     queryKey: ["ItemsList"],
//     queryFn: () => getCart(userId as string, restaurantId as string),
//   });

//   useEffect(() => {
//     setCartItems(cartData?.cart?.items ?? []);
//   }, [cartData]);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (isPlacingOrder) return;

//     try {
//       setIsPlacingOrder(true);
//       const res = await orderPayment(
//         Number(cartData?.cart.totalAmount),
//         restaurantId as string,
//         userId as string,
//         cartData?.cart.items as CartItem[]
//       );

//       if (res.success) {
//         window.location.href = res.data.url;
//       }
//     } catch (error) {
//       setIsPlacingOrder(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <Navbar />

//       <div className="min-h-screen bg-white px-4 py-6 pb-28">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
//           <div className="mt-2 flex items-center text-sm text-gray-600">
//             <Lock className="w-4 h-4 mr-1" />
//             Secure checkout
//           </div>
//         </div>

//         {/* Order Summary Card */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm transition-all">
//           {/* Summary Header */}
//           <div
//             onClick={() => setOpenSummary(!openSummary)}
//             className="flex items-center justify-between cursor-pointer"
//           >
//             <div className="flex items-center">
//               <Package className="w-5 h-5 text-gray-700 mr-2" />
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Order Summary
//               </h2>
//             </div>
//             {openSummary ? (
//               <ChevronUp className="w-5 h-5 text-gray-500" />
//             ) : (
//               <ChevronDown className="w-5 h-5 text-gray-500" />
//             )}
//           </div>

//           {/* Items */}
//           {openSummary && (
//             <div className="mt-4 space-y-4 animate-fadeIn">
//               {cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   onClick={() =>
//                     setActiveItem(activeItem === item._id ? null : item._id)
//                   }
//                   className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer transition active:bg-gray-100 active:scale-[0.98]"
//                 >
//                   <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
//                     <img
//                       src={item.images[0]}
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Qty: {item.quantity}
//                     </p>

//                     {activeItem === item._id && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         Price per item: ₹{item.price}
//                       </p>
//                     )}
//                   </div>

//                   <p className="text-sm font-semibold text-gray-900">
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Totals */}
//           <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between text-lg font-bold text-gray-900">
//               <span>Total</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Desktop Button */}
//           <button
//             onClick={handlePlaceOrder}
//             disabled={isPlacingOrder}
//             className="hidden sm:block mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 active:scale-95 transition"
//           >
//             {isPlacingOrder ? "Placing Order..." : "Place Order"}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sticky Button */}
//       <div className="fixed bottom-16 left-0 right-0 px-4 sm:hidden">
//         <button
//           onClick={handlePlaceOrder}
//           disabled={isPlacingOrder}
//           className="w-full bg-red-600 text-white py-3 rounded-2xl font-semibold shadow-lg active:scale-95 transition"
//         >
//           {isPlacingOrder
//             ? "Placing Order..."
//             : `Place Order • ₹${subtotal.toFixed(2)}`}
//         </button>
//       </div>

//       <BottomNavBar restaurantId={restaurantId} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Package, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cart";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import type { CartItem, ResponseCart } from "../../types/cart";
import { orderPayment } from "../../services/order";

export default function CheckoutPage() {
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openSummary, setOpenSummary] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { data: cartData } = useQuery<ResponseCart, Error>({
    queryKey: ["ItemsList"],
    queryFn: () => getCart(userId as string, restaurantId as string),
  });

  useEffect(() => {
    setCartItems(cartData?.cart?.items ?? []);
  }, [cartData]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    try {
      setIsPlacingOrder(true);
      const res = await orderPayment(
        Number(cartData?.cart.totalAmount),
        restaurantId as string,
        userId as string,
        cartData?.cart.items as CartItem[]
      );

      if (res.success) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center text-gray-600">
            <Lock className="w-5 h-5 mr-2 text-orange-500" />
            <span>Secure checkout • Your payment is protected</span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-lg transition-all">
          {/* Summary Header */}
          <div
            onClick={() => setOpenSummary(!openSummary)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 text-gray-700 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
            </div>
            {openSummary ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>

          {/* Items */}
          {openSummary && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() =>
                    setActiveItem(activeItem === item._id ? null : item._id)
                  }
                  className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer transition active:bg-gray-100 active:scale-[0.98]"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </p>

                    {activeItem === item._id && (
                      <p className="text-xs text-gray-500 mt-1">
                        Price per item: ₹{item.price}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Desktop Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="hidden sm:block mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isPlacingOrder ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Placing Order...
              </>
            ) : (
              <>Place Order Securely</>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 sm:hidden z-50">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isPlacingOrder ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Placing Order...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Place Order • ₹{subtotal.toFixed(2)}
            </>
          )}
        </button>
      </div>

      <BottomNavBar restaurantId={restaurantId} />
    </div>
  );
}
