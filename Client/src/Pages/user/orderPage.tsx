import React, { useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/order";
import type { IPaginatedOrdersResponse, IUserOrder } from "../../types/order";

const OrderHistory: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );
  const UserId = useSelector((state: RootState) => state.userAuth.user?._id);

  const { data, isLoading } = useQuery<IPaginatedOrdersResponse>({
    queryKey: ["orders", restaurantId, UserId, 1, 10, ""],
    queryFn: () =>
      getAllOrders(restaurantId as string, UserId as string, 1, 10, ""),
  });

  console.log(data, "data is here");

  const handleOrderClick = (
    orderId: string,
    status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED"
  ) => {
    if (status === "FAILED") {
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    }
  };

  const handleRetryPayment = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    console.log("Retrying payment for order:", orderId);
    // Add your retry payment logic here
  };

  const getStatusButton = (
    status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED"
  ) => {
    switch (status) {
      case "PLACED":
        return (
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
            Track Order
          </button>
        );
      case "PLACED":
        return (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-md">
            Pending
          </span>
        );
      case "FAILED":
        return (
          <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md">
            Failed
          </span>
        );
      case "SERVED":
        return (
          <span className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md">
            Delivered
          </span>
        );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-8xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>

        <div className="space-y-4">
          {data?.data.map((order) => (
            <div key={order._id} className="overflow-hidden">
              <div
                className={`bg-white rounded-lg shadow-sm p-4 flex items-center justify-between transition-all ${
                  order.orderStatus === "FAILED"
                    ? "cursor-pointer hover:shadow-md"
                    : ""
                } ${expandedOrderId === order._id ? "rounded-b-none" : ""}`}
                onClick={() => handleOrderClick(order._id, order.orderStatus)}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Order Icon */}
                  {/* Item Images */}
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.itemImages?.[0]}
                        alt={item.itemName}
                        className="w-14 h-14 rounded-lg border-2 border-white object-cover"
                      />
                    ))}

                    {order.items.length > 3 && (
                      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-semibold border-2 border-white">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-gray-600 mb-1 truncate">
                      {order.items.length} item(s):{" "}
                      {order.items
                        .map((item) => `${item.itemName} × ${item.quantity}`)
                        .join(", ")}
                    </p>

                    <p className="text-sm text-gray-900 font-medium">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  {getStatusButton(order.orderStatus)}
                </div>
              </div>

              {order.orderStatus === "FAILED" &&
                expandedOrderId === order._id && (
                  <div className="bg-pink-100 rounded-b-lg px-4 py-3 flex justify-end">
                    <button
                      onClick={(e) => handleRetryPayment(e, order._id)}
                      className="px-6 py-2 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors"
                    >
                      Retry Payment
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar
        restaurantId={restaurantId}
        tableNo={tableNo}
        defaultActive="Orders"
      />
    </div>
  );
};

export default OrderHistory;
