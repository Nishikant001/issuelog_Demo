// App.js
import React, { useState, useEffect } from 'react';
import EmployeeTimeTracking from './EmployeeTimeTracking';
import { Plus, X, Edit, Trash, Clock, Users, FileText } from 'lucide-react';

function Team() {
  // State for team members
  const [team, setTeam] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', avatar: '/api/placeholder/40/40', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Backend Developer', avatar: '/api/placeholder/40/40', email: 'jane.smith@example.com' },
    { id: 3, name: 'Mike Johnson', role: 'UI Designer', avatar: '/api/placeholder/40/40', email: 'mike.j@example.com' },
    { id: 4, name: 'Sara Wilson', role: 'Project Manager', avatar: '/api/placeholder/40/40', email: 'sara.w@example.com' },
  ]);

  // State for issues
  const [issues, setIssues] = useState([
    { id: 1, title: 'Fix navbar responsiveness', description: 'Navbar breaks on mobile view', priority: 'High', assignee: 2, status: 'In Progress', createdAt: '2025-04-02' },
    { id: 2, title: 'Implement user authentication', description: 'Create login and signup flows', priority: 'High', assignee: null, status: 'Open', createdAt: '2025-04-03' },
    { id: 3, title: 'Design new logo', description: 'Create modern logo for the app', priority: 'Medium', assignee: 3, status: 'Open', createdAt: '2025-04-05' },
    { id: 4, title: 'Optimize database queries', description: 'Queries are taking too long to execute', priority: 'Medium', assignee: null, status: 'Open', createdAt: '2025-04-06' },
  ]);

  // Current view state
  const [activeView, setActiveView] = useState('issues');
  
  // States for modals
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);
  const [isEditIssueModalOpen, setIsEditIssueModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // Form states
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    status: 'Open'
  });
  
  const [editingIssue, setEditingIssue] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    avatar: '/api/placeholder/40/40'
  });
  
  const [editingMember, setEditingMember] = useState(null);
  
  // Filter states
  const [issueFilters, setIssueFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });
  
  // Reset forms when modals close
  useEffect(() => {
    if (!isAddIssueModalOpen) {
      setNewIssue({
        title: '',
        description: '',
        priority: 'Medium',
        assignee: '',
        status: 'Open'
      });
    }
    
    if (!isAddMemberModalOpen) {
      setNewMember({
        name: '',
        role: '',
        email: '',
        avatar: '/api/placeholder/40/40'
      });
    }
  }, [isAddIssueModalOpen, isAddMemberModalOpen]);

  // CRUD operations for issues
  const handleAddIssue = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    
    const issueToAdd = {
      id: issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1,
      ...newIssue,
      assignee: newIssue.assignee ? parseInt(newIssue.assignee) : null,
      createdAt: currentDate
    };
    
    setIssues(prev => [...prev, issueToAdd]);
    setIsAddIssueModalOpen(false);
  };
  
  const handleUpdateIssue = (e) => {
    e.preventDefault();
    setIssues(prev => 
      prev.map(issue => 
        issue.id === editingIssue.id ? {
          ...editingIssue,
          assignee: editingIssue.assignee ? parseInt(editingIssue.assignee) : null
        } : issue
      )
    );
    setIsEditIssueModalOpen(false);
  };
  
  const handleDeleteIssue = () => {
    setIssues(prev => prev.filter(issue => issue.id !== itemToDelete.id));
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };
  
  // CRUD operations for team members
  const handleAddMember = (e) => {
    e.preventDefault();
    const memberToAdd = {
      id: team.length > 0 ? Math.max(...team.map(m => m.id)) + 1 : 1,
      ...newMember
    };
    
    setTeam(prev => [...prev, memberToAdd]);
    setIsAddMemberModalOpen(false);
  };
  
  const handleUpdateMember = (e) => {
    e.preventDefault();
    setTeam(prev => 
      prev.map(member => 
        member.id === editingMember.id ? editingMember : member
      )
    );
    setIsEditMemberModalOpen(false);
  };
  
  const handleDeleteMember = () => {
    // First reassign any issues assigned to this member
    setIssues(prev => 
      prev.map(issue => 
        issue.assignee === itemToDelete.id ? { ...issue, assignee: null } : issue
      )
    );
    
    // Then delete the member
    setTeam(prev => prev.filter(member => member.id !== itemToDelete.id));
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };
  
  // Helper functions
  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return 'Unassigned';
    const member = team.find(m => m.id === assigneeId);
    return member ? member.name : 'Unknown';
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Open': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-purple-100 text-purple-800';
      case 'Done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Filter issues based on current filters
  const filteredIssues = issues.filter(issue => {
    const statusMatch = issueFilters.status === 'all' || issue.status === issueFilters.status;
    const priorityMatch = issueFilters.priority === 'all' || issue.priority === issueFilters.priority;
    const assigneeMatch = issueFilters.assignee === 'all' || 
                         (issueFilters.assignee === 'unassigned' && !issue.assignee) || 
                         (issue.assignee === parseInt(issueFilters.assignee));
    
    return statusMatch && priorityMatch && assigneeMatch;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-teal-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Team Management System</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveView('issues')}
              className={`flex items-center px-3 py-2 rounded-md ${activeView === 'issues' ? 'bg-teal-800' : 'hover:bg-indigo-700'}`}
            >
              <FileText size={18} className="mr-2" />
              Issues
            </button>
            <button 
              onClick={() => setActiveView('team')}
              className={`flex items-center px-3 py-2 rounded-md ${activeView === 'team' ? 'bg-teal-800' : 'hover:bg-indigo-700'}`}
            >
              <Users size={18} className="mr-2" />
              Team
            </button>
            <button 
              onClick={() => setActiveView('time')}
              className={`flex items-center px-3 py-2 rounded-md ${activeView === 'time' ? 'bg-teal-800' : 'hover:bg-indigo-700'}`}
            >
              <Clock size={18} className="mr-2" />
              Time Tracking
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {/* Issues View */}
        {activeView === 'issues' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Issues</h2>
                <button 
                  onClick={() => setIsAddIssueModalOpen(true)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Issue
                </button>
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={issueFilters.status}
                    onChange={(e) => setIssueFilters({...issueFilters, status: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={issueFilters.priority}
                    onChange={(e) => setIssueFilters({...issueFilters, priority: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="all">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                  <select
                    value={issueFilters.assignee}
                    onChange={(e) => setIssueFilters({...issueFilters, assignee: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="all">All Assignees</option>
                    <option value="unassigned">Unassigned</option>
                    {team.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Issues Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="py-3 px-4 font-medium text-gray-700">ID</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Title</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Priority</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Assignee</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.length > 0 ? (
                      filteredIssues.map(issue => (
                        <tr key={issue.id} className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4">{issue.id}</td>
                          <td className="py-3 px-4 font-medium">{issue.title}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityClass(issue.priority)}`}>
                              {issue.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {issue.assignee ? (
                              <div className="flex items-center">
                                <img 
                                  src={team.find(m => m.id === issue.assignee)?.avatar} 
                                  alt="Avatar" 
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                {getAssigneeName(issue.assignee)}
                              </div>
                            ) : 'Unassigned'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(issue.status)}`}>
                              {issue.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500">{issue.createdAt}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingIssue({...issue, assignee: issue.assignee || ''});
                                  setIsEditIssueModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  setItemToDelete({type: 'issue', id: issue.id, name: issue.title});
                                  setIsDeleteConfirmOpen(true);
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-4 text-center text-gray-500">No issues found matching your filters</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Issue Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Issue Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="text-sm text-indigo-600 font-medium">Total Issues</h4>
                  <p className="text-2xl font-bold">{issues.length}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-blue-600 font-medium">In Progress</h4>
                  <p className="text-2xl font-bold">{issues.filter(i => i.status === 'In Progress').length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm text-green-600 font-medium">Completed</h4>
                  <p className="text-2xl font-bold">{issues.filter(i => i.status === 'Done').length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="text-sm text-red-600 font-medium">High Priority</h4>
                  <p className="text-2xl font-bold">{issues.filter(i => i.priority === 'High').length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Team View */}
        {activeView === 'team' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <button 
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Member
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map(member => (
                  <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-gray-600">{member.role}</p>
                          <p className="text-gray-500 text-sm">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setEditingMember({...member});
                            setIsEditMemberModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setItemToDelete({type: 'member', id: member.id, name: member.name});
                            setIsDeleteConfirmOpen(true);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="font-medium">{issues.filter(issue => issue.assignee === member.id).length}</span> assigned issues
                      </p>
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Workload</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-indigo-500 rounded-full"
                            style={{ width: `${Math.min(100, issues.filter(issue => issue.assignee === member.id).length * 20)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Time Tracking View */}
        {activeView === 'time' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Time Tracking</h2>
            <EmployeeTimeTracking team={team} issues={issues} />
          </div>
        )}
      </main>
      
      {/* Add Issue Modal */}
      {isAddIssueModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Issue</h2>
              <button 
                onClick={() => setIsAddIssueModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddIssue}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Description</label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                  className="w-full border rounded-md p-2 h-32"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Priority</label>
                  <select
                    value={newIssue.priority}
                    onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Assignee</label>
                  <select
                    value={newIssue.assignee}
                    onChange={(e) => setNewIssue({...newIssue, assignee: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Unassigned</option>
                    {team.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Status</label>
                  <select
                    value={newIssue.status}
                    onChange={(e) => setNewIssue({...newIssue, status: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddIssueModalOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Issue Modal */}
      {isEditIssueModalOpen && editingIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Issue</h2>
              <button 
                onClick={() => setIsEditIssueModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateIssue}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={editingIssue.title}
                  onChange={(e) => setEditingIssue({...editingIssue, title: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Description</label>
                <textarea
                  value={editingIssue.description}
                  onChange={(e) => setEditingIssue({...editingIssue, description: e.target.value})}
                  className="w-full border rounded-md p-2 h-32"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Priority</label>
                  <select
                    value={editingIssue.priority}
                    onChange={(e) => setEditingIssue({...editingIssue, priority: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Assignee</label>
                  <select
                    value={editingIssue.assignee}
                    onChange={(e) => setEditingIssue({...editingIssue, assignee: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Unassigned</option>
                    {team.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Status</label>
                  <select
                    value={editingIssue.status}
                    onChange={(e) => setEditingIssue({...editingIssue, status: e.target.value})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditIssueModalOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
   {/* Add Team Member Modal */}
   {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Team Member</h2>
              <button 
                onClick={() => setIsAddMemberModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Role</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Team Member Modal */}
      {isEditMemberModalOpen && editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Team Member</h2>
              <button 
                onClick={() => setIsEditMemberModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateMember}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Role</label>
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditMemberModalOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
              <p className="mt-2 text-gray-600">
                Are you sure you want to delete {itemToDelete.type === 'issue' ? 'issue' : 'team member'} 
                <span className="font-medium"> "{itemToDelete.name}"</span>?
                {itemToDelete.type === 'member' && 
                  ' Any issues assigned to this member will be marked as unassigned.'}
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={itemToDelete.type === 'issue' ? handleDeleteIssue : handleDeleteMember}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;