import React, { useState } from 'react';
import { Calendar, Plus, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CompanyCalendar = () => {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("April 2025");
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: 'April 3, 9:00 AM', type: 'Meeting', employees: ['John Doe', 'Jane Smith'] },
    { id: 2, title: 'Project Review', date: 'April 8, 2:00 PM', type: 'Review', employees: ['Mike Johnson', 'Sarah Williams', 'David Brown'] },
    { id: 3, title: 'Client Call', date: 'April 12, 11:30 AM', type: 'Call', employees: ['Jane Smith'] }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'Meeting',
    employees: []
  });

  const [allEmployees, setAllEmployees] = useState([
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown', 
    'Lisa Garcia', 'Robert Chen', 'Emily Taylor', 'Michael Wilson', 'Amanda Lopez'
  ]);

  const handlePrevMonth = () => {
    setCurrentMonth("March 2025");
  };

  const handleNextMonth = () => {
    setCurrentMonth("May 2025");
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const formattedDate = `${newEvent.date}, ${newEvent.time}`;
      setEvents([...events, {
        id: events.length + 1,
        title: newEvent.title,
        date: formattedDate,
        type: newEvent.type, 
        employees: newEvent.employees
      }]);
      
      setNewEvent({
        title: '',
        date: '',
        time: '',
        type: 'Meeting',
        employees: []
      });
      
      setShowAddEventModal(false);
    }
  };

  const toggleEmployeeSelection = (employee) => {
    if (newEvent.employees.includes(employee)) {
      setNewEvent({...newEvent, employees: newEvent.employees.filter(e => e !== employee)});
    } else {
      setNewEvent({...newEvent, employees: [...newEvent.employees, employee]});
    }
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'Meeting': return 'bg-green-100 text-green-800';
      case 'Review': return 'bg-purple-100 text-purple-800';
      case 'Call': return 'bg-yellow-100 text-yellow-800';
      case 'Workshop': return 'bg-blue-100 text-blue-800';
      case 'Deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIconColor = (type) => {
    switch(type) {
      case 'Meeting': return 'bg-green-100 text-green-600';
      case 'Review': return 'bg-purple-100 text-purple-600';
      case 'Call': return 'bg-yellow-100 text-yellow-600';
      case 'Workshop': return 'bg-blue-100 text-blue-600';
      case 'Deadline': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow ">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Company Calendar</h2>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md flex items-center gap-1"
              onClick={() => setShowAddEventModal(true)}
            >
              <Plus size={16} /> Add Event
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <button className="p-1 text-gray-500" onClick={handlePrevMonth}><ChevronLeft /></button>
            <h3 className="text-lg font-medium">{currentMonth}</h3>
            <button className="p-1 text-gray-500" onClick={handleNextMonth}><ChevronRight /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2 text-sm font-medium text-gray-500">{day}</div>
            ))}
            
            {Array.from({ length: 30 }).map((_, i) => {
              const isToday = i === 6;
              const hasEvent = [2, 7, 11, 18, 24].includes(i);
              return (
                <div 
                  key={i} 
                  className={`h-16 p-1 border border-gray-100 ${
                    isToday ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="text-right">
                    <span className={`text-sm ${
                      isToday ? 'font-bold text-blue-600' : 'text-gray-700'
                    }`}>
                      {i + 1}
                    </span>
                  </div>
                  {hasEvent && (
                    <div className="mt-1">
                      <div className={`text-xs px-1 py-0.5 rounded truncate ${
                        i === 2 ? 'bg-green-100 text-green-800' :
                        i === 7 ? 'bg-purple-100 text-purple-800' :
                        i === 11 ? 'bg-yellow-100 text-yellow-800' :
                        i === 18 ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {i === 2 ? 'Team Meeting' :
                         i === 7 ? 'Project Review' :
                         i === 11 ? 'Client Call' :
                         i === 18 ? 'Workshop' :
                         'Deadline'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getEventIconColor(event.type)}`}>
                    <Calendar size={16} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </div>
                </div>
                
                <div className="mt-2 flex items-center">
                  <Users size={14} className="text-gray-400 mr-1" />
                  <p className="text-xs text-gray-500">
                    {event.employees.length ? event.employees.join(', ') : 'No attendees'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Event</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    placeholder="April 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    placeholder="10:00 AM"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Review">Review</option>
                  <option value="Call">Call</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Deadline">Deadline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Employees</label>
                <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                  {allEmployees.map((employee) => (
                    <div key={employee} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={`employee-${employee}`}
                        checked={newEvent.employees.includes(employee)}
                        onChange={() => toggleEmployeeSelection(employee)}
                        className="mr-2"
                      />
                      <label htmlFor={`employee-${employee}`} className="text-sm">{employee}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-3">
                <button 
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddEvent}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCalendar;