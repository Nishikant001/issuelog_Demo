import React, { useState } from 'react';
import { Bell, Settings, LogOut, User, Calendar, Mail, Phone, Edit, Save, X } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    role: 'System Administrator',
    department: 'IT Operations',
    location: 'New York, NY',
    employeeId: 'ADM-2023-089',
    memberSince: 'March 2021',
    email: 'alex.morgan@company.com',
    phone: '+1 (555) 123-4567'
  });
  
  const [editedProfile, setEditedProfile] = useState({...profile});
  
  const handleInputChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSave = () => {
    setProfile({...editedProfile});
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white  shadow-lg h-screen ">
      
      {/* Sidebar/Profile Section */}
      <div className=" bg-teal-700 text-white p-8 lg:w-1/3">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 p-1">
              <div className="h-full w-full rounded-full border-4 border-gray-900 overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-5xl">
                  <User size={48} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 h-5 w-5 rounded-full border-4 border-gray-900"></div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-0 right-0 bg-teal-500 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
          
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="text-2xl font-bold mb-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-center w-full"
            />
          ) : (
            <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
          )}
          
          {isEditing ? (
            <input
              type="text"
              name="role"
              value={editedProfile.role}
              onChange={handleInputChange}
              className="text-blue-400 mb-4 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-center w-full"
            />
          ) : (
            <p className="text-white mb-4">{profile.role}</p>
          )}
          
          <div className="flex space-x-4 mb-8">
            <button className=" bg-teal-700 hover:bg-blue-700 transition p-2 rounded-full">
              <Mail size={18} />
            </button>
            <button className="b bg-teal-700 hover:bg-blue-700 transition p-2 rounded-full">
              <Phone size={18} />
            </button>
            <button className=" bg-teal-700 hover:bg-blue-700 transition p-2 rounded-full">
              <Calendar size={18} />
            </button>
          </div>
          
          <div className="w-full space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Department</span>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={editedProfile.department}
                  onChange={handleInputChange}
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-0 text-right w-1/2"
                />
              ) : (
                <span>{profile.department}</span>
              )}
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Location</span>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedProfile.location}
                  onChange={handleInputChange}
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-0 text-right w-1/2"
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Employee ID</span>
              <span>{profile.employeeId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Member Since</span>
              <span>{profile.memberSince}</span>
            </div>
            
            {isEditing && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-0 text-right w-1/2"
                  />
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Phone</span>
                  <input
                    type="text"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-0 text-right w-1/2"
                  />
                </div>
              </>
            )}
            
            {isEditing && (
              <div className="flex space-x-2 pt-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-1"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="p-8 lg:w-2/3">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          
          <div className="flex items-center space-x-4">
            {/* <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button> */}
            {/* <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <Settings size={20} />
            </button> */}
            <button className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition">
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="text-blue-600 mb-2 font-medium">Active Users</div>
            <div className="text-3xl font-bold mb-1">2,845</div>
            <div className="text-green-600 text-sm">+12.5% from last month</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <div className="text-purple-600 mb-2 font-medium">System Uptime</div>
            <div className="text-3xl font-bold mb-1">99.8%</div>
            <div className="text-green-600 text-sm">+0.2% from last month</div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
            <div className="text-amber-600 mb-2 font-medium">Open Tickets</div>
            <div className="text-3xl font-bold mb-1">24</div>
            <div className="text-red-600 text-sm">+8 from last month</div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Settings size={20} />
              </div>
              <div>
                <p className="font-medium">System maintenance completed</p>
                <p className="text-gray-500 text-sm">Updated server configurations and security patches</p>
                <p className="text-gray-400 text-xs mt-1">Today, 09:32 AM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium">New user account created</p>
                <p className="text-gray-500 text-sm">Added Rachel Kim to the Marketing department</p>
                <p className="text-gray-400 text-xs mt-1">Yesterday, 04:15 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-medium">Critical alert resolved</p>
                <p className="text-gray-500 text-sm">Database connection issue fixed in production</p>
                <p className="text-gray-400 text-xs mt-1">Yesterday, 10:23 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;