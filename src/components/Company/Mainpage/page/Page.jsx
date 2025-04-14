import { useState } from 'react';
import { Briefcase, BarChart2, Check, Users, Clock, Menu, X } from 'lucide-react';
import logo from "../../../../assets/home/home-removebg-preview.png";

export default function IssueLogHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="flex items-center">
                <Briefcase className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">IssueTrack</span>
              </span>
              
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <div className="relative" 
                     onClick={() => setIsLoginHovered(prev => !prev)}
                   >
                <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none">
                  Login
                </button>
                {isLoginHovered && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="/cregistration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Register Company
                    </a>
                    <a href="/emp_reg" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      EMPLOYEE Login 
                    </a>
                    <a href="/customer_login"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Customer Login 
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none">
                    Login
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="/cregistration" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Register Company
                </a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Login to Company
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-teal-700 text-white" >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" data-aos="fade-up">
              Streamline Your Issue Management
            </h1>
            <p className="mt-4 text-xl" data-aos="fade-up">
              Track, manage, and resolve issues efficiently with our comprehensive issue log management system.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a data-aos="fade-up" href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-100">
                Get Started
              </a>
              <a data-aos="fade-up" href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900">
                Live Demo
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <img src={logo} alt="Issue Tracking Dashboard" data-aos="zoom-out-up" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose IssueTrack?</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to manage and resolve issues effectively.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Real-time Analytics</h3>
                <p className="mt-2 text-gray-600">
                  Monitor key metrics and track progress with customizable dashboards and reports.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Team Collaboration</h3>
                <p className="mt-2 text-gray-600">
                  Seamlessly collaborate with your team to resolve issues quickly and efficiently.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Issue Resolution</h3>
                <p className="mt-2 text-gray-600">
                  Streamline workflows and track issue resolution from start to finish.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Time Tracking</h3>
                <p className="mt-2 text-gray-600">
                  Monitor time spent on each issue and improve resource allocation.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Customizable Workflows</h3>
                <p className="mt-2 text-gray-600">
                  Create custom workflows that match your team's unique processes.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Integrations</h3>
                <p className="mt-2 text-gray-600">
                  Connect with your favorite tools to create a seamless workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-teal-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block" data-aos="fade-up">Ready to get started?</span>
            <span className="block text-blue-200" data-aos="fade-up">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a data-aos="fade-up" href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50">
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a data-aos="fade-up" href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Briefcase className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">IssueTrack</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              © 2025 IssueTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}