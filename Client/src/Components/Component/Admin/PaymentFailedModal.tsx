// src/pages/PaymentFailedPage.tsx
import  { useState } from "react";
import { X, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailedPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg border border-gray-700 max-w-md w-full p-6 text-white">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Failed Icon */}
        <div className="text-center my-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-4 animate-pulse">
            <AlertCircle className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Failed!</h2>
          <p className="text-gray-300">
            Unfortunately, your payment could not be completed.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate(-1)} // Go back to previous page
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 rounded hover:bg-red-700"
          >
            Try Again
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
