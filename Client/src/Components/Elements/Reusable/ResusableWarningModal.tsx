import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ReusableWarningModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  title = "Subscription Required",
  message = "Your subscription plan is not active. Please select a plan to continue using the dashboard and access all features.",
  confirmText = "Select a Plan",
  cancelText = "Maybe Later",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-yellow-500/30 rounded-xl max-w-md w-full shadow-2xl">
        
        {/* Close Button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 pt-4 text-center">
          <div className="inline-flex p-4 bg-yellow-500/20 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-400" />
          </div>

          <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>

          <p className="text-gray-400 mb-6">{message}</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {confirmText}
            </button>

            <button
              onClick={onCancel}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Limited features available without an active subscription
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReusableWarningModal;
