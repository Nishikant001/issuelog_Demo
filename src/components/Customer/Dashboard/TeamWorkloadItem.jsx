import React from 'react'
import { 
    MoreHorizontal
  } from 'lucide-react';

function TeamWorkloadItem({ name, role, active, completed, avatar }) {
    return (
      <div className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
        <div className="flex items-center">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <p className="font-medium text-blue-600">{active}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="font-medium text-green-600">{completed}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    );
  }
  

export default TeamWorkloadItem
