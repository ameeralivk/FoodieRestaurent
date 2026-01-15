import React from "react";

interface WalletTransaction {
  date: string;
  description: string;
  points: number;
  status: string;
}

interface WalletTableProps {
  transactions: WalletTransaction[];
}

const WalletTable: React.FC<WalletTableProps> = ({ transactions }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-50 border-y border-gray-200">
        <tr>
          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
            Date
          </th>
          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
            Description
          </th>
          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
            Points
          </th>
          <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {transactions.map((transaction, index) => (
          <tr
            key={index}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 text-sm text-orange-400">
              {transaction.date}
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
              {transaction.description}
            </td>

            <td
              className={`px-6 py-4 text-sm font-medium ${
                transaction.points > 0
                  ? "text-green-600"
                  : "text-gray-700"
              }`}
            >
              {transaction.points > 0 ? "+" : ""}
              {transaction.points.toLocaleString()}
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
              {transaction.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WalletTable;
