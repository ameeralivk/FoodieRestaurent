import React, { useState } from 'react';
import { X } from 'lucide-react';

// Types
interface RestaurantDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  location: string;
  owner: string;
  contact: string;
  planName: string;
  status: string;
  nextDueDate: string;
  amount: string;
  restaurantImage: string;
  verificationDocument: string;
  onApprove: () => void;
  onReject: () => void;
}

// Modal Component
const RestaurantDetailsModal: React.FC<RestaurantDetailsProps> = ({
  isOpen,
  onClose,
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
  onApprove,
  onReject,
}) => {
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Review Restaurant Details</h1>
            <p className="text-gray-400 text-sm mt-1">
              Verify the authenticity of the restaurant before approval
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Restaurant Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Restaurant Details</h2>
            <p className="text-gray-400 text-sm mb-6">
              View and manage your restaurant's information and subscription plan
            </p>

            <div className="bg-neutral-800 rounded-lg p-6">
              <div className="flex gap-6">
                {/* Left Column - Details */}
                <div className="flex-1 space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Basic Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Restaurant Name</p>
                        <p className="text-sm text-white">{restaurantName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-sm text-white">{location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Owner</p>
                        <p className="text-sm text-white">{owner}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Contact</p>
                        <p className="text-sm text-white">{contact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subscription Plan Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">
                      Subscription Plan Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Plan Name</p>
                        <p className="text-sm text-white">{planName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-sm text-white">{status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Next Due Date</p>
                        <p className="text-sm text-white">{nextDueDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Cost</p>
                        <p className="text-sm text-white">{amount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image */}
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

          {/* Verification Document Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-6">Verification Document</h2>
            
            <div className="bg-neutral-800 rounded-lg p-6">
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={verificationDocument}
                  alt="Verification Document"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Action Buttons for Document */}
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded transition-colors">
                View Document
              </button>
              <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded transition-colors">
                Reject Restaurant
              </button>
            </div>
          </div>

          {/* Rejection Reason Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Rejection Reason</h2>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApprove();
                onClose();
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage with Modal Toggle
export default function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = () => {
    alert('Restaurant approved!');
  };

  const handleReject = () => {
    alert('Restaurant rejected!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-amber-100 mb-6">Restaurant Management</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          View Restaurant Details
        </button>

        <RestaurantDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          restaurantName="The Golden Spoon"
          location="123 Main Street, Anytown, USA"
          owner="Chef Harrison"
          contact="+1 (555) 123-4567"
          planName="Premium"
          status="Active"
          nextDueDate="2025-08-15"
          amount="$99.00"
          restaurantImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
          verificationDocument="https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop"
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}