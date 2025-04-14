import React from 'react'


function StatusGroup({ title, count, color }) {
    const colorClasses = {
      red: "text-red-600",
      blue: "text-blue-600",
      yellow: "text-yellow-600",
      green: "text-green-600",
      gray: "text-gray-600"
    };
    
    return (
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{count}</p>
      </div>
    );
  }
  

export default StatusGroup
