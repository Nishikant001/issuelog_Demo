import React, { useState } from "react";
import logo from "../../../assets/Images/logo-Exelligent.png";
import { FaUserCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

// import { useEffect } from "react";

export default function Navbar({ onToggleDashboard }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="h-20  fixed z-90 w-full flex justify-between items-center bg-white ">
        <div className=" ">
          <img
            src={logo}
            alt=""
            className=" ml-7"
            onClick={onToggleDashboard}
          />
        </div>
        <div className="items-end flex ">
          <div className="hidden md:flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <div className="flex items-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white h-10 w-30  px-4 py-2 rounded-md transition duration-300">
                Sign Up
              </button>
              <button className="text-gray-700 hover:text-blue-500 h-10 w-30 px-4 py-2 rounded-md transition duration-300 hover:bg-gray-200">
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-end ">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimesCircle className="h-6 w-6  " />
            ) : (
              <FaBarsStaggered className="h-12 w-12 pr-4 mr-15 " />
            )}
          </button>
        </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="flex flex- items-center  pt-2 pb-4 bg-transparent">
            <FaUserCircle className="h-15 w-20 mr-3 text-gray-600 bg-transparent" />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10 pr-3  rounded-md transition duration-300">
              Sign Up
            </button>
            <button className="w-full text-gray-700 hover:text-blue-500 h-10 pr-3 rounded-md border border-gray-300 transition duration-300">
              Sign In
            </button>
          </div>
        </div>
      )}
            </div>

    </>
  );
}
