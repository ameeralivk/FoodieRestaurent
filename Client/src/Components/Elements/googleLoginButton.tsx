import React from "react";

interface GoogleLoginButtonProps {
  login: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ login }) => {
  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-5 py-2 w-full hover:bg-gray-100 transition-all duration-200 shadow-sm"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
};
