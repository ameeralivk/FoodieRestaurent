// import React, { useState } from "react";
// import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// import BottomNavBar from "../../Components/user/DownBar";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store/store";
// import { useQuery } from "@tanstack/react-query";
// import { cancellOrder, getAllOrders } from "../../services/order";
// import type { IPaginatedOrdersResponse, IUserOrder } from "../../types/order";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import UserPagination from "../../Components/Component/user/userPagination";
// import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
// const OrderHistory: React.FC = () => {
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
//   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(3);
//   const limit = 10;
//   const restaurantId = useSelector(
//     (state: RootState) => state.userAuth.user?.restaurantId
//   );
//   const tableNo = useSelector(
//     (state: RootState) => state.userAuth.user?.tableNo
//   );
//   const UserId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const navigator = useNavigate();
//   const { data, isLoading } = useQuery<IPaginatedOrdersResponse>({
//     queryKey: ["orders", restaurantId, UserId, currentPage, limit],
//     queryFn: () =>
//       getAllOrders(
//         restaurantId as string,
//         UserId as string,
//         currentPage,
//         limit,
//         ""
//       ),
//   });
//   const queryClient = useQueryClient();

//   const cancelOrderMutation = useMutation({
//     mutationFn: ({ orderId, userId }: { orderId: string; userId: string }) =>
//       cancellOrder(orderId, userId),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });

//   const handleOrderClick = (
//     orderId: string,
//     status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED"
//   ) => {
//     if (status === "FAILED") {
//       setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//       return;
//     }
//     navigator(`/user/order/${orderId}`);
//   };

//   useEffect(() => {
//     if (data?.total) {
//       setTotalPages(Math.ceil(data.total / limit));
//     }
//   }, [data]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleRetryPayment = (e: React.MouseEvent, orderId: string) => {
//     e.stopPropagation();
//     console.log("Retrying payment for order:", orderId);
//     // Add your retry payment logic here
//   };

//   async function handleCancellButton(
//     e: React.MouseEvent<HTMLButtonElement>,
//     orderId: string
//   ) {
//     e.stopPropagation();
//     try {
//       if (!userId) return;
//       const confirmed = await showConfirm(
//         "Cancel Order?",
//         "This action cannot be undone",
//         "Yes, Cancel",
//         "No"
//       );

//       if (!confirmed) return;

//       cancelOrderMutation.mutate({ orderId, userId });
//     } catch (error) {
//       return;
//     }
//   }

//   const getStatusButton = (
//     status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED",
//     orderId: string
//   ) => {
//     switch (status) {
//       case "PLACED":
//         return (
//           <div className="flex gap-3.5">
//             <button
//               onClick={(e) => handleCancellButton(e, orderId)}
//               className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
//             >
//               Cancell Order
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
//               Track Order
//             </button>
//           </div>
//         );
//       case "PLACED":
//         return (
//           <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-md">
//             Pending
//           </span>
//         );
//       case "FAILED":
//         return (
//           <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md">
//             Failed
//           </span>
//         );
//       case "SERVED":
//         return (
//           <span className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md">
//             Delivered
//           </span>
//         );
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-8xl mx-auto p-6 bg-gray-50 min-h-screen">
//         <div className="w-full flex justify-between">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">
//             Order History
//           </h1>
//         </div>

//         <div className="space-y-4">
//           {data?.data?.map((order) => (
//             <div key={order._id} className="overflow-hidden">
//               <div
//                 className={`bg-white rounded-lg shadow-sm p-4 flex items-center justify-between transition-all ${
//                   order.orderStatus === "FAILED"
//                     ? "cursor-pointer hover:shadow-md"
//                     : ""
//                 } ${expandedOrderId === order._id ? "rounded-b-none" : ""}`}
//                 onClick={() =>
//                   handleOrderClick(order.orderId, order.orderStatus)
//                 }
//               >
//                 <div className="flex items-center gap-4 flex-1">
//                   {/* Order Icon */}
//                   {/* Item Images */}
//                   <div className="flex -space-x-3">
//                     {order.items.slice(0, 3).map((item, index) => (
//                       <img
//                         key={index}
//                         src={item.itemImages?.[0]}
//                         alt={item.itemName}
//                         className="w-14 h-14 rounded-lg border-2 border-white object-cover"
//                       />
//                     ))}

//                     {order.items.length > 3 && (
//                       <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-semibold border-2 border-white">
//                         +{order.items.length - 3}
//                       </div>
//                     )}
//                   </div>

//                   {/* Order Info */}
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-900 mb-1">
//                       Order Date:{" "}
//                       {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </p>

//                     <p className="text-sm text-gray-600 mb-1 truncate">
//                       {order.items.length} item(s):{" "}
//                       {order.items
//                         .map((item) => `${item.itemName} × ${item.quantity}`)
//                         .join(", ")}
//                     </p>

//                     <p className="text-sm text-gray-900 font-medium">
//                       Total: ₹{order.totalAmount}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="ml-4 flex-shrink-0">
//                   {getStatusButton(order.orderStatus, order._id)}
//                 </div>
//               </div>

