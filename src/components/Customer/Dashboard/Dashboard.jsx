import { useState, useRef } from 'react';
import { 
  Home, ClipboardList, Users, Tag, MessageSquare, 
  Menu, X, LogOut, AlertCircle, Image, Upload, X as XIcon,
  Clock, User, Calendar, ArrowRight
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import DashboardContent from './DashboardContent';
import MyIssuesContent from './MyIssuesContent';
import ReportedIssuesContent from './ReportedIssuesContent';
// import TeamContent from './TeamContent';
import { AddNewIssueButton } from './AddNewIssueButton';

// New Component for Multiple Image Upload
const MultipleScreenshotUpload = ({ screenshots, setScreenshots }) => {
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Process each file to create preview URLs
    const newScreenshots = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file // Store the actual file for later upload
    }));
    
    setScreenshots(prev => [...prev, ...newScreenshots]);
  };
  
  const removeScreenshot = (id) => {
    setScreenshots(prev => {
      const filtered = prev.filter(screenshot => screenshot.id !== id);
      // Revoke object URL to prevent memory leaks
      const removed = prev.find(screenshot => screenshot.id === id);
      if (removed && removed.url) {
        URL.revokeObjectURL(removed.url);
      }
      return filtered;
    });
  };
  
  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <Image size={20} className="mr-2 text-gray-600" />
        <h3 className="text-md font-medium">Screenshots</h3>
      </div>
      
      {/* Preview Area */}
      {screenshots.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {screenshots.map(screenshot => (
            <div key={screenshot.id} className="relative group">
              <img 
                src={screenshot.url} 
                alt={screenshot.name} 
                className="w-full h-24 object-cover rounded-md border border-gray-300"
              />
              <button 
                onClick={() => removeScreenshot(screenshot.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XIcon size={12} />
              </button>
              <p className="text-xs mt-1 truncate">{screenshot.name}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload Button */}
      <div 
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <Upload className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Click to upload screenshots</p>
        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple
          onChange={handleFileChange} 
        />
      </div>
    </div>
  );
};

// Function to generate license ticket code
const generateLicenseTicketCode = () => {
  const randomNumbers = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `TC${randomNumbers}`;
};

// New component for creating issues with multiple screenshots
const IssueForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [screenshots, setScreenshots] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new issue with screenshots and automatically generate ticket code
    const newIssue = {
      title,
      description,
      priority,
      screenshots, // Include the screenshot data
      assignedTo: null,
      reportedBy: "Current User", // This would normally come from user context/auth
      ticketCode: generateLicenseTicketCode() // Automatically generate code
    };
    
    onSubmit(newIssue);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Issue</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      
      <MultipleScreenshotUpload screenshots={screenshots} setScreenshots={setScreenshots} />
      
      <div className="flex justify-end mt-6 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Create Issue
        </button>
      </div>
    </form>
  );
};

// Update AddNewIssueButton component to use our new form
const UpdatedAddNewIssueButton = ({ onAddIssue }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleSubmit = (newIssue) => {
    onAddIssue(newIssue);
    setIsFormOpen(false);
  };
  
  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <span className="mr-2">+</span>
        <span>New Issue</span>
      </button>
      
      {/* Modal for issue form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl mx-4">
            <IssueForm 
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

// New component for displaying issue details in a modal
const IssueDetailModal = ({ issue, onClose }) => {
  if (!issue) return null;
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  
  // Get status color class
  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get priority color class
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{issue.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Meta information */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(issue.status)}`}>
                {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1 text-blue-500" />
              <span className="text-sm font-mono bg-blue-50 px-2 py-1 rounded">{issue.ticketCode}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-gray-500" />
              <span className="text-sm text-gray-600">{formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1 text-gray-500" />
              <span className="text-sm text-gray-600">{issue.reportedBy}</span>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
              </span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{issue.description}</p>
          </div>
          
          {/* Screenshots */}
          {issue.screenshots && issue.screenshots.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Screenshots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {issue.screenshots.map(screenshot => (
                  <div key={screenshot.id} className="relative">
                    <img 
                      src={screenshot.url} 
                      alt={screenshot.name} 
                      className="w-full h-24 object-cover rounded-md border border-gray-300"
                    />
                    <p className="text-xs mt-1 truncate">{screenshot.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for recent issues section
const RecentIssuesSection = ({ issues, onIssueClick }) => {
  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (date) => {
    const now = new Date();
    const issueDate = new Date(date);
    const diffInMs = now - issueDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Issue</h2>
      
      {issues.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No Issue tickets created yet</p>
      ) : (
        <div>
          {issues.map(issue => (
            <div 
              key={issue.id}
              onClick={() => onIssueClick(issue)}
              className="border-b border-gray-200 last:border-b-0 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{issue.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-mono bg-blue-50 px-1 rounded text-xs mr-3">{issue.ticketCode}</span>
                    <User size={14} className="mr-1" />
                    <span className="mr-3">{issue.reportedBy}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{getRelativeTime(issue.createdAt)}</span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400" />
              </div>
            </div>
          ))}
          
          {issues.length > 5 && (
            <div className="text-center mt-3">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                View All Tickets
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Update the DashboardContent component to include recent issues
const UpdatedDashboardContent = ({ issues }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };
  
  const closeModal = () => {
    setSelectedIssue(null);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <ClipboardList size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Tickets</p>
            <h3 className="text-2xl font-bold">{issues.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <AlertCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Open Tickets</p>
            <h3 className="text-2xl font-bold">
              {issues.filter(issue => issue.status === 'open').length}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <MessageSquare size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Recent Comments</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentIssuesSection issues={issues} onIssueClick={handleIssueClick} />
        
        {/* Additional dashboard widgets could go here */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Issue Status</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Active Issue</h3>
              <div className="text-3xl font-bold text-blue-600">{issues.filter(issue => issue.status === 'open' || issue.status === 'in-progress').length}</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Recently Renewed</h3>
              <div className="text-3xl font-bold text-green-600">
                {issues.filter(issue => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return new Date(issue.createdAt) > oneWeekAgo;
                }).length}
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 className="font-medium text-yellow-800 mb-2">Expiring Soon</h3>
              <div className="text-3xl font-bold text-yellow-600">3</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal issue={selectedIssue} onClose={closeModal} />
      )}
    </div>
  );
};

export default function CustomerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Add sample issues for demonstration
  const [issues, setIssues] = useState([
    {
      id: "1",
      title: "Enterprise License Renewal",
      description: "Client needs to renew their Enterprise package license which expires next month.",
      priority: "high",
      status: "open",
      reportedBy: "Sarah Johnson",
      assignedTo: null,
      createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      screenshots: [],
      ticketCode: "TC12345678"
    },
    {
      id: "2",
      title: "Standard License Upgrade Request",
      description: "Customer wants to upgrade from Standard to Premium license tier.",
      priority: "medium",
      status: "open",
      reportedBy: "Michael Chen",
      assignedTo: null,
      createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      screenshots: [],
      ticketCode: "TC87654321"
    },
    {
      id: "3",
      title: "License Key Activation Issue",
      description: "Customer is unable to activate their license key. Error message: 'Invalid license key format'.",
      priority: "high",
      status: "in-progress",
      reportedBy: "Alex Rodriguez",
      // assignedTo: "Support Team",
      createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
      screenshots: [],
      ticketCode: "TC98765432"
    }
  ]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to add a new issue
  const addNewIssue = (newIssue) => {
    // Add timestamp and ID to the new issue
    const issueWithMetadata = {
      ...newIssue,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'open'
    };
    
    // Update the issues state with the new issue
    setIssues(prevIssues => [issueWithMetadata, ...prevIssues]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <h1 className="text-xl font-bold">Issue Tracker</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <div className="p-4">
          {isSidebarOpen && <p className="text-xs text-gray-400 mb-4">MAIN MENU</p>}
          <nav>
            <SidebarItem 
              icon={<Home size={20} />} 
              text="Dashboard" 
              isExpanded={isSidebarOpen} 
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarItem 
              icon={<ClipboardList size={20} />} 
              text="All Issues" 
              isExpanded={isSidebarOpen}
              isActive={activeTab === 'my-issues'}
              onClick={() => setActiveTab('my-issues')}
              badge={issues.length > 0 ? issues.length.toString() : "0"}
            />
            <SidebarItem 
              icon={<AlertCircle size={20} />} 
              text="Project Reportes" 
              isExpanded={isSidebarOpen}
              isActive={activeTab === 'reported-issues'}
              onClick={() => setActiveTab('reported-issues')}
            />
           
           
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-fit border-t border-gray-700 p-4">
          <SidebarItem
            icon={<LogOut size={20} />} 
            text="Logout" 
            isExpanded={isSidebarOpen}
            onClick={() => alert('Logout clicked')}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Issue Dashboard'}
              {activeTab === 'my-issues' && 'All Issue'}
              {activeTab === 'reported-issues' && 'Projects Reporte'}
             
            </h1>
            <UpdatedAddNewIssueButton onAddIssue={addNewIssue} />
          </div>
        </header>
        
        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <UpdatedDashboardContent issues={issues} />
          )}
          {activeTab === 'my-issues' && (
            <MyIssuesContent issues={issues} setIssues={setIssues} />
          )}
          {activeTab === 'reported-issues' && (
            <ReportedIssuesContent issues={issues} setIssues={setIssues} />
          )}
         
        </main>
      </div>
    </div>
  );
}