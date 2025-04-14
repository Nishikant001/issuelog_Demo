import React from 'react'

function IssuePriorityBadge({ priority }) {
    const priorityColors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[priority]}`}>
        {priority}
      </span>
    );
  }

export default IssuePriorityBadge