//               {order.orderStatus === "FAILED" &&
//                 expandedOrderId === order._id && (
//                   <div className="bg-pink-100 rounded-b-lg px-4 py-3 flex justify-end">
//                     <button
//                       onClick={(e) => handleRetryPayment(e, order._id)}
//                       className="px-6 py-2 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors"
//                     >
//                       Retry Payment
//                     </button>
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-6">
//           <UserPagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//       <BottomNavBar
//         restaurantId={restaurantId}
//         tableNo={tableNo}
//         defaultActive="Orders"
//       />
//     </div>
//   );
// };

// export default OrderHistory;
import React, { useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { useQuery } from "@tanstack/react-query";
import { cancellOrder, getAllOrders } from "../../services/order";
import type { IPaginatedOrdersResponse } from "../../types/order";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import UserPagination from "../../Components/Component/user/userPagination";
import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
import { Clock, CheckCircle, XCircle, ChefHat, Truck, ArrowRight } from "lucide-react";

const OrderHistory: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );
  const navigator = useNavigate();
  const { data } = useQuery<IPaginatedOrdersResponse>({
    queryKey: ["orders", restaurantId, userId, currentPage, limit],
    queryFn: () =>
      getAllOrders(
        restaurantId as string,
        userId as string,
        currentPage,
        limit,
        ""
      ),
  });
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId, userId }: { orderId: string; userId: string }) =>
      cancellOrder(orderId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const handleOrderClick = (
    orderId: string,
    status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED"
  ) => {
    if (status === "FAILED") {
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
      return;
    }
    navigator(`/user/order/${orderId}`);
  };

  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRetryPayment = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    console.log("Retrying payment for order:", orderId);
    // Add your retry payment logic here
  };

  async function handleCancellButton(
    e: React.MouseEvent<HTMLButtonElement>,
    orderId: string
  ) {
    e.stopPropagation();
    try {
      if (!userId) return;
      const confirmed = await showConfirm(
        "Cancel Order?",
        "This action cannot be undone",
        "Yes, Cancel",
        "No"
      );

      if (!confirmed) return;

      cancelOrderMutation.mutate({ orderId, userId });
    } catch (error) {
      return;
    }
  }

  const getStatusBadge = (
    status: "PLACED" | "IN_KITCHEN" | "READY" | "SERVED" | "FAILED",
  ) => {
    switch (status) {
      case "PLACED":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Placed
          </span>
        );
      case "IN_KITCHEN":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full gap-1.5">
            <ChefHat className="w-3.5 h-3.5" />
            Cooking
          </span>
        );
      case "READY":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            Ready
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
      case "SERVED":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full gap-1.5">
            Unknown
          </span>
        )
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Orders
          </h1>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-100">
            Total Orders: {data?.total || 0}
          </div>
        </div>

        <div className="space-y-6">
          {data?.data?.map((order) => (
            <div
              key={order._id}
              className={`group bg-white rounded-3xl shadow-lg shadow-orange-500/5 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${order.orderStatus === "FAILED" ? "border-red-100" : ""
                } ${expandedOrderId === order._id ? "ring-2 ring-orange-100" : ""}`}
            >
              <div
                className={`p-6 cursor-pointer`}
                onClick={() =>
                  handleOrderClick(order.orderId, order.orderStatus)
                }
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex gap-4">
                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Order #{order.orderId.substring(0, 8)}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })} • {new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                    <p className="text-xs text-gray-500 font-medium">{order.items.length} Items</p>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="flex items-center gap-4 py-4 border-t border-gray-50">
                  <div className="flex -space-x-3 overflow-hidden py-1 pl-1">
                    {order.items.slice(0, 4).map((item, index) => (
                      <img
                        key={index}
                        src={item.itemImages?.[0] || "/placeholder-food.jpg"}
                        alt={item.itemName}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200";
                        }}
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-white flex items-center justify-center text-xs font-bold text-orange-600">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate font-medium">
                      {order.items.map(i => `${i.quantity}x ${i.itemName}`).join(", ")}
                    </p>
                  </div>
                  <div className="text-gray-300 group-hover:text-orange-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Quick Actions / Expandable Area */}
              {order.orderStatus === "FAILED" &&
                expandedOrderId === order._id && (
                  <div className="bg-red-50/50 border-t border-red-100 px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Payment Failed
                    </span>
                    <button
                      onClick={(e) => handleRetryPayment(e, order._id)}
                      className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-700 transition-all hover:-translate-y-0.5"
                    >
                      Retry Payment
                    </button>
                  </div>
                )}
              {order.orderStatus === "PLACED" && (
                <div className="bg-orange-50/50 border-t border-orange-100 px-6 py-3 flex justify-end gap-3">
                  <button
                    onClick={(e) => handleCancellButton(e, order._id)}
                    className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleOrderClick(order.orderId, order.orderStatus)}
                    className="px-5 py-2 text-sm font-bold bg-white text-orange-600 border border-orange-200 rounded-lg shadow-sm hover:shadow-md transition-all">
                    Track Status
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {data?.total && data.total > limit && (
          <div className="flex justify-center mt-12 mb-8">
            <UserPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

      </div>
      <BottomNavBar
        restaurantId={restaurantId}
        tableNo={tableNo}
        defaultActive="Orders"
        activeColor="text-orange-600"
      />
    </div >
  );
};

export default OrderHistory;
