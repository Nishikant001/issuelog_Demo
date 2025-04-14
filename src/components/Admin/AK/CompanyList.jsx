// components/CompanyList.jsx
import React, { useState } from 'react';

const CompanyList = ({ 
  companies, 
  selectedCompanyId, 
  onSelectCompany, 
  onAddCompany, 
  onUpdateCompany, 
  onDeleteCompany 
}) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({ name: '', description: '' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddCompany(newCompany);
    setNewCompany({ name: '', description: '' });
    setIsAddFormVisible(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateCompany(editingCompany);
    setEditingCompany(null);
  };

  const handleDelete = (e, company) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
      onDeleteCompany(company.id);
    }
  };

  return (
    <div className="w-64 shadow- bg-white shadow-xl overflow-y-auto">
      <div className="p-4 shadow-xl flex justify-between items-center">
        <h2 className="text-lg font-semibold">Companies</h2>
        <button 
          onClick={() => setIsAddFormVisible(!isAddFormVisible)}
          className="p-1 rounded-full bg-blue-500 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {isAddFormVisible && (
        <div className="p-4 ">
          <form onSubmit={handleAddSubmit}>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border rounded"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={newCompany.description}
                onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddFormVisible(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
      
      <ul>
        {companies.map(company => (
          <li 
            key={company.id}
            className={`shadow-xl
               ${selectedCompanyId === company.id ? 'bg-blue-50' : ''}`}
          >
            {editingCompany && editingCompany.id === company.id ? (
              <div className="p-4">
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full p-2 border rounded"
                      value={editingCompany.name}
                      onChange={(e) => setEditingCompany({...editingCompany, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full p-2 border rounded"
                      value={editingCompany.description}
                      onChange={(e) => setEditingCompany({...editingCompany, description: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingCompany(null)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div 
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => onSelectCompany(company.id)}
              >
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.description}</p>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCompany({...company});
                    }}
                    className="p-1 text-gray-500 hover:text-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, company)}
                    className="p-1 text-gray-500 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;

