import React from 'react'
import IssueStatusBadge from './IssueStatusBadge';
import { 
     MoreHorizontal
  } from 'lucide-react';
import IssuePriorityBadge from './IssuePriorityBadge';

function IssueItem({ title, id, status, priority, assignee, created, dueDate }) {
    return (
      <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">{id}</span>
              <IssueStatusBadge status={status} />
              <IssuePriorityBadge priority={priority} />
            </div>
            <h3 className="font-medium text-gray-900 mt-1">{title}</h3>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="flex justify-between mt-3 text-sm text-gray-500">
          <div className="flex items-center">
            <img src="/api/placeholder/24/24" alt="User" className="w-5 h-5 rounded-full mr-2" />
            {assignee}
          </div>
          <div>
            {created && <span>{created}</span>}
            {dueDate && <span>Due: {dueDate}</span>}
          </div>
        </div>
      </div>
    );
  }
  

export default IssueItem
