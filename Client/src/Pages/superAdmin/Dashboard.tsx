import { useState } from "react";
import SuperAdminNavbar from "../../Components/Component/SuperAdmin/SuperAdminNavbar";
import SuperAdminSidebar from "../../Components/Component/SuperAdmin/SuperAdminSideBar";
const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const subscriptionData = [
    { plan: "Basic", count: 50 },
    { plan: "Premium", count: 30 },
    { plan: "Enterprise", count: 20 },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <SuperAdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SuperAdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-800/30 rounded-lg p-6">
              <p className="text-neutral-400 text-sm mb-2">
                Total Amount Paid by Subscribed Hotels
              </p>
              <p className="text-3xl font-bold">₹120,000</p>
            </div>

            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6">
              <p className="text-neutral-400 text-sm mb-2">Overall Revenue</p>
              <p className="text-3xl font-bold">₹250,000</p>
            </div>
          </div>

          {/* Subscription Plan Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left p-4 text-neutral-400 font-medium">
                    Subscription Plan
                  </th>
                  <th className="text-right p-4 text-neutral-400 font-medium">
                    Number of Restaurants
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-800 last:border-0"
                  >
                    <td className="p-4">{item.plan}</td>
                    <td className="p-4 text-right">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Hotel */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Revenue by Hotel</h3>
              <p className="text-3xl font-bold mb-1">₹120,000</p>
              <p className="text-green-500 text-sm mb-6">Last 30 days +15%</p>

              <div className="flex items-end justify-between gap-2 h-40">
                {["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"].map(
                  (hotel, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full bg-amber-700/80 rounded-t"
                        style={{ height: `${60 + Math.random() * 40}%` }}
                      ></div>
                      <span className="text-xs text-neutral-500">{hotel}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Revenue Trend</h3>
              <p className="text-3xl font-bold mb-1">₹250,000</p>
              <p className="text-red-500 text-sm mb-6">Last 12 months -12%</p>

              <div className="relative h-40">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,60 L 50,40 L 100,55 L 150,35 L 200,50 L 250,30 L 300,60 L 350,25 L 400,45"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-neutral-500 px-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
                    (month) => (
                      <span key={month}>{month}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
