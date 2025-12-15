import React from 'react';

interface Order {
  id: string;
  customer: string;
  status: 'Completed' | 'Active' | 'Pending Payment';
  total: string;
  date: string;
}

const DashboardComponent: React.FC = () => {
  const orders: Order[] = [
    {
      id: '#12345',
      customer: 'Ava Bennett',
      status: 'Completed',
      total: '₹75.00',
      date: '2024-03-15'
    },
    {
      id: '#12346',
      customer: 'Ryan Chen',
      status: 'Active',
      total: '₹120.00',
      date: '2024-03-15'
    },
    {
      id: '#12347',
      customer: 'Chloe Foster',
      status: 'Pending Payment',
      total: '₹50.00',
      date: '2024-03-15'
    },
    {
      id: '#12348',
      customer: 'Owen Harper',
      status: 'Completed',
      total: '₹90.00',
      date: '2024-03-14'
    },
    {
      id: '#12349',
      customer: 'Isabella Hayes',
      status: 'Active',
      total: '₹60.00',
      date: '2024-03-14'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700';
      case 'Active':
        return 'bg-blue-50 text-blue-700';
      case 'Pending Payment':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Active Orders</p>
            <p className="text-4xl font-bold text-gray-900">12</p>
          </div>

          {/* Orders Completed Today */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Orders Completed Today</p>
            <p className="text-4xl font-bold text-gray-900">85</p>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Pending Payments</p>
            <p className="text-4xl font-bold text-gray-900">₹350</p>
          </div>

          {/* Total Cashback Credits */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Total Cashback Credits Issued</p>
            <p className="text-4xl font-bold text-gray-900">₹120</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{order.customer}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">{order.total}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;