import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Image as ImageIcon, X, ChevronLeft } from 'lucide-react';

export default function MyIssuesContent({ issues = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  
  const filteredIssues = issues.filter(issue => {
    // Apply search filter
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  const handleViewImage = (e, issue) => {
    e.stopPropagation(); // Prevent triggering row click
    setSelectedIssue(issue);
    setShowImageModal(true);
  };

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setShowImageModal(false); // Close image modal if open
  };

  const closeModal = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex gap-2">
          <div className="relative inline-block">
            <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            {/* Filter dropdown would go here */}
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      
      {/* Issues Table */}
      {filteredIssues.length > 0 ? (
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screenshot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr 
                  key={issue.id} 
                  onClick={() => handleSelectIssue(issue)} 
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{issue.title}</div>
                    <div className="text-sm text-gray-500">{issue.description.substring(0, 50)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status || 'open'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.reporter || 'Anonymous'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {issue.screenshot ? (
                      <button 
                        className="flex items-center text-blue-600 hover:text-blue-800"
                        onClick={(e) => handleViewImage(e, issue)}
                      >
                        <ImageIcon size={16} className="mr-1" />
                        <span>View</span>
                      </button>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(issue.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-500 hover:text-gray-700" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-md border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No issues found. Try adjusting your search or filters.</p>
          {!issues.length && searchTerm === '' && filterStatus === 'all' && (
            <p className="text-gray-500 mt-2">Use the "New Issue" button to create your first issue.</p>
          )}
        </div>
      )}
      
      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">{selectedIssue.title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Meta information */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                  </span>
                </div>
                {selectedIssue.ticketCode && (
                  <div className="flex items-center">
                    <span className="text-sm font-mono bg-blue-50 px-2 py-1 rounded">{selectedIssue.ticketCode}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{formatDate(selectedIssue.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Reported by: {selectedIssue.reporter || 'Anonymous'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                    {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedIssue.description}</p>
              </div>
              
              {/* Screenshots */}
              {selectedIssue.screenshots && selectedIssue.screenshots.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Screenshots</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedIssue.screenshots.map(screenshot => (
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
              
              {/* Single screenshot (for backward compatibility) */}
              {selectedIssue.screenshot && !selectedIssue.screenshots && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Screenshot</h3>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <img 
                      src={selectedIssue.screenshot} 
                      alt="Issue screenshot" 
                      className="max-w-full max-h-96 object-contain"
                    />
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Screenshot Modal (from original component) */}
      {showImageModal && selectedIssue && selectedIssue.screenshot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Screenshot for: {selectedIssue.title}
              </h3>
              <button 
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-gray-100 p-2 rounded-md flex items-center justify-center max-h-96">
              <img 
                src={selectedIssue.screenshot} 
                alt="Issue screenshot" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Reported by:</strong> {selectedIssue.reporter || 'Anonymous'}</p>
              <p><strong>Date:</strong> {formatDate(selectedIssue.createdAt)}</p>
              <p><strong>Description:</strong> {selectedIssue.description}</p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modified SidebarItem component with updated text for "My Tickets" to "All Issues"
export function UpdatedSidebar({ isSidebarOpen, activeTab, setActiveTab, issues }) {
  return (
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
          text="All Issues" // Changed from "My Tickets" to "All Issues"
          isExpanded={isSidebarOpen}
          isActive={activeTab === 'my-issues'}
          onClick={() => setActiveTab('my-issues')}
          badge={issues.length > 0 ? issues.length.toString() : "0"}
        />
        <SidebarItem 
          icon={<AlertCircle size={20} />} 
          text="Reported Tickets" 
          isExpanded={isSidebarOpen}
          isActive={activeTab === 'reported-issues'}
          onClick={() => setActiveTab('reported-issues')}
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          text="Team" 
          isExpanded={isSidebarOpen}
          isActive={activeTab === 'team'}
          onClick={() => setActiveTab('team')}
        />
        <SidebarItem 
          icon={<Tag size={20} />} 
          text="License Types" 
          isExpanded={isSidebarOpen}
          isActive={activeTab === 'categories'}
          onClick={() => setActiveTab('categories')}
        />
        <SidebarItem 
          icon={<MessageSquare size={20} />} 
          text="Comments" 
          isExpanded={isSidebarOpen}
          isActive={activeTab === 'comments'}
          onClick={() => setActiveTab('comments')}
          badge="2"
        />
      </nav>
    </div>
  );
}

// Updated header component to change "My License Tickets" to "All Issues"
export function UpdatedHeader({ activeTab, onAddIssue }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {activeTab === 'dashboard' && 'License Dashboard'}
          {activeTab === 'my-issues' && 'All Issues'} {/* Changed from "My License Tickets" to "All Issues" */}
          {activeTab === 'reported-issues' && 'Reported License Tickets'}
          {activeTab === 'team' && 'Team Members'}
          {activeTab === 'categories' && 'License Types'}
          {activeTab === 'comments' && 'Recent Comments'}
        </h1>
        <button
          onClick={() => onAddIssue && onAddIssue()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <span className="mr-2">+</span>
          <span>New Issue</span>
        </button>
      </div>
    </header>
  );
}