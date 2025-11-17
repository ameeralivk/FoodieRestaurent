import React from "react";
import { X } from "lucide-react";
import type { RestaurantApprovalModalProps } from "../../../types/SuperAdmin";

const RestaurantApprovalModal: React.FC<RestaurantApprovalModalProps> = ({
  isOpen,
  onClose,
  onApprove,
  data,
}) => {
    if (!isOpen || !data) return null;
  const {
    restaurantName,
    location,
    owner,
    contact,
    planName,
    status,
    nextDueDate,
    amount,
    restaurantImage,
    verificationDocument,
  } = data;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Review Restaurant Details
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Verify the authenticity before approval
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Restaurant Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Restaurant Details
            </h2>

            <div className="bg-neutral-800 rounded-lg p-6">
              <div className="flex gap-6">
                {/* Left side */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">
                      Basic Info
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Restaurant Name</p>
                        <p className="text-sm text-white">{restaurantName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm text-white">{location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Owner</p>
                        <p className="text-sm text-white">{owner}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm text-white">{contact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subscription */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">
                      Subscription Plan
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Plan Name</p>
                        <p className="text-sm text-white">{planName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm text-white">{status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Due Date</p>
                        <p className="text-sm text-white">{nextDueDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Cost</p>
                        <p className="text-sm text-white">{amount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - image */}
                <div className="w-64 h-48 flex-shrink-0">
                  <img
                    src={restaurantImage}
                    alt="Restaurant"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Document */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-6">
              Verification Document
            </h2>

            <div className="bg-neutral-800 p-6 rounded-lg">
              <img src={verificationDocument} className="rounded-lg" />
            </div>
          </div>

          {/* Rejection Reason */}
          {/* <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Rejection Reason
            </h2>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white"
              placeholder="Enter reason..."
            />
          </div> */}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-neutral-700 rounded-md text-white"
            >
              Cancel
            </button>

            <button
              onClick={onApprove}
              className="px-6 py-2 bg-amber-600 rounded-md text-white"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantApprovalModal;
