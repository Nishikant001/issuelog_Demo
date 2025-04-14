import { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ReportedIssuesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeFrame, setTimeFrame] = useState('month'); // 'month' or 'year'
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(3); // April (0-indexed)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  
  // Available years data
  const availableYears = [2025, 2024, 2023, 2022];
  
  // Sample project data - you would replace this with your actual data
  const generateProjectData = () => {
    const data = {};
    const startYear = 2022;
    const currentYear = 2025;
    
    for (let year = startYear; year <= currentYear; year++) {
      data[year] = {};
      for (let month = 0; month < 12; month++) {
        const completed = Math.floor(Math.random() * 30) + 5;
        const inProgress = Math.floor(Math.random() * 20) + 3;
        const pending = Math.floor(Math.random() * 15) + 2;
        
        data[year][month] = {
          completed,
          inProgress,
          pending,
          total: completed + inProgress + pending
        };
      }
    }
    
    return data;
  };

  const projectData = generateProjectData();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Colors for the charts
  const COLORS = ['#10b981', '#f59e0b', '#3b82f6'];
  
  // Get status color class based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get data for selected time period
  const getCurrentData = () => {
    if (timeFrame === 'month') {
      // For monthly view, show data for status distribution
      const monthData = projectData[selectedYear][selectedMonth];
      return [
        { name: 'Completed', value: monthData.completed, color: COLORS[0] },
        { name: 'In Progress', value: monthData.inProgress, color: COLORS[1] },
        { name: 'Pending', value: monthData.pending, color: COLORS[2] }
      ];
    } else {
      // For yearly view, show data for each month
      return monthNames.map((month, index) => {
        const monthData = projectData[selectedYear][index];
        return {
          name: month.substring(0, 3),
          Completed: monthData.completed,
          'In Progress': monthData.inProgress,
          Pending: monthData.pending
        };
      });
    }
  };

  // Get totals for the selected time period
  const getTotals = () => {
    if (timeFrame === 'month') {
      return projectData[selectedYear][selectedMonth];
    } else {
      // Sum up all months in the selected year
      const yearData = projectData[selectedYear];
      return Object.values(yearData).reduce((acc, month) => {
        acc.completed += month.completed;
        acc.inProgress += month.inProgress;
        acc.pending += month.pending;
        acc.total += month.total;
        return acc;
      }, { completed: 0, inProgress: 0, pending: 0, total: 0 });
    }
  };

  const totals = getTotals();
  const currentData = getCurrentData();
  
  // Filter project data based on search and status
  const getProjectList = () => {
    const statusMapping = {
      'all': null,
      'completed': 'completed', 
      'in-progress': 'in-progress',
      'pending': 'pending'
    };
    
    // Create sample project list for the current month/year
    const projects = [];
    const monthData = projectData[selectedYear][selectedMonth];
    
    // Generate sample projects based on the data
    for (let i = 0; i < monthData.completed; i++) {
      if (projects.length < 10) { // Limit to 10 for display purposes
        projects.push({
          id: `c-${i}`,
          name: `Project ${String.fromCharCode(65 + i % 26)}${Math.floor(i/26) || ''}`,
          status: 'completed',
          progress: 100,
          dueDate: `${monthNames[selectedMonth]} ${10 + (i % 20)}, ${selectedYear}`,
          team: `Team ${1 + (i % 5)}`
        });
      }
    }
    
    for (let i = 0; i < monthData.inProgress; i++) {
      if (projects.length < 10) {
        projects.push({
          id: `p-${i}`,
          name: `Project ${String.fromCharCode(65 + (i + monthData.completed) % 26)}${Math.floor((i + monthData.completed)/26) || ''}`,
          status: 'in-progress',
          progress: 30 + (i % 60),
          dueDate: `${monthNames[(selectedMonth + 1) % 12]} ${5 + (i % 25)}, ${selectedYear}`,
          team: `Team ${1 + (i % 5)}`
        });
      }
    }
    
    for (let i = 0; i < monthData.pending; i++) {
      if (projects.length < 10) {
        projects.push({
          id: `w-${i}`,
          name: `Project ${String.fromCharCode(65 + (i + monthData.completed + monthData.inProgress) % 26)}${Math.floor((i + monthData.completed + monthData.inProgress)/26) || ''}`,
          status: 'pending',
          progress: 0,
          dueDate: `${monthNames[(selectedMonth + 2) % 12]} ${1 + (i % 28)}, ${selectedYear}`,
          team: `Team ${1 + (i % 5)}`
        });
      }
    }
    
    // Filter projects based on search and status
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.team.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || project.status === statusMapping[filterStatus];
      
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      
      
      {/* Controls and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <button 
              className={`px-4 py-2 rounded-l-md flex items-center gap-1 ${timeFrame === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => setTimeFrame('month')}
            >
              <Calendar size={16} />
              <span>Monthly</span>
            </button>
            <button 
              className={`px-4 py-2 rounded-r-md flex items-center gap-1 ${timeFrame === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => setTimeFrame('year')}
            >
              <BarChartIcon size={16} />
              <span>Yearly</span>
            </button>
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              <span>{selectedYear}</span>
              <ChevronDown size={16} />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {availableYears.map(year => (
                  <div 
                    key={year}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearDropdownOpen(false);
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {timeFrame === 'month' && (
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm"
                onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              >
                <Calendar size={16} />
                <span>{monthNames[selectedMonth]}</span>
                <ChevronDown size={16} />
              </button>
              {isMonthDropdownOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {monthNames.map((month, index) => (
                    <div 
                      key={month}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedMonth(index);
                        setIsMonthDropdownOpen(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Total Projects</div>
          <div className="text-2xl font-bold mt-1">{totals.total}</div>
          <div className="h-1 w-full rounded-full mt-2 bg-gray-500"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold mt-1">{totals.completed}</div>
          <div className="h-1 w-full rounded-full mt-2 bg-green-500"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-bold mt-1">{totals.inProgress}</div>
          <div className="h-1 w-full rounded-full mt-2 bg-yellow-500"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold mt-1">{totals.pending}</div>
          <div className="h-1 w-full rounded-full mt-2 bg-blue-500"></div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            {timeFrame === 'month' ? `Project Status - ${monthNames[selectedMonth]} ${selectedYear}` : `Monthly Project Status - ${selectedYear}`}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {timeFrame === 'month' ? (
                <PieChart>
                  <Pie
                    data={currentData}
                    nameKey="name"
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <BarChart
                  data={currentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Completed" fill={COLORS[0]} />
                  <Bar dataKey="In Progress" fill={COLORS[1]} />
                  <Bar dataKey="Pending" fill={COLORS[2]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            {timeFrame === 'month' ? 'Project Completion Rate' : 'Yearly Completion Rate'}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeFrame === 'month' ? [
                  { name: 'Completion Rate', rate: (totals.completed / totals.total * 100).toFixed(1) }
                ] : monthNames.map((month, index) => {
                  const monthData = projectData[selectedYear][index];
                  return {
                    name: month.substring(0, 3),
                    rate: (monthData.completed / monthData.total * 100).toFixed(1)
                  };
                })}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Bar dataKey="rate" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Project List</h2>
        </div>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getProjectList().map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status === 'completed' ? 'Completed' : 
                       project.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          project.status === 'completed' ? 'bg-green-500' : 
                          project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {getProjectList().length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No projects found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}