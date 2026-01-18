
import React, { useEffect, useState } from "react";
import { Package, Lock, ChevronDown, ChevronUp, ShieldCheck, CreditCard } from "lucide-react";
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
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-32">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full inline-flex mx-auto">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-semibold text-sm">Secure Payment with SSL</span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden mb-8">
          {/* Summary Header */}
          <div
            onClick={() => setOpenSummary(!openSummary)}
            className="flex items-center justify-between p-6 cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>
            </div>
            {openSummary ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          {/* Items */}
          <div className={`transition-all duration-300 ease-in-out ${openSummary ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="p-6 pt-0 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() =>
                    setActiveItem(activeItem === item._id ? null : item._id)
                  }
                  className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                    <img
                      src={item.images[0] || "/placeholder-food.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Taxes & Fees</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-gray-900 border-t border-gray-200 pt-4">
                <span>Total to Pay</span>
                <span className="text-orange-600">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Preview */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-400" />
            Payment Method
          </h3>
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-500">CARD</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Credit / Debit Card</p>
              <p className="text-xs text-gray-500">Processed securely via Stripe</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-orange-500 bg-orange-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 active:scale-95 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          {isPlacingOrder ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Processing Securely...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ₹{subtotal.toFixed(2)}
            </>
          )}
        </button>
      </div>

      <BottomNavBar restaurantId={restaurantId} />
    </div>
  );
}

