import React from 'react'

function StatsCard({ title, value, change, icon }) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
          <div className="p-2 rounded-full bg-gray-100">
            {icon}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600">
            {change} from yesterday
          </span>
        </div>
      </div>
    );
  }
  

export default StatsCard
