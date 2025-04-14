import React from 'react'
import { 
 
    Calendar

  } from 'lucide-react';

// Calendar Component
const CalendarPage = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Add Event</button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <button className="p-1 text-gray-500">&lt;</button>
            <h3 className="text-lg font-medium">April 2025</h3>
            <button className="p-1 text-gray-500">&gt;</button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2 text-sm font-medium text-gray-500">{day}</div>
            ))}
            
            {/* Placeholder for calendar days */}
            {Array.from({ length: 30 }).map((_, i) => {
              const isToday = i === 6;
              const hasEvent = [3, 8, 12, 19, 25].includes(i);
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
                        i === 3 ? 'bg-green-100 text-green-800' :
                        i === 8 ? 'bg-purple-100 text-purple-800' :
                        i === 12 ? 'bg-yellow-100 text-yellow-800' :
                        i === 19 ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {i === 3 ? 'Team Meeting' :
                         i === 8 ? 'Project Review' :
                         i === 12 ? 'Client Call' :
                         i === 19 ? 'Workshop' :
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
            {[
              { title: 'Team Meeting', date: 'April 3, 9:00 AM', type: 'Meeting' },
              { title: 'Project Review', date: 'April 8, 2:00 PM', type: 'Review' },
              { title: 'Client Call', date: 'April 12, 11:30 AM', type: 'Call' }
            ].map((event, i) => (
              <div key={i} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  event.type === 'Meeting' ? 'bg-green-100 text-green-600' :
                  event.type === 'Review' ? 'bg-purple-100 text-purple-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <Calendar size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  

export default CalendarPage
