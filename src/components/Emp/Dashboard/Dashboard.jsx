import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  UserRoundPen,
  Settings, 
  MessageSquare, 
  Bell, 
  LogOut,
  ChevronRight,
  Search,
  TrendingUp,
  Briefcase,
  Coffee,
  Clock
} from 'lucide-react';
import DashboardPage from './DashboardPage';
import EmployeesPage from './EmployeesPage';
import ProjectsPage from './ProjectsPage';
import DocumentsPage from './DocumentsPage';
import CalendarPage from './CalendarPage';
import MessagesPage from './MessagesPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';
import IssuesDashboard from './ProjectsPage';
import TimeTracker from './TimeTracker';
import EmployeeProfile from './Profile';

// Main App Component
const EmployeeDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  
  // Mapping of pages to their components
  const pageComponents = {
    dashboard: <DashboardPage />,
    employees: <EmployeesPage />,
    projects: <IssuesDashboard />,
    documents: <DocumentsPage />,
    calendar: <CalendarPage />,
    messages: <MessagesPage />,
    analytics: <AnalyticsPage />,
    settings: <SettingsPage />,
    timetracker:<TimeTracker/>,
    profile:<EmployeeProfile/>
  };
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'employees', label: 'Employees', icon: <Users size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'timetracker', label: 'Time Tracker', icon: <Clock size={20} /> }, // 🕒 New tab!
    { id: 'profile', label: 'Profile', icon: <UserRoundPen size={20} /> }, // 🕒 New tab!
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <div className="flex items-center">
            <Coffee size={24} className="text-blue-600" />
            {sidebarOpen && <span className="ml-2 text-xl font-semibold text-gray-800">Employee Portal</span>}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-2 px-4">
                <button
                  className={`flex items-center w-full py-3 px-3 rounded-lg transition-colors ${
                    currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  {item.icon}
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Collapse button */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <button 
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronRight size={20} className={`transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <div className="flex-1 flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
          
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <LogOut size={20} />
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {pageComponents[currentPage]}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
           