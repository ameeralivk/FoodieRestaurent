import React from "react";
import { Check, Circle, Package, Truck } from "lucide-react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";

interface OrderItem {
  itemId: string;
  itemName: string;
  itemImages: string[];
  price: number;
  quantity: number;
  assignedCookId: string | null;
  itemStatus: "PLACED" | "PENDING" | "PREPARING" | "READY" | "SERVED";
}

interface Order {
  id: string;
  restaurantId: string;
  userId: string;
  tableId: string;
  items: OrderItem[];
  subTotal: number;
  totalAmount: number;
  currency: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetail: React.FC = () => {
  const order: Order = {
    id: "695d3abbd6b5758e605740df",
    restaurantId: "692ea36738a54f8d01ed6747",
    userId: "6930063477bdbd4c43e863aa",
    tableId: "3",
    items: [
      {
        itemId: "694f7c7eb130a027cd281248",
        itemName: "Burger",
        itemImages: [],
        price: 49,
        quantity: 2,
        assignedCookId: null,
        itemStatus: "PLACED",
      },
      {
        itemId: "69564c1e60e5ecc95ef5df72",
        itemName: "adithyan",
        itemImages: [],
        price: 30000,
        quantity: 1,
        assignedCookId: null,
        itemStatus: "PENDING",
      },
      {
        itemId: "6951045c55ed216920e2f52b",
        itemName: "Shawarma",
        itemImages: [],
        price: 90,
        quantity: 1,
        assignedCookId: null,
        itemStatus: "PENDING",
      },
    ],
    subTotal: 30188,
    totalAmount: 30188,
    currency: "INR",
    orderStatus: "PLACED",
    createdAt: "2026-01-06T16:39:23.868+00:00",
    updatedAt: "2026-01-06T16:39:23.868+00:00",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <div className="max-w-8xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-2">Order Details</h2>
        <p className="text-gray-500 mb-8">
          From the kitchen of your next order
        </p>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Order Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Status</span>
              <span className="bg-green-500 text-white px-4 py-1 rounded text-sm font-medium">
                {order.orderStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">#{order.id.slice(-8)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Table</span>
              <span className="font-medium">Table {order.tableId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">Credit Card</span>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Ordered Items</h3>

          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={item.itemId}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{item.itemName}</h4>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Item Image Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Delivery Information</h3>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Address</span>
            <span className="font-medium text-right">
              123 Elm Street, Anytown, USA
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Payment Details</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(order.subTotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">₹0.00</span>
            </div>

            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Order Timeline</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Order Placed</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <Circle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-500">Preparing</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-500">Out for Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-500">Delivered</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600">
            Mark Tip
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-300">
            Download Invoice
          </button>
          <button className="bg-teal-500 text-white px-6 py-2 rounded font-medium hover:bg-teal-600">
            Add Your Feedback Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
