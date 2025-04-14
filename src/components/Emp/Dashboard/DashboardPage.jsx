import React from 'react';
import {
  Users,
  Calendar,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const DashboardPage = () => {
  // Sample performance data (Weekly)
  const performanceData = [
    { name: 'Mon', performance: 78 },
    { name: 'Tue', performance: 82 },
    { name: 'Wed', performance: 75 },
    { name: 'Thu', performance: 88 },
    { name: 'Fri', performance: 85 },
    { name: 'Sat', performance: 90 },
    { name: 'Sun', performance: 80 },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
              <p className="text-2xl font-bold text-gray-800">1,642</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium">+2.5%</span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Briefcase size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
              <p className="text-2xl font-bold text-gray-800">32</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium">+12.3%</span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <TrendingUp size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Productivity</h3>
              <p className="text-2xl font-bold text-gray-800">89.2%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium">+3.7%</span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Calendar size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 font-medium">-2.3%</span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Employee Performance</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white">Weekly</button>
                <button className="px-3 py-1 text-xs rounded-md text-gray-600 hover:bg-gray-100">Monthly</button>
                <button className="px-3 py-1 text-xs rounded-md text-gray-600 hover:bg-gray-100">Yearly</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Recent Activities</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {['JD', 'MK', 'AL', 'TS', 'RW'][item - 1]}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {[
                        'John Doe assigned a new task',
                        'Mary Klein completed project Alpha',
                        'Alex Lee joined team Dev',
                        'Tim Smith updated document',
                        'Rachel Wang created a new event',
                      ][item - 1]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {[
                        '10 minutes ago',
                        '1 hour ago',
                        '3 hours ago',
                        'Yesterday',
                        '2 days ago',
                      ][item - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
