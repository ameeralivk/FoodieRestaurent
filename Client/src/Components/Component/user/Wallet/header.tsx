import React from "react";
import { Wallet } from "lucide-react";

interface HeaderProps {
  onButtonClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onButtonClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl shadow-md">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          My Wallet
        </h1>
        <p className="text-gray-500 text-sm ml-1">
          Manage your balance and transaction history.
        </p>
      </div>
      <button
        onClick={onButtonClick}
        className="bg-white border-2 border-orange-100 hover:border-orange-200 text-orange-600 hover:text-orange-700 font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:translate-y-[-2px] text-sm"
      >
        Withdraw Balance
      </button>
    </div>
  );
};

export default Header;
