import React from 'react'

function CategoryItem({ name, count, color }) {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      red: "from-red-500 to-red-600",
      yellow: "from-yellow-500 to-yellow-600",
      purple: "from-purple-500 to-purple-600",
      pink: "from-pink-500 to-pink-600"
    };
    
    const percentage = (parseInt(count) / 20) * 100;
    
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{name}</span>
          <span className="text-gray-500">{count}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
  

export default CategoryItem
