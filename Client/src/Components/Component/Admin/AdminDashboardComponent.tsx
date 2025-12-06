import React, { useState } from 'react';
import { ShoppingCart, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, QrCode, Eye } from 'lucide-react';

interface Order {
  id: string;
  table: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  time: string;
}

interface Stats {
  totalOrders: number;
  revenue: number;
  activeCustomers: number;
  avgOrderValue: number;
}

const DashboardPage: React.FC = () => {
  const [stats] = useState<Stats>({
    totalOrders: 248,
    revenue: 12450,
    activeCustomers: 45,
    avgOrderValue: 50.20
  });

  const [recentOrders] = useState<Order[]>([
    { id: 'ORD-001', table: 'Table 5', items: 3, total: 45.99, status: 'preparing', time: '2 min ago' },
    { id: 'ORD-002', table: 'Table 12', items: 5, total: 78.50, status: 'pending', time: '5 min ago' },
    { id: 'ORD-003', table: 'Table 3', items: 2, total: 32.00, status: 'completed', time: '8 min ago' },
    { id: 'ORD-004', table: 'Table 8', items: 4, total: 65.25, status: 'preparing', time: '10 min ago' },
    { id: 'ORD-005', table: 'Table 15', items: 6, total: 92.80, status: 'pending', time: '12 min ago' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'preparing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; trend?: string }> = ({ icon, title, value, trend }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-800 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Restaurant Dashboard</h1>
            <p className="text-gray-400">Monitor your QR code restaurant operations</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 px-4 py-2 rounded-lg transition-colors">
            <QrCode className="w-5 h-5" />
            View QR Codes
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<ShoppingCart className="w-6 h-6 text-blue-400" />}
            title="Total Orders Today"
            value={stats.totalOrders.toString()}
            trend="+12%"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-green-400" />}
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            trend="+8%"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-purple-400" />}
            title="Active Customers"
            value={stats.activeCustomers.toString()}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-orange-400" />}
            title="Avg Order Value"
            value={`$${stats.avgOrderValue}`}
            trend="+5%"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Order ID</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Table</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Items</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Total</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Time</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4 text-gray-300">{order.table}</td>
                    <td className="p-4 text-gray-300">{order.items} items</td>
                    <td className="p-4 font-medium">${order.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {order.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {order.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">{order.time}</td>
                    <td className="p-4">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <QrCode className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Generate QR Code</h3>
                <p className="text-sm text-gray-400">Create new table QR codes</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Menu</h3>
                <p className="text-sm text-gray-400">Update items and prices</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Staff Management</h3>
                <p className="text-sm text-gray-400">View and manage staff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;