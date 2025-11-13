import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock } from "lucide-react";
import { logoutAction } from "../../redux/slice/adminSlice"; // adjust path as needed
import { useEffect } from "react";
const RegistrationSuccessModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGotIt = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-700">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 opacity-20 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle
              className="w-20 h-20 text-green-500 relative z-10"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          Registration Successful!
        </h2>

        {/* Message */}
        <p className="text-slate-300 text-center mb-6 leading-relaxed">
          Your restaurant registration has been completed successfully and is
          now awaiting approval from the super admin.
        </p>

        {/* Status Box */}
        <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 mb-6 border border-slate-600">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">
                Pending Approval
              </p>
              <p className="text-slate-400 text-xs mt-1">
                You will be notified once your registration is approved.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Action Button */}
        <button
          onClick={handleGotIt}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Got It
        </button>

        {/* Additional Info */}
        <p className="text-slate-400 text-xs text-center mt-4">
          Approval typically takes 24-48 hours
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
