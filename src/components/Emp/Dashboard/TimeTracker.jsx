import React, { useState, useEffect } from 'react';

const TimeTracker = () => {
  const [session, setSession] = useState({
    startTime: null,
    endTime: null,
    isWorking: false,
    isOnBreak: false,
    currentBreakStart: null,
    totalWorkTime: 0,
    totalBreakTime: 0,
    lastUpdateTime: null
  });
  
  const [breaks, setBreaks] = useState([]);
  const [breakReason, setBreakReason] = useState('');
  const [elapsedTime, setElapsedTime] = useState({ work: 0, break: 0 });

  // Timer effect for tracking elapsed time
  useEffect(() => {
    let intervalId;
    
    if (session.isWorking) {
      intervalId = setInterval(() => {
        const now = new Date();
        
        if (session.isOnBreak && session.currentBreakStart) {
          // Calculate break time
          const breakDuration = Math.floor((now - session.currentBreakStart) / 1000);
          setElapsedTime(prev => ({ ...prev, break: prev.break + 1 }));
        } else if (session.lastUpdateTime) {
          // Calculate work time
          const workDuration = Math.floor((now - session.lastUpdateTime) / 1000);
          setElapsedTime(prev => ({ ...prev, work: prev.work + 1 }));
        }
        
        setSession(prev => ({ ...prev, lastUpdateTime: now }));
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [session.isWorking, session.isOnBreak, session.currentBreakStart, session.lastUpdateTime]);

  // Format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    const now = new Date();
    setSession({
      startTime: now,
      endTime: null,
      isWorking: true,
      isOnBreak: false,
      currentBreakStart: null,
      totalWorkTime: 0,
      totalBreakTime: 0,
      lastUpdateTime: now
    });
    setBreaks([]);
    setElapsedTime({ work: 0, break: 0 });
  };

  const handleEnd = () => {
    setSession(prev => ({
      ...prev,
      endTime: new Date(),
      isWorking: false,
      isOnBreak: false
    }));
  };

  const handleBreak = () => {
    if (!breakReason.trim()) {
      alert("Please provide a reason for the break.");
      return;
    }
    
    const now = new Date();
    const newBreak = { 
      reason: breakReason, 
      startTime: now,
      endTime: null,
      duration: 0
    };
    
    setBreaks(prev => [...prev, newBreak]);
    setSession(prev => ({
      ...prev,
      isOnBreak: true,
      currentBreakStart: now
    }));
    setBreakReason('');
  };

  const handleResumeWork = () => {
    const now = new Date();
    
    // Update the current break with end time and duration
    setBreaks(prev => {
      const updatedBreaks = [...prev];
      const currentBreakIndex = updatedBreaks.length - 1;
      
      if (currentBreakIndex >= 0) {
        const breakDuration = Math.floor((now - session.currentBreakStart) / 1000);
        updatedBreaks[currentBreakIndex] = {
          ...updatedBreaks[currentBreakIndex],
          endTime: now,
          duration: breakDuration
        };
      }
      
      return updatedBreaks;
    });
    
    setSession(prev => ({
      ...prev,
      isOnBreak: false,
      currentBreakStart: null,
      lastUpdateTime: now
    }));
  };

  // Calculate total time for summary
  const getTotalBreakTime = () => {
    return breaks.reduce((total, breakItem) => {
      const duration = breakItem.duration || 0;
      return total + duration;
    }, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Time Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">Session Info</h3>
          <p><span className="font-medium">Start:</span> {session.startTime ? session.startTime.toLocaleTimeString() : '--'}</p>
          <p><span className="font-medium">End:</span> {session.endTime ? session.endTime.toLocaleTimeString() : '--'}</p>
          <p><span className="font-medium">Status:</span> {
            !session.isWorking ? 'Not working' : 
            session.isOnBreak ? 'On break' : 'Working'
          }</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">Time Summary</h3>
          <p><span className="font-medium">Work time:</span> {formatTime(elapsedTime.work)}</p>
          <p><span className="font-medium">Break time:</span> {formatTime(elapsedTime.break)}</p>
          <p><span className="font-medium">Total breaks:</span> {breaks.length}</p>
        </div>
      </div>
      
      {!session.isWorking ? (
        <button 
          onClick={handleStart} 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Start Work Session
        </button>
      ) : (
        <div className="space-y-4">
          {!session.isOnBreak ? (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Break Reason</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={breakReason}
                  onChange={(e) => setBreakReason(e.target.value)}
                  placeholder="E.g., Lunch, Meeting, Coffee"
                  className="p-2 border rounded-md flex-grow"
                />
                <button
                  onClick={handleBreak}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors whitespace-nowrap"
                >
                  Take Break
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleResumeWork}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Resume Work
            </button>
          )}
          
          <button
            onClick={handleEnd}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            End Session
          </button>
        </div>
      )}
      
      {breaks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Break Log</h3>
          <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-y-auto">
            <table className="w-full table-auto">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Reason</th>
                  <th className="text-left py-2">Start</th>
                  <th className="text-left py-2">End</th>
                  <th className="text-left py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {breaks.map((b, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2">{b.reason}</td>
                    <td className="py-2">{b.startTime.toLocaleTimeString()}</td>
                    <td className="py-2">{b.endTime ? b.endTime.toLocaleTimeString() : '--'}</td>
                    <td className="py-2">{b.duration ? formatTime(b.duration) : '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTracker;