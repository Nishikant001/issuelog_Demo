import React, { useState } from 'react';

const currentUser = 'John Doe';

const initialIssues = [
  { title: 'Fix login bug', status: 'In Progress', assignee: 'John Doe', priority: 'High', deadline: 'Apr 15, 2025', description: 'Users are unable to log in with valid credentials.' },
  { title: 'Improve dashboard UI', status: 'Just Started', assignee: 'Jane Smith', priority: 'Medium', deadline: 'Apr 20, 2025', description: 'Need to improve layout and responsiveness.' },
  { title: 'Add password reset', status: 'Completed', assignee: 'John Doe', priority: 'Low', deadline: 'Apr 10, 2025', description: 'Allow users to reset their passwords via email.' },
  { title: 'API Rate Limit Issue', status: 'In Progress', assignee: 'Alex Kim', priority: 'High', deadline: 'Apr 25, 2025', description: 'API fails under high load conditions.' },
  { title: 'Refactor Auth Module', status: 'In Progress', assignee: 'John Doe', priority: 'High', deadline: 'Apr 30, 2025', description: 'Codebase is messy and lacks separation of concerns.' },
];

const teamMembers = ['John Doe', 'Jane Smith', 'Alex Kim', 'Maria Lopez'];
const statusOptions = ['Just Started', 'In Progress', 'Completed'];

const IssuesDashboard = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [modalIssue, setModalIssue] = useState(null);

  const handleReassign = (index, newAssignee) => {
    const updated = [...issues];
    updated[index].assignee = newAssignee;
    setIssues(updated);
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...issues];
    updated[index].status = newStatus;
    setIssues(updated);
  };

  const openModal = (issue) => setModalIssue(issue);
  const closeModal = () => setModalIssue(null);

  const myIssues = issues.filter(issue => issue.assignee === currentUser);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myIssues.map((issue, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">{issue.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  issue.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  issue.status === 'Just Started' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {issue.status}
                </span>
              </div>

              <div className="mb-4 space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Priority</p>
                  <p className="text-sm font-medium">{issue.priority}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-medium">{issue.deadline}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <select
                    value={issue.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Reassign</p>
                  <select
                    value={issue.assignee}
                    onChange={(e) => handleReassign(index, e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                  >
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                onClick={() => openModal(issue)}
              >
                View All
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">{modalIssue.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{modalIssue.description}</p>

            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Priority:</span> {modalIssue.priority}</div>
              <div><span className="font-medium">Deadline:</span> {modalIssue.deadline}</div>
              <div><span className="font-medium">Status:</span> {modalIssue.status}</div>
              <div><span className="font-medium">Assigned to:</span> {modalIssue.assignee}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssuesDashboard;
