import React from "react";
import { LuPencilLine } from "react-icons/lu";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Dashboard({ isVisible }) {
  return (
    <>
      <div
        className={` fixed z-10 h-11/12 w-73 mt-20 flex bg-sky-900 logo   transition-all duration-300
                  ${isVisible ? "ml-0" : "-ml-[300px]"}`}
      >
        <div className="">
          {/* <div className="bg-white h-20 border-b-1 border-black flex items-center">
            <img src={logo} alt="" />
          </div> */}
          <div className="">
            <NavLink to={"/homepage"}>
              <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-9 text-white flex items-center">
                <FaHome className="text-black w-5 h-5 ml-8 mr-1" />
                Home
              </button>
            </NavLink>
          </div>
          <div className="">
            <NavLink to={"/Admin"}>
              <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-4 text-white flex items-center">
                <LuPencilLine className="text-black w-5 h-5 ml-8 mr-1" />
                Dashboard
              </button>
            </NavLink>
          </div>

          <NavLink to="/All_Issue">
            <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-4 text-white flex items-center ">
              <RiInboxArchiveLine className="text-black w-5 h-5 ml-8 mr-1" />
              All Issues
            </button>
          </NavLink>
          <NavLink to="/Dash">
          <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-4 text-white flex items-center ">
            <MdOutlineAssignmentTurnedIn className="text-black w-5 h-5 ml-8 mr-1" />
            My Assignment
          </button>
          </NavLink>
          <NavLink to="/Model">
            <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-4 text-white flex items-center ">
              <GoReport className="text-black w-5 h-5 ml-8 mr-1" />
              Reports & Analysis
            </button>
          </NavLink>
          <NavLink to="/EmployeeManagement">
            <button className="font-medium bg-sky-900 hover:bg-sky-500   h-12 w-73 mt-4 text-white flex items-center ">
              <RiTeamFill className="text-black w-5 h-5 ml-8 mr-1" />
              Team Management
            </button>
          </NavLink>
          <button className="font-medium bg-sky-900 hover:bg-sky-500 h-12 w-73 mt-4 text-white flex items-center ">
            <MdOutlineSettingsSuggest className="text-black w-5 h-5 ml-8 mr-1" />
            Settings{" "}
          </button>
        </div>
      </div>
    </>
  );
}
