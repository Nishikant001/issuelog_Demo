// components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="px-6 py-3 bg-gray-700">
            <a href="#" className="flex items-center">
              <span className="ml-3">Companies</span>
            </a>
          </li>
          <li className="px-6 py-3">
            <a href="#" className="flex items-center">
              <span className="ml-3">Users</span>
            </a>
          </li>
          <li className="px-6 py-3">
            <a href="#" className="flex items-center">
              <span className="ml-3">Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
