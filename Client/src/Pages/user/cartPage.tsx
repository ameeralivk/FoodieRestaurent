// // import { act, useState } from "react";
// // import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// // import CartItemCard from "../../Components/Component/user/cartItemCart";
// // import type { CartItem, ResponseCart } from "../../types/cart";
// // import { useQueryClient } from "@tanstack/react-query";
// // import { useSelector } from "react-redux";
// // import { useQuery } from "@tanstack/react-query";
// // import type { RootState } from "../../redux/store/store";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useEffect } from "react";
// // import { CartUpdate, deleteCart, getCart } from "../../services/cart";
// // import { ToastContainer } from "react-toastify";
// // import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// // import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
// // import EmptyCart from "../../Components/Component/user/EmptyCart";
// // import BottomNavBar from "../../Components/user/DownBar";

// // const CartPage = () => {
// //   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
// //   const { restaurantId } = useParams<{ restaurantId: string }>();
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
// //   const queryClient = useQueryClient();
// //   const Navigate = useNavigate()
// //   const tableNo = useSelector(
// //     (state: RootState) => state.userAuth.user?.tableNo
// //   );
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

// //   const updateQuantity = async (id: string, change: number) => {
// //     const item = cartData?.cart.items.filter((i) => i.itemId == id);
// //     if (item?.length) {
// //       if (item[0]?.quantity === 1 && change == -1) {
// //         return;
// //       }
// //     }
// //     try {
// //       let action: "inc" | "dec" = "dec";
// //       if (change === 1) {
// //         action = "inc";
// //       } else {
// //         action = "dec";
// //       }
// //       if (cartData) {
// //         const result = await CartUpdate(
// //           cartData?.cart?._id,
// //           restaurantId as string,
// //           id,
// //           action
// //         );
// //         if (result.success) {
// //           showSuccessToast(result.message);
// //           queryClient.invalidateQueries({
// //             queryKey: ["ItemsList"],
// //           });
// //         }
// //       }
// //     } catch (error: any) {
// //       return;
// //     }
// //   };

// //   const removeItem = async (id: string) => {
// //     const confirmed = await showConfirm(
// //       "Remove this Item?",
// //       `Are you sure you want to remove ?`,
// //       "Delete",
// //       "Cancel"
// //     );
// //     if (!confirmed) return;
// //     setCartItems((items) => items.filter((item) => item.itemId !== id));
// //     try {
// //       const result = await deleteCart(
// //         cartData?.cart._id as string,
// //         restaurantId as string,
// //         id
// //       );
// //       if (result.success) {
// //         showSuccessToast("item deleted");
// //       }
// //     } catch (error) {
// //       return;
// //     }
// //   };

// //   const subtotal = cartItems
// //     ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
// //     : 0;

// //   const discount = 0;
// //   const total = subtotal - discount;
// //   return (
// //     <div>
// //       <Navbar />
// //       <ToastContainer />
// //       <div className="min-h-screen bg-gray-50 p-6">
// //         <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-sm p-8">
// //           <h1 className="text-3xl font-bold mb-8">Your Order</h1>

// //           {cartItems?.length === 0 ? (
// //             <EmptyCart />
// //           ) : (
// //             <>
// //               <div className="space-y-6 mb-8">
// //                 {cartItems?.map((item) => (
// //                   <CartItemCard
// //                     key={item._id}
// //                     item={item}
// //                     onUpdateQuantity={updateQuantity}
// //                     onRemove={removeItem}
// //                   />
// //                 ))}
// //               </div>

// //               <div className="border-t pt-6">
// //                 <h2 className="text-xl font-bold mb-6">Order Summary</h2>

// //                 <div className="space-y-3 mb-6">
// //                   <div className="flex justify-between text-gray-600">
// //                     <span>Subtotal</span>
// //                     <span>₹{subtotal.toFixed(2)}</span>
// //                   </div>
// //                   {/* <div className="flex justify-between text-gray-600">
// //                 <span>Discount</span>
// //                 <span>₹{discount.toFixed(2)}</span>
// //               </div> */}
// //                   <div className="flex justify-between text-lg font-bold pt-3 border-t">
// //                     <span>Total</span>
// //                     <span>₹{total}</span>
// //                   </div>
// //                 </div>

// //                 <button onClick={()=>Navigate("/user/checkout")} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-colors">
// //                   Place Order
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       <BottomNavBar
// //         defaultActive="cart"
// //         restaurantId={restaurantId}
// //         tableNo={tableNo}
// //       />
// //     </div>
// //   );
// // };

// // export default CartPage;

// import { useState } from "react";
// import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// import CartItemCard from "../../Components/Component/user/cartItemCart";
// import type { CartItem, ResponseCart } from "../../types/cart";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
// import type { RootState } from "../../redux/store/store";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { CartUpdate, deleteCart, getCart } from "../../services/cart";
// import { ToastContainer } from "react-toastify";
// import { showSuccessToast } from "../../Components/Elements/SuccessToast";
// import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
// import EmptyCart from "../../Components/Component/user/EmptyCart";
// import BottomNavBar from "../../Components/user/DownBar";

// const CartPage = () => {
//   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const { restaurantId } = useParams<{ restaurantId: string }>();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const queryClient = useQueryClient();
//   const Navigate = useNavigate();
//   const tableNo = useSelector(
//     (state: RootState) => state.userAuth.user?.tableNo
//   );
//   const { data: cartData } = useQuery<ResponseCart, Error>({
//     queryKey: ["ItemsList"],
//     queryFn: () => getCart(userId as string, restaurantId as string),
//   });
//   useEffect(() => {
//     setCartItems(cartData?.cart?.items ?? []);
//   }, [cartData]);

//   const updateQuantity = async (id: string, change: number) => {
//     const item = cartData?.cart.items.filter((i) => i.itemId == id);
//     if (item?.length) {
//       if (item[0]?.quantity === 1 && change == -1) {
//         return;
//       }
//     }
//     try {
//       let action: "inc" | "dec" = "dec";
//       if (change === 1) {
//         action = "inc";
//       } else {
//         action = "dec";
//       }
//       if (cartData) {
//         const result = await CartUpdate(
//           cartData?.cart?._id,
//           restaurantId as string,
//           id,
//           action
//         );
//         if (result.success) {
//           showSuccessToast(result.message);
//           queryClient.invalidateQueries({
//             queryKey: ["ItemsList"],
//           });
//         }
//       }
//     } catch (error: any) {
//       return;
//     }
//   };

//   const removeItem = async (id: string) => {
//     const confirmed = await showConfirm(
//       "Remove this Item?",
//       `Are you sure you want to remove ?`,
//       "Delete",
//       "Cancel"
//     );
//     if (!confirmed) return;
//     setCartItems((items) => items.filter((item) => item.itemId !== id));
//     try {
//       const result = await deleteCart(
//         cartData?.cart._id as string,
//         restaurantId as string,
//         id
//       );
//       if (result.success) {
//         showSuccessToast("item deleted");
//       }
//     } catch (error) {
//       return;
//     }
//   };

//   const subtotal = cartItems
//     ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     : 0;

//   const discount = 0;
//   const total = subtotal - discount;
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
//       <Navbar />
//       <ToastContainer />
//       <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
//           <p className="text-gray-600">
//             {cartItems?.length || 0}{" "}
//             {cartItems?.length === 1 ? "item" : "items"} in your cart
//           </p>
//         </div>

//         {cartItems?.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12">
//             <EmptyCart />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {cartItems?.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <CartItemCard
//                     item={item}
//                     onUpdateQuantity={updateQuantity}
//                     onRemove={removeItem}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span className="font-semibold">
//                       ₹{subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Tax & Charges</span>
//                     <span className="font-semibold">₹0.00</span>
//                   </div>
//                   <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
//                     <span>Total</span>
//                     <span className="text-orange-600">₹{total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => Navigate("/user/checkout")}
//                   className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <BottomNavBar
//         defaultActive="cart"
//         restaurantId={restaurantId}
//         tableNo={tableNo}
//       />
//     </div>
//   );
// };

// export default CartPage;

import { useState, useEffect } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import CartItemCard from "../../Components/Component/user/cartItemCart";
import type { CartItem, ResponseCart } from "../../types/cart";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { useNavigate, useParams } from "react-router-dom";
import { CartUpdate, deleteCart, getCart } from "../../services/cart";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
import EmptyCart from "../../Components/Component/user/EmptyCart";
import BottomNavBar from "../../Components/user/DownBar";
import { ShoppingBag, ArrowRight } from "lucide-react";

const CartPage = () => {
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const queryClient = useQueryClient();
  const Navigate = useNavigate();
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );

  const { data: cartData, isLoading } = useQuery<ResponseCart, Error>({
    queryKey: ["ItemsList", userId, restaurantId],
    queryFn: () => getCart(userId as string, restaurantId as string),
    enabled: !!userId && !!restaurantId
  });

  useEffect(() => {
    setCartItems(cartData?.cart?.items ?? []);
  }, [cartData]);

  const updateQuantity = async (id: string, change: number) => {
    const item = cartData?.cart.items.find((i) => i.itemId === id);
    if (!item || (item.quantity === 1 && change === -1)) return;

    try {
      const action = change === 1 ? "inc" : "dec";
      if (cartData?.cart?._id) {
        // Optimistic update
        setCartItems(prev => prev.map(i => i.itemId === id ? { ...i, quantity: i.quantity + change } : i));

        const result = await CartUpdate(
          cartData.cart._id,
          restaurantId as string,
          id,
          action
        );

        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["ItemsList"] });
        } else {
          // Revert update if failed
          setCartItems(cartData?.cart?.items ?? []);
        }
      }
    } catch (error) {
      setCartItems(cartData?.cart?.items ?? []);
    }
  };

  const removeItem = async (id: string) => {
    const confirmed = await showConfirm(
      "Remove Item?",
      "Are you sure you want to remove this item from your cart?",
      "Remove",
      "Keep"
    );
    if (!confirmed) return;

    // Optimistic update
    setCartItems((items) => items.filter((item) => item.itemId !== id));

    try {
      if (cartData?.cart?._id) {
        const result = await deleteCart(
          cartData.cart._id,
          restaurantId as string,
          id
        );
        if (result.success) {
          showSuccessToast("Item removed");
          queryClient.invalidateQueries({ queryKey: ["ItemsList"] });
        }
      }
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ["ItemsList"] });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  if (isLoading && !cartData) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar restaurantName="Foodie Restaurant" />
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-100 p-3 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
            <p className="text-gray-500 text-sm">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to order
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
            <EmptyCart />
            <p className="text-gray-500 mt-4 mb-8">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => Navigate(-1)}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <CartItemCard
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Charges</span>
                    <span className="text-green-600 text-sm font-medium">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-orange-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => Navigate("/user/checkout")}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                  Secure checkout provided by Foodie
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavBar
        defaultActive="cart"
        restaurantId={restaurantId}
        tableNo={tableNo}
      />
    </div>
  );
};

export default CartPage;

