import React, { useState } from 'react';
import { AtSign, Lock, User, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Form submitted', formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Illustration Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-700 items-center justify-center p-12">
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 400 300" 
            className="mx-auto max-w-full h-64"
          >
            {/* Cartoon Character */}
            <circle cx="200" cy="150" r="100" fill="#FFD700" /> {/* Head */}
            <circle cx="170" cy="130" r="15" fill="white" /> {/* Left Eye */}
            <circle cx="230" cy="130" r="15" fill="white" /> {/* Right Eye */}
            <circle cx="170" cy="130" r="5" fill="black" /> {/* Left Pupil */}
            <circle cx="230" cy="130" r="5" fill="black" /> {/* Right Pupil */}
            <path d="M170 170 Q200 200 230 170" stroke="black" fill="transparent" /> {/* Smile */}
            
            {/* Body */}
            <rect x="150" y="250" width="100" height="50" fill="#4CAF50" />
            
            {/* Arms */}
            <line x1="150" y1="260" x2="100" y2="220" stroke="#4CAF50" strokeWidth="20" />
            <line x1="250" y1="260" x2="300" y2="220" stroke="#4CAF50" strokeWidth="20" />
          </svg>
          <h2 className="text-3xl font-bold text-white mt-6">Welcome Aboard!</h2>
          <p className="text-white mt-4">Join our community and start your journey</p>
        </div>
      </div>

      {/* Signup Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          <Link to='/login'>
            <button 
              type="submit" 
              className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            </Link>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;