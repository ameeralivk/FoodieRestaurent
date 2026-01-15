import React from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import BalanceCard from "../../Components/Component/user/Wallet/balanceCart";
import Header from "../../Components/Component/user/Wallet/header";
import WalletTable from "../../Components/Component/user/Wallet/walletTable";
interface Transaction {
  date: string;
  description: string;
  points: number;
  status: string;
}

const WalletPage: React.FC = () => {
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );
  const transactions: Transaction[] = [
    {
      date: "July 20, 2024",
      description: "Order at The Italian Place",
      points: -1575,
      status: "Completed",
    },
    {
      date: "July 18, 2024",
      description: "Points Earned from Purchase",
      points: 5000,
      status: "Completed",
    },
    {
      date: "July 15, 2024",
      description: "Order at The Burger Joint",
      points: -2150,
      status: "Completed",
    },
    {
      date: "July 12, 2024",
      description: "Points Refunded from The Italian Place",
      points: 1000,
      status: "Completed",
    },
    {
      date: "July 10, 2024",
      description: "Initial Points Deposit",
      points: 10000,
      status: "Completed",
    },
  ];

  const currentBalance = 2500;
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Header />

          {/* Points Balance Card */}

          {/* Points Info */}
          <BalanceCard currentBalance={currentBalance} />
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 p-6 pb-4">
              Recent Points Activity
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <WalletTable transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar
        defaultActive="wallet"
        restaurantId={restaurantId}
        tableNo={tableNo}
      />
    </div>
  );
};

export default WalletPage;
