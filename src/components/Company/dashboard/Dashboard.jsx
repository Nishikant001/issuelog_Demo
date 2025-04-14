import React, { useState ,useRef,useEffect} from 'react';
import { 
  LayoutGrid, 
  Users, 
  Blocks,
  Calendar1 ,
  ChevronRight,
  Plus,
  LogOut,
  FileText, 
  Settings, 
  Bell, 
  Search, 
  ChevronDown, 
  ActivityIcon,
  TrendingUpIcon,
  BarChart3Icon,
  PieChartIcon,
  ClipboardListIcon,
  BarChart2Icon,
  PresentationIcon,
  UserIcon,
  Mail,
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Calendar, 
  User, 
  Filter, 
  Download
  
   , Clipboard
} from 'lucide-react';
// import React, { useState } from 'react';
import { 
  // Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Save, 
  // X,
  // MailIcon,
  // PhoneIcon,
  // UserIcon
} from 'lucide-react';

import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { LineChart, Line, 
   
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Team from '../Team/Team';
import IssueLogHomePage from '../Mainpage/page/Page';
import IssueLogDashboard from './Report';
import NotificationSystem from '../Notification/Notification';
import NotificationFullPage from '../Notification/Notification';
import LogoutPage from '../Credentials/Clogin/Logout';
import TechnologyManagement from '../Modules/Module';
import CompanyCalendar from '../calender/Calender';
// import TeamManagementDashboard from '../Company/Team/Team';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // const handleRedirect = (page) => {
    //   // In a real app, you would use router navigation here
    //   // alert(`Redirecting to ${page} page`);
    //   // Router navigation would be something like:
    //   navigate(`/p`);
    //   setIsOpen(false);
    // };

  // Dashboard Content Component
  const DashboardContent = () => {
    const [chartType, setChartType] = useState('bar');
  
    // Sample data - replace with your actual data
    const issuesData = [
      {
        name: 'Project A',
        complete: 25,
        pending: 10,
        unresolved: 5
      },
      {
        name: 'Project B',
        complete: 18,
        pending: 15,
        unresolved: 8
      },
      {
        name: 'Project C',
        complete: 30,
        pending: 7,
        unresolved: 3
      },
      {
        name: 'Project D',
        complete: 22,
        pending: 12,
        unresolved: 6
      }
    ];
    
    // For pie chart
    const totalIssuesData = [
      { name: 'Complete', value: issuesData.reduce((sum, item) => sum + item.complete, 0) },
      { name: 'Pending', value: issuesData.reduce((sum, item) => sum + item.pending, 0) },
      { name: 'Unresolved', value: issuesData.reduce((sum, item) => sum + item.unresolved, 0) }
    ];
    
    const COLORS = ['#2ecc71', '#f39c12', '#e74c3c'];
    
    const statsCards = [
      {
        title: 'Total Customers',
        value: '161',
        icon: <ActivityIcon className="text-blue-500" />,
        
      },
      {
        title: 'Active Customers',
        value: '22',
        icon: <Users className="text-green-500" />,
        
      },
      {
        title: 'Pending Customers',
        value: '44',
        icon: <TrendingUpIcon className="text-purple-500" />,
       
      },
      {
        title: 'Closeed Customers',
        value: '95',
        icon: <FileText className="text-red-500" />,
       
      }
    ];

    return (
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
            >
              <div>
                <div className="text-gray-500 mb-2">{card.title}</div>
                <div className="text-2xl font-bold">{card.value}</div>
                {/* <div className={`
                  text-sm mt-1 
                  // ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}
                `}>
                  {card.change}
                </div> */}
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Issues Overview</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setChartType('bar')}
            className={`p-2 rounded ${chartType === 'bar' ? 'bg-gray-100' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M3 3v18h18"></path>
              <path d="M7 16v-4"></path>
              <path d="M11 16v-8"></path>
              <path d="M15 16v-6"></path>
              <path d="M19 16v-2"></path>
            </svg>
          </button>
          <button 
            onClick={() => setChartType('pie')}
            className={`p-2 rounded ${chartType === 'pie' ? 'bg-gray-100' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="h-64">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={issuesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="complete" fill="#2ecc71" name="Complete" />
              <Bar dataKey="pending" fill="#f39c12" name="Pending" />
              <Bar dataKey="unresolved" fill="#e74c3c" name="Unresolved" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={totalIssuesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {totalIssuesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Issues']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-green-600 font-semibold text-sm mb-1">Complete</div>
          <div className="text-2xl font-bold">{totalIssuesData[0].value}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-600 font-semibold text-sm mb-1">Pending</div>
          <div className="text-2xl font-bold">{totalIssuesData[1].value}</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-red-600 font-semibold text-sm mb-1">Unresolved</div>
          <div className="text-2xl font-bold">{totalIssuesData[2].value}</div>
        </div>
      </div>
    </div>
      </div>
    );
  };

  // All Issues Page
  const AllIssues = () => {
    // const [tasks, setTasks] = useState([]);
    //   const [isModalOpen, setIsModalOpen] = useState(false);
    //   const [editTask, setEditTask] = useState(null);
    //   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    //   const [deleteTaskId, setDeleteTaskId] = useState(null);
    //   const [searchTerm, setSearchTerm] = useState('');
    //   const [filterStatus, setFilterStatus] = useState('all');
    //   const [filterPriority, setFilterPriority] = useState('all');
    //   const [sortBy, setSortBy] = useState('dateCreated');
    //   const [sortOrder, setSortOrder] = useState('desc');
    //   const [selectedTask, setSelectedTask] = useState(null); // Added missing state
    //   const [analytics, setAnalytics] = useState({
    //     totalTasks: 0,
    //     completedTasks: 0,
    //     pendingTasks: 0,
    //     highPriorityTasks: 0
    //   });
    
    //   // Update analytics whenever tasks change
    //   useEffect(() => {
    //     const stats = {
    //       totalTasks: tasks.length,
    //       completedTasks: tasks.filter(t => t.status === 'Completed').length,
    //       pendingTasks: tasks.filter(t => t.status === 'Pending').length,
    //       highPriorityTasks: tasks.filter(t => t.priority === 'High').length
    //     };
    //     setAnalytics(stats);
    //   }, [tasks]);
    
    //   const handleSaveTask = (task) => {
    //     const newTask = {
    //       ...task,
    //       id: editTask ? editTask.id : Date.now(),
    //       status: editTask ? editTask.status : "Pending",
    //       dateCreated: editTask ? editTask.dateCreated : new Date().toISOString(),
    //       lastUpdated: new Date().toISOString()
    //     };
    
    //     if (editTask) {
    //       setTasks(tasks.map((t) => (t.id === editTask.id ? newTask : t)));
    //       setEditTask(null);
    //     } else {
    //       setTasks([...tasks, newTask]);
    //     }
    //     setIsModalOpen(false);
    //   };
    
    //   const handleEditTask = (task) => {
    //     setEditTask(task);
    //     setIsModalOpen(true);
    //   };
      
    //   const handleDeleteTask = (id) => {
    //     setDeleteTaskId(id);
    //     setIsConfirmationOpen(true);
    //   };
    
    //   const handleDeleteConfirm = () => {
    //     setTasks(tasks.filter((task) => task.id !== deleteTaskId));
    //     setIsConfirmationOpen(false);
    //     setDeleteTaskId(null);
    //   };
    
    //   const handleStatusUpdate = (id) => {
    //     setTasks(tasks.map((task) => {
    //       if (task.id === id) {
    //         const statusMap = {
    //           'Pending': 'In Progress',
    //           'In Progress': 'Completed',
    //           'Completed': 'Pending'
    //         };
    //         return { ...task, status: statusMap[task.status] };
    //       }
    //       return task;
    //     }));
    //   };
    
    //   // Filter and sort tasks
    //   const filteredTasks = tasks
    //     .filter(task => {
    //       const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    //       const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    //       const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    //       return matchesSearch && matchesStatus && matchesPriority;
    //     })
    //     .sort((a, b) => {
    //       const order = sortOrder === 'asc' ? 1 : -1;
    //       switch (sortBy) {
    //         case 'dateCreated':
    //           return order * (new Date(a.dateCreated) - new Date(b.dateCreated));
    //         case 'priority':
    //           const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    //           return order * (priorityOrder[b.priority] - priorityOrder[a.priority]);
    //         case 'dueDate':
    //           return order * (new Date(a.dueDate) - new Date(b.dueDate));
    //         default:
    //           return 0;
    //       }
    //     });
    
    //   // Custom Modal Component
    //   const Modal = ({ isOpen, onClose, title, children }) => {
    //     if (!isOpen) return null;
    //     return (
    //       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //         <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
    //           <div className="flex justify-between items-center mb-4">
    //             <h2 className="text-xl font-bold">{title}</h2>
    //             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
    //               ✕
    //             </button>
    //           </div>
    //           {children}
    //         </div>
    //       </div>
    //     );
    //   };
    
    //   // Task Form Component
    //   const TaskForm = ({ onSave, onClose, editTask }) => {
    //     const [formData, setFormData] = useState(
    //       editTask || {
    //         title: '',
    //         description: '',
    //         assignee: '',
    //         priority: 'Medium',
    //         dueDate: '',
    //         tags: []
    //       }
    //     );
    
    //     const handleSubmit = (e) => {
    //       e.preventDefault();
    //       onSave(formData);
    //     };
    
    //     return (
    //       <form onSubmit={handleSubmit} className="space-y-4">
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Title</label>
    //           <input
    //             type="text"
    //             value={formData.title}
    //             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    //             className="w-full p-2 border rounded"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Description</label>
    //           <textarea
    //             value={formData.description}
    //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    //             className="w-full p-2 border rounded"
    //             rows="3"
    //           />
    //         </div>
    //         <div className="grid grid-cols-2 gap-4">
    //           <div>
    //             <label className="block text-sm font-medium mb-1">Assignee</label>
    //             <input
    //               type="text"
    //               value={formData.assignee}
    //               onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
    //               className="w-full p-2 border rounded"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium mb-1">Priority</label>
    //             <select
    //               value={formData.priority}
    //               onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
    //               className="w-full p-2 border rounded"
    //             >
    //               <option value="Low">Low</option>
    //               <option value="Medium">Medium</option>
    //               <option value="High">High</option>
    //             </select>
    //           </div>
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Due Date</label>
    //           <input
    //             type="date"
    //             value={formData.dueDate}
    //             onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
    //             className="w-full p-2 border rounded"
    //             required
    //           />
    //         </div>
    //         <div className="flex justify-end space-x-2">
    //           <button
    //             type="button"
    //             onClick={onClose}
    //             className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             type="submit"
    //             className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700"
    //           >
    //             {editTask ? 'Update Task' : 'Create Task'}
    //           </button>
    //         </div>
    //       </form>
    //     );
    //   };
    
    //   return (
    //     <div className="p-6 bg-gray-100 min-h-screen">
    //       {/* Header with Analytics */}
    //       <div className="mb-6">
    //         <h1 className="text-2xl font-bold mb-4">Task Management</h1>
    //         <div className="grid grid-cols-4 gap-4 mb-6">
    //           <div className="bg-white p-4 rounded-lg shadow">
    //             <div className="text-sm text-gray-500">Total Issues</div>
    //             <div className="text-2xl font-bold">{analytics.totalTasks}</div>
    //           </div>
    //           <div className="bg-white p-4 rounded-lg shadow">
    //             <div className="text-sm text-gray-500">Completed</div>
    //             <div className="text-2xl font-bold text-green-600">{analytics.completedTasks}</div>
    //           </div>
    //           <div className="bg-white p-4 rounded-lg shadow">
    //             <div className="text-sm text-gray-500">Pending</div>
    //             <div className="text-2xl font-bold text-yellow-600">{analytics.pendingTasks}</div>
    //           </div>
    //           <div className="bg-white p-4 rounded-lg shadow">
    //             <div className="text-sm text-gray-500">High Priority</div>
    //             <div className="text-2xl font-bold text-red-600">{analytics.highPriorityTasks}</div>
    //           </div>
    //         </div>
    //       </div>
    
    //       {/* Search and Filters */}
    //       <div className="bg-white p-4 rounded-lg shadow mb-6">
    //         <div className="grid grid-cols-5 gap-4">
    //           <div className="col-span-2">
    //             <input
    //               type="text"
    //               placeholder="Search tasks..."
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //               className="w-full p-2 border rounded"
    //             />
    //           </div>
    //           <select
    //             value={filterStatus}
    //             onChange={(e) => setFilterStatus(e.target.value)}
    //             className="p-2 border rounded"
    //           >
    //             <option value="all">All Status</option>
    //             <option value="Pending">Pending</option>
    //             <option value="In Progress">In Progress</option>
    //             <option value="Completed">Completed</option>
    //           </select>
    //           <select
    //             value={filterPriority}
    //             onChange={(e) => setFilterPriority(e.target.value)}
    //             className="p-2 border rounded"
    //           >
    //             <option value="all">All Priorities</option>
    //             <option value="High">High</option>
    //             <option value="Medium">Medium</option>
    //             <option value="Low">Low</option>
    //           </select>
    //           <button
    //             onClick={() => {
    //               setEditTask(null);
    //               setIsModalOpen(true);
    //             }}
    //             className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
    //           >
    //             Add Task
    //           </button>
    //         </div>
    //       </div>
    
    //       {/* Tasks Table */}
    //       <div className="bg-white rounded-lg shadow overflow-hidden">
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-gray-50">
    //             <tr>
    //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Projects
    //               </th>
    //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Assignee
    //               </th>
    //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Due Date
    //               </th>
    //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Priority
    //               </th>
    //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Status
    //               </th>
    //               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                 Actions
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="bg-white divide-y divide-gray-200">
    //             {filteredTasks.map((task) => (
    //               <tr key={task.id} className="hover:bg-gray-50">
    //                 <td className="px-6 py-4">
    //                   <div className="text-sm font-medium text-gray-900">{task.title}</div>
    //                   <div className="text-sm text-gray-500">{task.description}</div>
    //                 </td>
    //                 <td className="px-6 py-4 text-sm text-gray-500">{task.assignee}</td>
    //                 <td className="px-6 py-4 text-sm text-gray-500">
    //                   {new Date(task.dueDate).toLocaleDateString()}
    //                 </td>
    //                 <td className="px-6 py-4">
    //                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
    //                     ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
    //                       task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
    //                       'bg-green-100 text-green-800'}`}>
    //                     {task.priority}
    //                   </span>
    //                 </td>
    //                 <td className="px-6 py-4">
    //                   <button
    //                     onClick={() => handleStatusUpdate(task.id)}
    //                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
    //                       ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
    //                         task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
    //                         'bg-yellow-100 text-yellow-800'}`}>
    //                     {task.status}
    //                   </button>
    //                 </td>
    //                 <td className="px-6 py-4 text-right text-sm font-medium">
    //                   <button
    //                     onClick={() => handleEditTask(task)}
    //                     className="text-blue-600 hover:text-blue-900 mr-3"
    //                   >
    //                     Edit
    //                   </button>
    //                   <button
    //                     onClick={() => handleDeleteTask(task.id)}
    //                     className="text-red-600 hover:text-red-900"
    //                   >
    //                     Delete
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    
    //       {/* Task Modal */}
    //       <Modal
    //         isOpen={isModalOpen}
    //         onClose={() => setIsModalOpen(false)}
    //         title={editTask ? 'Edit Task' : 'Create New Task'}
    //       >
    //         <TaskForm
    //           onSave={handleSaveTask}
    //           onClose={() => setIsModalOpen(false)}
    //           editTask={editTask}
    //         />
    //       </Modal>
    //       {/* Confirmation Modal */}
    //       <Modal
    //         isOpen={isConfirmationOpen}
    //         onClose={() => {
    //           setIsConfirmationOpen(false);
    //           setDeleteTaskId(null);
    //         }}
    //         title="Confirm Delete"
    //       >
    //         <div className="p-4">
    //           <p className="text-gray-600 mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
    //           <div className="flex justify-end space-x-2">
    //             <button
    //               onClick={() => {
    //                 setIsConfirmationOpen(false);
    //                 setDeleteTaskId(null);
    //               }}
    //               className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
    //             >
    //               Cancel
    //             </button>
    //             <button
    //               onClick={handleDeleteConfirm}
    //               className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       </Modal>
    
    //       {/* Empty State */}
    //       {filteredTasks.length === 0 && (
    //         <div className="text-center py-12">
    //           <div className="text-gray-400 text-lg mb-2">
    //             {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
    //               ? 'No tasks match your filters'
    //               : 'No tasks yet'}
    //           </div>
    //           <button
    //             onClick={() => {
    //               setEditTask(null);
    //               setIsModalOpen(true);
    //             }}
    //             className="text-teal-600 hover:text-teal-700"
    //           >
    //             + Add your first task
    //           </button>
    //         </div>
    //       )}
    
    //       {/* Sort Controls */}
    //       <div className="mt-4 flex justify-end items-center space-x-2">
    //         <span className="text-sm text-gray-500">Sort by:</span>
    //         <select
    //           value={sortBy}
    //           onChange={(e) => setSortBy(e.target.value)}
    //           className="p-1 border rounded text-sm"
    //         >
    //           <option value="dateCreated">Date Created</option>
    //           <option value="dueDate">Due Date</option>
    //           <option value="priority">Priority</option>
    //         </select>
    //         <button
    //           onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
    //           className="p-1 text-gray-500 hover:text-gray-700"
    //         >
    //           {sortOrder === 'asc' ? '↑' : '↓'}
    //         </button>
    //       </div>
    
    //       {/* Task Details Drawer - Optional feature for viewing task details */}
    //       {selectedTask && (
    //         <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
    //           <div className="p-6">
    //             <div className="flex justify-between items-center mb-4">
    //               <h3 className="text-lg font-bold">Task Details</h3>
    //               <button
    //                 onClick={() => setSelectedTask(null)}
    //                 className="text-gray-500 hover:text-gray-700"
    //               >
    //                 ✕
    //               </button>
    //             </div>
    //             <div className="space-y-4">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Title</label>
    //                 <div className="text-base">{selectedTask.title}</div>
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Description</label>
    //                 <div className="text-base">{selectedTask.description}</div>
    //               </div>
    //               <div className="grid grid-cols-2 gap-4">
    //                 <div>
    //                   <label className="block text-sm font-medium text-gray-500">Assignee</label>
    //                   <div className="text-base">{selectedTask.assignee}</div>
    //                 </div>
    //                 <div>
    //                   <label className="block text-sm font-medium text-gray-500">Priority</label>
    //                   <div className="text-base">{selectedTask.priority}</div>
    //                 </div>
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Due Date</label>
    //                 <div className="text-base">
    //                   {new Date(selectedTask.dueDate).toLocaleDateString()}
    //                 </div>
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Status</label>
    //                 <div className="text-base">{selectedTask.status}</div>
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Created</label>
    //                 <div className="text-base">
    //                   {new Date(selectedTask.dateCreated).toLocaleDateString()}
    //                 </div>
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-500">Last Updated</label>
    //                 <div className="text-base">
    //                   {new Date(selectedTask.lastUpdated).toLocaleDateString()}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    // );




    const [projects, setProjects] = useState([
      {
        id: 1,
        name: "Website Redesign",
        description: "Redesign company website with new branding",
        expandedState: false,
        issues: [
          {
            id: 101,
            title: "Homepage Layout",
            description: "Create new homepage layout with hero section",
            assignee: "John Doe",
            dueDate: "2025-04-15",
            priority: "High",
            status: "In Progress"
          },
          {
            id: 102,
            title: "Mobile Responsiveness",
            description: "Ensure site works well on all device sizes",
            assignee: "Jane Smith",
            dueDate: "2025-04-20",
            priority: "Medium",
            status: "Not Started"
          }
        ]
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Develop iOS and Android applications",
        expandedState: false,
        issues: [
          {
            id: 201,
            title: "User Authentication",
            description: "Implement secure login system",
            assignee: "Mike Johnson",
            dueDate: "2025-04-10",
            priority: "High",
            status: "In Progress"
          },
          {
            id: 202,
            title: "Push Notifications",
            description: "Set up push notification system",
            assignee: "Sarah Williams",
            dueDate: "2025-04-25",
            priority: "Medium",
            status: "Not Started"
          },
          {
            id: 203,
            title: "Offline Mode",
            description: "Allow app to function without internet",
            assignee: "Mike Johnson",
            dueDate: "2025-05-05",
            priority: "Low",
            status: "Not Started"
          }
        ]
      },
      {
        id: 3,
        name: "Data Migration",
        description: "Migrate data from legacy system to new database",
        expandedState: false,
        issues: [
          {
            id: 301,
            title: "Data Mapping",
            description: "Create mapping between old and new data structures",
            assignee: "Lisa Chen",
            dueDate: "2025-04-08",
            priority: "High",
            status: "Completed"
          }
        ]
      }
    ]);
  
   // State for modals
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showEditIssueModal, setShowEditIssueModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showDeleteIssueModal, setShowDeleteIssueModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Sarah Williams" }
  ]);

  // Toggle project expansion
  const toggleProject = (projectId) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, expandedState: !project.expandedState } 
        : project
    ));
  };

  // Handle status update for an issue
  const handleStatusUpdate = (projectId, issueId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedIssues = project.issues.map(issue => {
          if (issue.id === issueId) {
            let newStatus;
            if (issue.status === "Not Started") newStatus = "In Progress";
            else if (issue.status === "In Progress") newStatus = "Completed";
            else newStatus = "Not Started";
            
            return { ...issue, status: newStatus };
          }
          return issue;
        });
        return { ...project, issues: updatedIssues };
      }
      return project;
    }));
  };

  // Open edit project modal
  const openEditProjectModal = (e, project) => {
    e.stopPropagation();
    setCurrentProject(project);
    setEditFormData({
      name: project.name,
      description: project.description
    });
    setShowEditProjectModal(true);
  };

  // Open edit issue modal
  const openEditIssueModal = (e, projectId, issue) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    setCurrentProject(project);
    setCurrentIssue(issue);
    setEditFormData({
      title: issue.title,
      description: issue.description,
      assignee: issue.assignee,
      dueDate: issue.dueDate,
      priority: issue.priority,
      status: issue.status
    });
    setShowEditIssueModal(true);
  };

  // Open delete project confirmation
  const openDeleteProjectModal = (e, project) => {
    e.stopPropagation();
    setCurrentProject(project);
    setShowDeleteProjectModal(true);
  };

  // Open delete issue confirmation
  const openDeleteIssueModal = (e, projectId, issueId) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    const issue = project.issues.find(i => i.id === issueId);
    setCurrentProject(project);
    setCurrentIssue(issue);
    setShowDeleteIssueModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Save project changes
  const saveProjectChanges = () => {
    setProjects(projects.map(project => 
      project.id === currentProject.id 
        ? { ...project, name: editFormData.name, description: editFormData.description } 
        : project
    ));
    setShowEditProjectModal(false);
  };

  // Save issue changes
  const saveIssueChanges = () => {
    setProjects(projects.map(project => {
      if (project.id === currentProject.id) {
        const updatedIssues = project.issues.map(issue => 
          issue.id === currentIssue.id 
            ? { ...issue, ...editFormData } 
            : issue
        );
        return { ...project, issues: updatedIssues };
      }
      return project;
    }));
    setShowEditIssueModal(false);
  };

  // Delete project
  const deleteProject = () => {
    setProjects(projects.filter(project => project.id !== currentProject.id));
    setShowDeleteProjectModal(false);
  };

  // Delete issue
  const deleteIssue = () => {
    setProjects(projects.map(project => {
      if (project.id === currentProject.id) {
        return {
          ...project,
          issues: project.issues.filter(issue => issue.id !== currentIssue.id)
        };
      }
      return project;
    }));
    setShowDeleteIssueModal(false);
  };

    return (
      <div className="container mx-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Projects
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issues
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <React.Fragment key={project.id}>
              {/* Project Row */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 cursor-pointer" onClick={() => toggleProject(project.id)}>
                  <div className="flex items-center">
                    {project.expandedState ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <div className="ml-2 text-sm font-medium text-gray-900">{project.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.issues.length}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={(e) => openEditProjectModal(e, project)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => openDeleteProjectModal(e, project)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
              {/* Issues Rows (shown when project is expanded) */}
              {project.expandedState && (
                <tr>
                  <td colSpan="4" className="p-0">
                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Issues
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assignee
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Priority
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {project.issues.map((issue) => (
                            <tr key={issue.id} className="hover:bg-gray-50">
                              <td className="px-6 py-3">
                                <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                                <div className="text-sm text-gray-500">{issue.description}</div>
                              </td>
                              <td className="px-6 py-3 text-sm text-gray-500">{issue.assignee}</td>
                              <td className="px-6 py-3 text-sm text-gray-500">
                                {new Date(issue.dueDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-3">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                  ${issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'}`}>
                                  {issue.priority}
                                </span>
                              </td>
                              <td className="px-6 py-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(project.id, issue.id);
                                  }}
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${issue.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                      issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'}`}>
                                  {issue.status}
                                </button>
                              </td>
                              <td className="px-6 py-3 text-right text-sm font-medium">
                                <button
                                  onClick={(e) => openEditIssueModal(e, project.id, issue)}
                                  className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => openDeleteIssueModal(e, project.id, issue.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Edit Project Modal */}
      {showEditProjectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Project</h3>
              <button onClick={() => setShowEditProjectModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowEditProjectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProjectChanges}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Issue Modal */}
      {showEditIssueModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Issue</h3>
              <button onClick={() => setShowEditIssueModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleInputChange}
                  rows="2"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <select
  name="assignee"
  value={editFormData.assignee || ''}
  onChange={handleInputChange}
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
>
  <option value="">Select Assignee</option>
  {teamMembers.map(member => (
    <option key={member.id} value={member.name}>
      {member.name}
    </option>
  ))}
</select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={editFormData.dueDate || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={editFormData.priority || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editFormData.status || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowEditIssueModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveIssueChanges}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Confirmation Modal */}
      {showDeleteProjectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Delete Project</h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete the project "{currentProject.name}"? 
                This will also delete all {currentProject.issues.length} issues within this project. 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteProjectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteProject}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Issue Confirmation Modal */}
      {showDeleteIssueModal && currentIssue && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Delete Issue</h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete the issue "{currentIssue.title}"? 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteIssueModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteIssue}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );

    
  };
  

  

  
  
  // Team Page


const TeamManagement = () => {
  <Team/>

  
  // const [teamMembers, setTeamMembers] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     position: "Project Manager",
  //     email: "john.doe@company.com",
  //     phone: "+1 (555) 123-4567", 
  //     department: "Product Management",
  //     tasks: []
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     position: "Senior Developer",
  //     email: "jane.smith@company.com",
  //     phone: "+1 (555) 234-5678", 
  //     department: "Engineering",
  //     tasks: [
  //       { id: 102, title: "Mobile Responsiveness", project: "Website Redesign" },
  //       { id: 201, title: "User Authentication", project: "Mobile App Development" }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Mike Johnson",
  //     position: "UI/UX Designer",
  //     email: "mike.johnson@company.com",
  //     phone: "+1 (555) 345-6789", 
  //     department: "Design",
  //     tasks: [
  //       { id: 203, title: "Offline Mode", project: "Mobile App Development" },
  //       { id: 201, title: "User Authentication", project: "Mobile App Development" },
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: "Lisa Chen",
  //     position: "Data Analyst",
  //     email: "lisa.chen@company.com",
  //     phone: "+1 (555) 456-7890", 
  //     department: "Data Science",
  //     tasks: [
  //       { id: 301, title: "Data Mapping", project: "Data Migration" }
  //     ]
  //   }
  // ]);

  // const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  // const selectTeamMember = (memberId) => {
  //   const member = teamMembers.find(member => member.id === memberId);
  //   if (member) {
  //     setSelectedMember(member);
  //   }
  // };

  // return (
  //   <div className="container mx-auto px-4 py-8 max-w-6xl">
  //     <div className="flex flex-col md:flex-row gap-6">
  //       {/* Team Members List */}
  //       <div className="w-full md:w-1/4">
  //         <div className="bg-white rounded-lg shadow overflow-hidden">
  //           <div className="bg-teal-700 text-white px-4 py-3">
  //             <h2 className="text-lg font-semibold">Team Members</h2>
  //           </div>
  //           <ul className="divide-y divide-gray-200">
  //             {teamMembers.map(member => (
  //               <li 
  //                 key={member.id}
  //                 className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedMember.id === member.id ? 'bg-blue-50' : ''}`}
  //                 onClick={() => selectTeamMember(member.id)}
  //               >
  //                 <div className="font-medium text-gray-900">{member.name}</div>
  //                 <div className="text-sm text-gray-500">{member.position}</div>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>

  //       {/* Selected Member Details */}
  //       <div className="w-full md:w-3/4">
  //         <div className="bg-white rounded-lg shadow overflow-hidden">
  //           <div className="bg-teal-700 text-white px-6 py-4">
  //             <h1 className="text-2xl font-bold">{selectedMember.name}</h1>
  //             <p className="text-blue-100">{selectedMember.position}</p>
  //           </div>
            
  //           <div className="p-6">
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  //               <div className="flex items-center">
  //                 <Mail className="h-5 w-5 text-gray-400 mr-2" />
  //                 <span className="text-gray-700">{selectedMember.email}</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Phone className="h-5 w-5 text-gray-400 mr-2" />
  //                 <span className="text-gray-700">{selectedMember.phone}</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <User className="h-5 w-5 text-gray-400 mr-2" />
  //                 <span className="text-gray-700">{selectedMember.department}</span>
  //               </div>
  //             </div>

  //             <div className="mt-8">
  //               <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
  //                 <Clipboard className="h-5 w-5 mr-2" />
  //                 Assigned Tasks
  //               </h2>
                
  //               {selectedMember.tasks.length > 0 ? (
  //                 <div className="overflow-x-auto">
  //                   <table className="min-w-full divide-y divide-gray-200">
  //                     <thead className="bg-gray-50">
  //                       <tr>
  //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
  //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
  //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
  //                       </tr>
  //                     </thead>
  //                     <tbody className="bg-white divide-y divide-gray-200">
  //                       {selectedMember.tasks.map(task => (
  //                         <tr key={task.id} className="hover:bg-gray-50">
  //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.id}</td>
  //                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
  //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.project}</td>
  //                         </tr>
  //                       ))}
  //                     </tbody>
  //                   </table>
  //                 </div>
  //               ) : (
  //                 <p className="text-gray-500 italic">No tasks assigned</p>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // <TeamManagementDashboard/>
};

// export default TeamManagement;
  // Render current page content
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'issues':
        return <AllIssues />;
      case 'reports':
        return <IssueLogDashboard />;
      case 'Notification':
        return <NotificationFullPage />;
      case 'TeamManagement':
        return <Team />;
      case 'modules':
        return <TechnologyManagement/>; // <- Make sure this component exists/imported
      case 'logout':
        return <LogoutPage />;
      case 'calender':
        return <CompanyCalendar />;
      default:
        return <DashboardContent />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-teal-700 shadow-lg transition-all duration-300 
        hidden md:block
      `}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          <h1 className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            text-2xl font-bold text-white
          `}>
            Excelligent
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:block"
          >
            {isSidebarOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>

        <nav className="mt-10">
          <ul className="space-y-2 px-4">
            {[
              { icon: <LayoutGrid />, name: 'Dashboard', page: 'dashboard' },
              { icon: <ClipboardListIcon />, name: 'All Issues', page: 'issues' },
              { icon: <BarChart2Icon />, name: 'Reports & Analysis', page: 'reports' },
              { icon: <Blocks />, name: 'Modules', page: 'modules' },
              { icon: <Calendar1  />, name: 'Calender', page: 'calender' },
                       
              { icon: <Users />, name: 'TeamManagement', page: 'TeamManagement' },
              { icon: <Bell />, name: 'Notification', page: 'Notification' },
              { icon: <LogOut />, name: 'LogOut', page: 'logout' }
            ].map((item, index) => (
              <li 
                key={index} 
                className={`
                  hover:bg-teal-800  rounded-lg transition-colors
                  ${currentPage === item.page ? 'bg-teal-700' : ''}
                `}
              >
                <button 
                  onClick={() => setCurrentPage(item.page)}
                  className="flex items-center p-3 space-x-3 w-full text-white"
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-scroll">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
              >
                <Menu />
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex">
              
              <div 
        className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src="/api/placeholder/40/40"
          alt="User"
          className="rounded-full w-10 h-10" 
        />
        <div className="hidden md:block">
          {/* <div className="font-semibold">John Doe</div> */}
        </div>
        <ChevronDown size={16} />
      </div>
      
      {isOpen && (
        <div className="absolute right-7 top-14 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
          <Link to='/p'>
          <div 
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            
          >
            <User size={16} className="mr-2 text-gray-600" />
            <span>Profile</span>
          </div>
          </Link>
          <Link to='/s'>
          <div 
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            
          >
            <Settings size={16} className="mr-2 text-gray-600" />
            <span>Settings</span>
          </div>
          </Link>
         
        </div>
      )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;