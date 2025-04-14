import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Calendar, 
  User, 
  Filter, 
  Download
} from 'lucide-react';

const IssueLogDashboard = () => {
  // Sample data - in a real app, this would come from API
  const [issueData] = useState({
    issuesByStatus: [
      { name: 'Open', value: 45, color: '#ef4444' },
      { name: 'In Progress', value: 30, color: '#f59e0b' },
      { name: 'Under Review', value: 15, color: '#3b82f6' },
      { name: 'Closed', value: 25, color: '#10b981' }
    ],
    issuesByPriority: [
      { name: 'Critical', value: 12, color: '#dc2626' },
      { name: 'High', value: 18, color: '#f97316' },
      { name: 'Medium', value: 45, color: '#f59e0b' },
      { name: 'Low', value: 40, color: '#22c55e' }
    ],
    issuesTrend: [
      { name: 'Jan', open: 25, closed: 20 },
      { name: 'Feb', open: 30, closed: 22 },
      { name: 'Mar', open: 38, closed: 28 },
      { name: 'Apr', open: 40, closed: 35 },
      { name: 'May', open: 45, closed: 32 },
      { name: 'Jun', open: 42, closed: 38 }
    ],
    departmentDistribution: [
      { name: 'IT', value: 35 },
      { name: 'HR', value: 15 },
      { name: 'Finance', value: 25 },
      { name: 'Operations', value: 20 },
      { name: 'Marketing', value: 15 }
    ],
    responseTime: [
      { name: '< 1 day', count: 55 },
      { name: '1-2 days', count: 30 },
      { name: '3-5 days', count: 20 },
      { name: '> 5 days', count: 10 }
    ],
    recentIssues: [
      { id: 'ISS-1023', title: 'Server outage on cloud instance', priority: 'Critical', status: 'In Progress', assignee: 'Alex Morgan', department: 'IT', createdAt: '2025-04-01' },
      { id: 'ISS-1022', title: 'Payroll system error', priority: 'High', status: 'Open', assignee: 'Jamie Smith', department: 'Finance', createdAt: '2025-04-01' },
      { id: 'ISS-1021', title: 'Mobile app login failure', priority: 'Medium', status: 'Under Review', assignee: 'Taylor Wong', department: 'IT', createdAt: '2025-03-30' },
      { id: 'ISS-1020', title: 'New hire onboarding document missing', priority: 'Low', status: 'Closed', assignee: 'Jordan Lee', department: 'HR', createdAt: '2025-03-29' },
      { id: 'ISS-1019', title: 'Marketing campaign tracking issue', priority: 'Medium', status: 'Open', assignee: 'Casey Johnson', department: 'Marketing', createdAt: '2025-03-29' }
    ]
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('month');

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-red-500';
      case 'In Progress': return 'bg-amber-500';
      case 'Under Review': return 'bg-blue-500';
      case 'Closed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Under Review': return <User className="w-4 h-4 text-blue-500" />;
      case 'Closed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Issue Log Management Dashboard</h1>
          <div className="flex space-x-4">
            <div className="flex items-center bg-white rounded-lg shadow px-3 py-2">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <select 
                className="text-sm text-gray-700 bg-transparent focus:outline-none" 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <button className="flex items-center bg-white rounded-lg shadow px-3 py-2 text-sm text-gray-700">
              <Download className="w-4 h-4 text-gray-500 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'issues' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('issues')}
            >
              Issues List
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'trends' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends & Analytics
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Open Issues</p>
                <p className="text-2xl font-bold text-gray-800">45</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <span className="text-green-500">↑ 12%</span> from last month
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Closed Issues</p>
                <p className="text-2xl font-bold text-gray-800">25</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <span className="text-red-500">↓ 3%</span> from last month
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-800">1.8 days</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <span className="text-green-500">↑ 5%</span> improvement
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Critical Issues</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <span className="text-red-500">↑ 8%</span> from last month
            </div>
          </div>
        </div>

        {/* Main Content - Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Issues by Status - Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Issues by Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueData.issuesByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueData.issuesByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issues by Priority - Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Issues by Priority</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueData.issuesByPriority}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueData.issuesByPriority.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution - Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Department Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueData.departmentDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Issues Trend & Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Issues Trend - Line Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Issues Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={issueData.issuesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="open" stroke="#ef4444" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="closed" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Response Time - Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Response Time Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueData.responseTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Issues Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-800">Recent Issues</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issueData.recentIssues.map(issue => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{issue.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{issue.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${getPriorityColor(issue.priority)} font-medium`}>{issue.priority}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {getStatusIcon(issue.status)}
                        <span className="ml-1.5">{issue.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1.5" />
                        {issue.createdAt}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex justify-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All Issues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueLogDashboard;