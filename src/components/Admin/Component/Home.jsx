import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import homeimg from "../../../assets/Images/homeimg1.jpg";
import jibansir from "../../../assets/Images/jibansir.jpeg";

export default function Home() {
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "Exelligent Consultant Service",
    industry: "Technology",
    employeeCount: "150+",
    foundedYear: "2014",
    jobRole: "Chief Executive Officer",
    profileImage: null
  });
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  
  const toggleDashboard = () => {
    setIsDashboardVisible(prevState => !prevState);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobile && isDashboardVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-30 backdrop-blur-sm"
          onClick={() => setIsDashboardVisible(false)}
        />
      )}

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-90vh overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                      <img 
                        src={formData.profileImage || jibansir} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange} 
                      accept="image/*"
                      className="hidden" 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click to change profile photo</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Chief Executive Officer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Founded Year
                      </label>
                      <input
                        type="text"
                        name="foundedYear"
                        value={formData.foundedYear}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Count
                    </label>
                    <input
                      type="text"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <Dashboard isVisible={isDashboardVisible} isMobile={isMobile} />
      <Navbar onToggleDashboard={toggleDashboard} />
      
      <main 
        className={`transition-all duration-300 ease-in-out ${
          isDashboardVisible ? (isMobile ? 'ml-0' : 'md:ml-64 lg:ml-72') : 'ml-0'
        }`}
      >
        {/* Hero Section with Gradient Overlay */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
          <img 
            src={homeimg}
            alt="Company header" 
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white mx-4 sm:mx-6 lg:mx-8 rounded-xl -mt-12 md:-mt-16 shadow-lg relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start p-4 md:p-6">
            <div className="bg-white shadow-lg rounded-full h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 -mt-20 md:-mt-24 flex items-center justify-center z-10 border-4 border-white">
              <img 
                src={formData.profileImage || jibansir} 
                alt="CEO Portrait" 
                className="object-cover rounded-full h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36"
              />
            </div>
            
            <div className="w-full px-3 sm:px-5 pt-4 md:pt-2">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-center md:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    {formData.companyName}
                  </h1>
                  <p className="text-sm md:text-base text-blue-600 font-medium mt-1">
                    Software Development & IT Solutions
                  </p>
                  
                  {/* Added job role display here */}
                  <p className="text-sm md:text-base text-gray-700 mt-2 font-medium">
                    {formData.jobRole}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:justify-start text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
                      </svg>
                      <span><span className="font-semibold">Industry:</span> {formData.industry}</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span><span className="font-semibold">Size:</span> {formData.employeeCount} employees</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span><span className="font-semibold">Founded:</span> {formData.foundedYear}</span>
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
                  <button 
                    onClick={handleOpenModal}
                    className="bg-blue-600 h-15 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transform transition-transform hover:scale-102 hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="font-medium text-gray-500 text-sm md:text-base">Active Issues</div>
            <div className="font-bold text-2xl md:text-3xl text-gray-800 my-1">32</div>
            <div className="text-green-600 text-xs md:text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              6 Active This Month
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transform transition-transform hover:scale-102 hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="font-medium text-gray-500 text-sm md:text-base">Team Members</div>
            <div className="font-bold text-2xl md:text-3xl text-gray-800 my-1">152</div>
            <div className="text-green-600 text-xs md:text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              12 New This Quarter
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transform transition-transform hover:scale-102 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="font-medium text-gray-500 text-sm md:text-base">Client Rating</div>
            <div className="font-bold text-2xl md:text-3xl text-gray-800 my-1">4.6/5.0</div>
            <div className="text-green-600 text-xs md:text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              Improved by 0.2 This Month
            </div>
          </div>
        </div>

        {/* Recent Activity and Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 mt-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Recent Activity</h2>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">New contract signed</span>
                    <span className="text-gray-500 text-xs">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Contract with TechSphere for system integration finalized</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Project milestone completed</span>
                    <span className="text-gray-500 text-xs">5 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Phase 1 of DataSync project delivered on schedule</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Team meeting scheduled</span>
                    <span className="text-gray-500 text-xs">Yesterday</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Quarterly strategy meeting set for next Monday at 10 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">New client onboarded</span>
                    <span className="text-gray-500 text-xs">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">GlobalTech Inc. has been successfully onboarded</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
<div className="bg-white rounded-xl shadow-md p-5">
  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Project Overview</h2>
  
  <div className="space-y-4">
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Active Projects</span>
        <span className="text-sm font-medium text-gray-700">24/30</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
      </div>
    </div>
    
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Team Capacity</span>
        <span className="text-sm font-medium text-gray-700">85%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
      </div>
    </div>
    
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Budget Utilization</span>
        <span className="text-sm font-medium text-gray-700">65%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
      </div>
    </div>
    
    <div className="pt-2">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Upcoming Deadlines</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm">CloudSync Migration</span>
          <span className="text-xs font-medium text-red-600">Tomorrow</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm">API Integration</span>
          <span className="text-xs font-medium text-orange-600">3 days</span>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </main>
    </div>
  );
}