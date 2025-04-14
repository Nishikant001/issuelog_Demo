import React, { useState } from "react";
import Logo from "../../assets/Images/logo-Exelligent.png";
import { FaLocationDot } from "react-icons/fa6";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

export default function Footer() {
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardVisible((prevState) => !prevState);
  };

  return (
    <>
      <Dashboard isVisible={isDashboardVisible} />
      <Navbar onToggleDashboard={toggleDashboard} />
      <div
        className={`transition-all duration-300 z-50 ease-in-out ${
          isDashboardVisible ? "ml-[290px]" : "ml-0"
        }  min-h-40 pl-6 pt-6 pr-6 bg-cyan-950 text-white`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="bg-white p-2 w-64">
            <img src={Logo} alt="Excelligent Logo" />
          </div>

          {/* Company Info */}
          <div className="flex flex-col">
            <div className="font-bold">Excelligent Consultancy & Services</div>
            <div>"Our Preparation is your Profit"</div>
          </div>

          {/* Location Info */}
          <div>
            <span className="flex items-center gap-1">
              <FaLocationDot /> <span>Location</span>
            </span>
            <div>Samantarapur, Oldtown, Bhubaneswar, Odisha</div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="font-bold">Contact Details</div>
            <div>
              Phone: <span>9958583205</span>
            </div>
            <div>
              Email: <span>jibanjena@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
