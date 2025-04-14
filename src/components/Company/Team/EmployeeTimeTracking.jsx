import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeTimeTracking = ({ team, issues }) => {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates());
  const [timeEntries, setTimeEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    employeeId: '',
    issueId: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: ''
  });
  
  // Initialize with some sample data
  useEffect(() => {
    const sampleEntries = [
      { id: 1, employeeId: 1, issueId: 1, date: '2025-04-01', hours: 4, description: 'Working on navbar responsiveness' },
      { id: 2, employeeId: 1, issueId: 2, date: '2025-04-02', hours: 6, description: 'Started implementing authentication flows' },
      { id: 3, employeeId: 2, issueId: 2, date: '2025-04-03', hours: 7, description: 'Backend work for authentication' },
      { id: 4, employeeId: 3, issueId: 3, date: '2025-04-04', hours: 5, description: 'Initial logo design concepts' },
      { id: 5, employeeId: 4, issueId: 1, date: '2025-04-05', hours: 2, description: 'Project planning' },
      { id: 6, employeeId: 2, issueId: 4, date: '2025-04-05', hours: 4, description: 'Investigating database performance' }
    ];
    
    setTimeEntries(sampleEntries);
  }, []);
  
  // Helper function to get an array of dates for the current week
  function getWeekDates(startDate = new Date()) {
    const dates = [];
    const currentDate = new Date(startDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    
    currentDate.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      dates.push(date);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    const firstDay = new Date(currentWeek[0]);
    firstDay.setDate(firstDay.getDate() - 7);
    setCurrentWeek(getWeekDates(firstDay));
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    const firstDay = new Date(currentWeek[0]);
    firstDay.setDate(firstDay.getDate() + 7);
    setCurrentWeek(getWeekDates(firstDay));
  };
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Format date for day name
  const formatDay = (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Get employee name by ID
  const getEmployeeName = (id) => {
    const employee = team.find(e => e.id === id);
    return employee ? employee.name : 'Unknown';
  };
  
  // Get issue title by ID
  const getIssueTitle = (id) => {
    const issue = issues.find(i => i.id === id);
    return issue ? issue.title : 'Unknown';
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newEntry.employeeId || !newEntry.issueId || !newEntry.hours) {
      alert('Please fill in all required fields');
      return;
    }
    
    const entryToAdd = {
      id: timeEntries.length > 0 ? Math.max(...timeEntries.map(e => e.id)) + 1 : 1,
      employeeId: parseInt(newEntry.employeeId),
      issueId: parseInt(newEntry.issueId),
      date: newEntry.date,
      hours: parseFloat(newEntry.hours),
      description: newEntry.description
    };
    
    setTimeEntries(prev => [...prev, entryToAdd]);
    
    // Reset form
    setNewEntry({
      employeeId: '',
      issueId: '',
      date: new Date().toISOString().split('T')[0],
      hours: '',
      description: ''
    });
  };
  
  // Get total hours for a specific employee and date
  const getHoursForEmployeeAndDate = (employeeId, date) => {
    const entries = timeEntries.filter(entry => 
      entry.employeeId === employeeId && 
      entry.date === date.toISOString().split('T')[0]
    );
    
    return entries.reduce((total, entry) => total + entry.hours, 0);
  };
  
  // Get total weekly hours for an employee
  const getWeeklyHoursForEmployee = (employeeId) => {
    const weekDates = currentWeek.map(date => date.toISOString().split('T')[0]);
    
    const entries = timeEntries.filter(entry => 
      entry.employeeId === employeeId && 
      weekDates.includes(entry.date)
    );
    
    return entries.reduce((total, entry) => total + entry.hours, 0);
  };
  
  return (
    <div>
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Calendar size={20} className="text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium">
            Week of {formatDate(currentWeek[0])} - {formatDate(currentWeek[6])}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousWeek}
            className="flex items-center border p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => setCurrentWeek(getWeekDates())}
            className="border px-3 py-2 rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button 
            onClick={goToNextWeek}
            className="flex items-center border p-2 rounded hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Time Entry Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-3">Log Time</h4>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Employee</label>
              <select
                value={newEntry.employeeId}
                onChange={(e) => setNewEntry({...newEntry, employeeId: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Employee</option>
                {team.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Issue</label>
              <select
                value={newEntry.issueId}
                onChange={(e) => setNewEntry({...newEntry, issueId: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Issue</option>
                {issues.map(issue => (
                  <option key={issue.id} value={issue.id}>{issue.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Hours</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={newEntry.hours}
                onChange={(e) => setNewEntry({...newEntry, hours: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit" 
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
              >
                Log Time
              </button>
            </div>
          </div>
          
          <div className="mt-3">
            <label className="block text-sm text-gray-600 mb-1">Description (optional)</label>
            <textarea
              value={newEntry.description}
              onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
              className="w-full border rounded-md p-2"
              rows="2"
            />
          </div>
        </form>
      </div>
      
      {/* Time Tracking Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">Employee</th>
              {currentWeek.map(date => (
                <th key={date.toString()} className="py-3 px-4 text-center font-medium text-gray-700 border-b">
                  <div>{formatDay(date)}</div>
                  <div className="text-xs font-normal">{formatDate(date)}</div>
                </th>
              ))}
              <th className="py-3 px-4 text-center font-medium text-gray-700 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {team.map(employee => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.role}</div>
                    </div>
                  </div>
                </td>
                
                {currentWeek.map(date => {
                  const hours = getHoursForEmployeeAndDate(employee.id, date);
                  return (
                    <td key={date.toString()} className="py-3 px-4 text-center border-b">
                      {hours > 0 ? (
                        <div className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded inline-flex items-center">
                          <Clock size={14} className="mr-1" />
                          {hours}h
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
                
                <td className="py-3 px-4 text-center font-medium border-b">
                  {getWeeklyHoursForEmployee(employee.id)}h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Recent Time Entries */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Time Entries</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4 font-medium text-gray-700">Employee</th>
                <th className="py-3 px-4 font-medium text-gray-700">Issue</th>
                <th className="py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="py-3 px-4 font-medium text-gray-700">Hours</th>
                <th className="py-3 px-4 font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {[...timeEntries]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(entry => (
                  <tr key={entry.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{getEmployeeName(entry.employeeId)}</td>
                    <td className="py-3 px-4">{getIssueTitle(entry.issueId)}</td>
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">{entry.hours}h</td>
                    <td className="py-3 px-4 text-gray-600">{entry.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTimeTracking;