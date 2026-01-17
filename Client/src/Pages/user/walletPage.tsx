// import React, { useEffect, useState } from "react";
// import Navbar from "../../Components/Layouts/userLayouts/Navbar";
// import BottomNavBar from "../../Components/user/DownBar";
// import type { RootState } from "../../redux/store/store";
// import { useSelector } from "react-redux";
// import BalanceCard from "../../Components/Component/user/Wallet/balanceCart";
// import Header from "../../Components/Component/user/Wallet/header";
// import type { IWalletTransaction } from "../../types/wallet";
// import WalletTable from "../../Components/Component/user/Wallet/walletTable";
// import { getWallet } from "../../services/wallet";
// interface Transaction {
//   date: string;
//   description: string;
//   points: number;
//   status: string;
// }

// const WalletPage: React.FC = () => {
//   const [transactions, setTransactions] = useState<IWalletTransaction[]>([]);
//   const [amount, setAmount] = useState(0);
//   const restaurantId = useSelector(
//     (state: RootState) => state.userAuth.user?.restaurantId
//   );
//   const userId = useSelector((state: RootState) => state.userAuth.user?._id);
//   const tableNo = useSelector(
//     (state: RootState) => state.userAuth.user?.tableNo
//   );

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await getWallet(userId as string);
//         console.log(response, "d");
//         if (response.success) {
//           setTransactions(response.data.transaction);
//           setAmount(response.data.balance);
//         }
//       };
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   const currentBalance = 2500;
//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <Header />

//           {/* Points Balance Card */}

//           {/* Points Info */}
//           <BalanceCard currentBalance={amount} />
//           {/* Recent Activity */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <h2 className="text-xl font-bold text-gray-900 p-6 pb-4">
//               Recent Transaction
//             </h2>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <WalletTable transactions={transactions} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <BottomNavBar
//         defaultActive="wallet"
//         restaurantId={restaurantId}
//         tableNo={tableNo}
//       />
//     </div>
//   );
// };

// export default WalletPage;

import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Layouts/userLayouts/Navbar";
import BottomNavBar from "../../Components/user/DownBar";
import type { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import BalanceCard from "../../Components/Component/user/Wallet/balanceCart";
import Header from "../../Components/Component/user/Wallet/header";
import type { IWalletTransaction } from "../../types/wallet";
import WalletTable from "../../Components/Component/user/Wallet/walletTable";
import { getWallet } from "../../services/wallet";

const WalletPage: React.FC = () => {
  const [transactions, setTransactions] = useState<IWalletTransaction[]>([]);
  const [amount, setAmount] = useState(0);
  const restaurantId = useSelector(
    (state: RootState) => state.userAuth.user?.restaurantId
  );
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
  const tableNo = useSelector(
    (state: RootState) => state.userAuth.user?.tableNo
  );

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getWallet(userId as string);
        if (response.success) {
          setTransactions(response.data.transaction);
          setAmount(response.data.balance);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header />

        {/* Balance Card */}
        <BalanceCard currentBalance={amount} />

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <WalletTable transactions={transactions} />
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

