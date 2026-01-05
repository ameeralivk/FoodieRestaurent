import { act, useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import CartItemCard from "../../Components/Component/user/cartItemCart";
import type { CartItem, ResponseCart } from "../../types/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import type { RootState } from "../../redux/store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { CartUpdate, deleteCart, getCart } from "../../services/cart";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
import EmptyCart from "../../Components/Component/user/EmptyCart";
import BottomNavBar from "../../Components/user/DownBar";

const CartPage = () => {
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const queryClient = useQueryClient();
  const Navigate = useNavigate()
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );
  const {
    data: cartData,
    isLoading: isCartCaLoading,
    isFetching: isCartFetching,
  } = useQuery<ResponseCart, Error>({
    queryKey: ["ItemsList"],
    queryFn: () => getCart(userId as string, restaurantId as string),
  });
  useEffect(() => {
    setCartItems(cartData?.cart?.items ?? []);
  }, [cartData]);

  const updateQuantity = async (id: string, change: number) => {
    const item = cartData?.cart.items.filter((i) => i.itemId == id);
    if (item?.length) {
      if (item[0]?.quantity === 1 && change == -1) {
        return;
      }
    }
    try {
      let action: "inc" | "dec" = "dec";
      if (change === 1) {
        action = "inc";
      } else {
        action = "dec";
      }
      if (cartData) {
        const result = await CartUpdate(
          cartData?.cart?._id,
          restaurantId as string,
          id,
          action
        );
        if (result.success) {
          showSuccessToast(result.message);
          queryClient.invalidateQueries({
            queryKey: ["ItemsList"],
          });
        }
      }
    } catch (error: any) {
      return;
    }
  };

  const removeItem = async (id: string) => {
    const confirmed = await showConfirm(
      "Remove this Item?",
      `Are you sure you want to remove ?`,
      "Delete",
      "Cancel"
    );
    if (!confirmed) return;
    setCartItems((items) => items.filter((item) => item.itemId !== id));
    try {
      const result = await deleteCart(
        cartData?.cart._id as string,
        restaurantId as string,
        id
      );
      if (result.success) {
        showSuccessToast("item deleted");
      }
    } catch (error) {
      return;
    }
  };

  const subtotal = cartItems
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const discount = 0;
  const total = subtotal - discount;
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Your Order</h1>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cartItems?.map((item) => (
                  <CartItemCard
                    key={item._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>₹{discount.toFixed(2)}</span>
              </div> */}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button onClick={()=>Navigate("/user/checkout")} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-colors">
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
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
