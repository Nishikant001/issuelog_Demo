// components/TeamModal.jsx
import React, { useState, useEffect } from 'react';

const TeamModal = ({ isOpen, onClose, onSave, team }) => {
  const [formData, setFormData] = useState({ name: '', lead: '', memberCount: 0 });
  const isEditing = !!team;

  useEffect(() => {
    if (team) {
      setFormData({
        id: team.id,
        name: team.name,
        lead: team.lead,
        memberCount: team.memberCount || 0
      });
    } else {
      setFormData({ name: '', lead: '', memberCount: 0 });
    }
  }, [team, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      memberCount: parseInt(formData.memberCount, 10) || 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Team' : 'Add Team'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              placeholder="Enter team name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamLead">
              Team Lead
            </label>
            <input
              id="teamLead"
              type="text"
              placeholder="Enter team lead name"
              className="w-full p-2 border rounded"
              value={formData.lead}
              onChange={(e) => setFormData({...formData, lead: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="memberCount">
              Member Count
            </label>
            <input
              id="memberCount"
              type="number"
              min="0"
              placeholder="Enter number of members"
              className="w-full p-2 border rounded"
              value={formData.memberCount}
              onChange={(e) => setFormData({...formData, memberCount: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamModal;

