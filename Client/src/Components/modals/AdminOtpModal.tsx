import { Lock } from "lucide-react";
import type { ChangeEvent, KeyboardEvent } from "react";
import React, { useEffect } from "react";
import { useState } from "react";
import WarningSwal from "../Helpers/WarningSwal";
interface otpModalProps {
  modalOpen: boolean;
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
}
const OTPVerificationModal: React.FC<otpModalProps> = ({
  modalOpen,
  email,
  onVerify,
  onResend,
}) => {
  const [resendTimer, setResendTimer] = useState(120);
  const [isCounting, setIsCounting] = useState(true);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };
  useEffect(() => {
    console.log(email);
  }, []);
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };
  useEffect(() => {
    if (!isCounting) return;

    if (resendTimer === 0) {
      setIsCounting(false);
      return;
    }

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer, isCounting]);

  const handleResendClickLocal = () => {
    onResend();
    setResendTimer(120);
    setIsCounting(true);
  };

  const handleModalSubmit = () => {
    const isFull = otp.every((x) => x.trim() !== "");
    if (!isFull) {
      WarningSwal({ message: "Otp must be 6 characters" });
      return;
    }

    const finalOtp = otp.join("");
    onVerify(finalOtp);
  };

  return modalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md">
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-amber-600 bg-opacity-200 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-yellow-900" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-2">
            OTP Verification
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-center mb-8">
            Enter the 6-digit code sent to
            <br />
            <span className="text-white font-semibold">{email}</span>
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOtpChange(index, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                className="w-12 h-14 bg-slate-700 text-white text-center text-2xl font-bold border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleModalSubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mb-4"
          >
            Verify OTP
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            {isCounting ? (
              <p className="text-gray-400 text-sm">
                Resend OTP in{" "}
                <span className="text-yellow-500 font-semibold">
                  {resendTimer}s
                </span>
              </p>
            ) : (
              <button
                onClick={handleResendClickLocal}
                className="text-blue-400 hover:text-blue-300 transition duration-300 text-sm font-semibold"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default OTPVerificationModal;
