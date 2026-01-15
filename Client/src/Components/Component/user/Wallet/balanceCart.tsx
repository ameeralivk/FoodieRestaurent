import React from 'react'
interface BalanceCardProps {
  currentBalance: number;
}
const balanceCart:React.FC<BalanceCardProps> = ({currentBalance}) => {
  return (
     <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-8">
              {/* Wallet Icon */}
              <div className="flex-shrink-0">
                <svg className="w-32 h-32" viewBox="0 0 120 120" fill="none">
                  <rect
                    x="25"
                    y="35"
                    width="70"
                    height="50"
                    rx="4"
                    fill="#F4A460"
                    stroke="#8B4513"
                    strokeWidth="2"
                  />
                  <rect
                    x="30"
                    y="30"
                    width="70"
                    height="50"
                    rx="4"
                    fill="#FFA07A"
                    stroke="#8B4513"
                    strokeWidth="2"
                  />
                  <circle cx="75" cy="55" r="4" fill="#8B4513" />
                  <line
                    x1="30"
                    y1="45"
                    x2="100"
                    y2="45"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Points Info */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentBalance.toLocaleString()} Points
                </h2>
                <p className="text-gray-700 mb-1">
                  Redeem points for discounts at participating restaurants.
                </p>
                <p className="text-gray-700 mb-1">(100 points = $1)</p>
                <p className="text-gray-700 font-semibold">
                  Current Points Balance
                </p>
              </div>
            </div>
          </div>
  )
}

export default balanceCart