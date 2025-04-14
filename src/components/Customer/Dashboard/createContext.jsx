import { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const IssueContext = createContext();

// Sample initial issues data
const initialIssues = [
  {
    id: 1,
    title: "Dashboard layout breaks on mobile devices",
    status: "in-progress",
    priority: "high",
    reporter: "Sarah Chen",
    created: "2025-04-08T14:30:00",
    description: "When viewing the dashboard on mobile, the charts overlap and some controls are inaccessible.",
    updatedAt: "2 hours ago"
  },
  {
    id: 2,
    title: "User authentication timeout too short",
    status: "pending",
    priority: "medium",
    reporter: "John Doe",
    created: "2025-04-07T09:15:00",
    description: "Users are being logged out after only 5 minutes of inactivity. This should be increased to at least 30 minutes.",
    updatedAt: "5 hours ago"
  },
  {
    id: 3,
    title: "Export to PDF feature not working",
    status: "completed",
    priority: "high",
    reporter: "Michael Smith",
    created: "2025-04-05T16:45:00",
    description: "When trying to export reports to PDF format, the system shows an error about missing dependencies.",
    updatedAt: "1 day ago"
  },
  {
    id: 4,
    title: "Add dark mode support",
    status: "pending",
    priority: "low",
    reporter: "Emily Johnson",
    created: "2025-04-03T11:20:00",
    description: "Many users have requested a dark mode option to reduce eye strain when working late.",
    updatedAt: "2 days ago"
  }
];

export function IssueProvider({ children }) {
  // Initialize state with data from localStorage if available
  const [issues, setIssues] = useState(() => {
    const savedIssues = localStorage.getItem('issues');
    return savedIssues ? JSON.parse(savedIssues) : initialIssues;
  });

  // Save issues to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  // Function to add a new issue
  const addIssue = (newIssue) => {
    const now = new Date();
    const issueWithId = {
      ...newIssue,
      id: issues.length > 0 ? Math.max(...issues.map(issue => issue.id)) + 1 : 1,
      status: 'pending', // Default status
      created: now.toISOString(),
      updatedAt: "Just now"
    };
    setIssues([issueWithId, ...issues]);
    return issueWithId; // Return the created issue with ID
  };

  // Function to update an issue
  const updateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => 
      issue.id === updatedIssue.id ? { ...updatedIssue, updatedAt: "Just now" } : issue
    ));
  };

  // Function to delete an issue
  const deleteIssue = (issueId) => {
    setIssues(issues.filter(issue => issue.id !== issueId));
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue, updateIssue, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
}

// Custom hook to use the context
export function useIssues() {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}