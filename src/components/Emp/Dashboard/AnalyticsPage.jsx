import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const departmentData = [
  { name: 'HR', performance: 80 },
  { name: 'IT', performance: 65 },
  { name: 'Marketing', performance: 90 },
  { name: 'Sales', performance: 70 },
  { name: 'Finance', performance: 75 },
];

const resourceData = [
  { name: 'HR', value: 10 },
  { name: 'IT', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Sales', value: 30 },
  { name: 'Finance', value: 15 },
];

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

const AnalyticsPage = () => {
  const [barFilter, setBarFilter] = useState('Last 7 days');
  const [pieFilter, setPieFilter] = useState('By Department');

  return (
    <div className="p-4 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Overall Productivity',
            value: '78%',
            progress: '78%',
            color: 'bg-blue-600',
            change: '+5% from last month',
            changeColor: 'text-green-500',
          },
          {
            title: 'Project Completion',
            value: '23/34',
            progress: '68%',
            color: 'bg-green-500',
            change: 'On track for Q2 goals',
            changeColor: 'text-green-500',
          },
          {
            title: 'Resource Utilization',
            value: '92%',
            progress: '92%',
            color: 'bg-purple-500',
            change: 'Near maximum capacity',
            changeColor: 'text-yellow-500',
          },
          {
            title: 'Budget Utilization',
            value: '63%',
            progress: '63%',
            color: 'bg-yellow-500',
            change: 'Under budget for Q2',
            changeColor: 'text-green-500',
          }
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{card.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">{card.value}</span>
              <div className="h-16 w-16">
                <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                  <div className={`h-12 w-12 rounded-full ${card.color} flex items-center justify-center text-white text-xs`}>
                    {card.progress}
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-4 text-sm ${card.changeColor}`}>{card.change}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Department Performance</h3>
            <select
              className="text-sm border border-gray-300 rounded-md p-1"
              value={barFilter}
              onChange={(e) => setBarFilter(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Resource Allocation</h3>
            <select
              className="text-sm border border-gray-300 rounded-md p-1"
              value={pieFilter}
              onChange={(e) => setPieFilter(e.target.value)}
            >
              <option>By Department</option>
              <option>By Project</option>
              <option>By Location</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {resourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Performance Metrics</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white">Export</button>
              <button className="px-3 py-1 text-xs rounded-md border border-gray-300">Filter</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {['Department', 'Projects', 'Efficiency', 'Utilization', 'Trend'].map((title, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { department: 'Engineering', projects: 12, efficiency: 89, utilization: 92, trend: 'up' },
                  { department: 'Design', projects: 8, efficiency: 76, utilization: 85, trend: 'up' },
                  { department: 'Marketing', projects: 6, efficiency: 82, utilization: 78, trend: 'down' },
                  { department: 'Sales', projects: 4, efficiency: 94, utilization: 96, trend: 'up' },
                  { department: 'Operations', projects: 10, efficiency: 78, utilization: 83, trend: 'neutral' }
                ].map((dept, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{dept.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{dept.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{dept.efficiency}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.efficiency}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{dept.utilization}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${dept.utilization}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dept.trend === 'up' ? 'bg-green-100 text-green-800' :
                        dept.trend === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {dept.trend === 'up' ? '↑ Rising' : dept.trend === 'down' ? '↓ Falling' : '→ Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
