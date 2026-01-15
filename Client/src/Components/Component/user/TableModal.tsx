import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../Elements/ErrorToast";

interface TableNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string | null;
}

const TableNumberModal: React.FC<TableNumberModalProps> = ({
  isOpen,
  onClose,
  restaurantId,
}) => {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!tableNumber) {
      showErrorToast("Please enter TableNo");
      return;
    }
    navigate(`/user/restaurant/${restaurantId}?table=${tableNumber}`);
    setTableNumber("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Faded background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-xl p-6 w-80 sm:w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Your Table Number</h2>

        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setTableNumber("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableNumberModal;
