import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import Dashboard from "./components/Company/dashboard/Dashboard";
import SignupPage from "./components/login/Signup";
// import SettingsPage from "./components/profile/setting/Setting";
import MinimalistAdminSettings from "./components/profile/setting/Setting";
import UserProfile from "./components/profile/profile/Profile";
import ModernUserProfile from "./components/profile/profile/Profile";
import IssueLogHomePage from "./components/Company/Mainpage/page/Page";
import AOS from "aos";
import "aos/dist/aos.css";
import CompanyRegistration from "./components/Company/Credentials/companyregister/Register";
import CompanyLogin from "./components/Company/Credentials/Clogin/Login";
import Team from "./components/Company/Team/Team";
import NotificationSystem from "./components/Company/Notification/Notification";
import RegisterForm from "./components/Emp/Reg";
import EmployeeDetailsForm from "./components/Emp/Details";
import EmployeeDashboard from "./components/Emp/Dashboard/Dashboard";
import TechnologyManagement from "./components/Company/Modules/Module";

import NotFound from "./components/404/NotFound";
import EmployeeProfile from "./components/Emp/profile/EmpProfile";
import Signup from "./components/Customer/Authentication/Signup";
import CustomerLogin from "./components/Customer/Authentication/Login";
import CustomerDashboard from "./components/Customer/Dashboard/Dashboard";

// import TeamManagementDashboard from "./components/Company/Team/Team";

// admin page
import Homepage from "./components/Admin/Pages/Homepage";
import CompanyModuleManager from "./components/Admin/Pages/All_Issue";
import EmployeeManagement from "./components/Admin/Pages/EmployeeManagement";
import Model from "./components/Admin/AK/Model";
import AdminDashboard from "./components/Admin/Pages/Admin";
import TechNavigationSystem from "./components/Admin/Pages/Dash";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/s" element={<MinimalistAdminSettings />} />
        <Route path="/p" element={<UserProfile />} />
        <Route path="/" element={<IssueLogHomePage />} />
        <Route path="/cregistration" element={<CompanyRegistration />} />
        <Route path="/clogin" element={<CompanyLogin />} />
        {/* <Route path="/team" element={<TeamManagementDashboard />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/n" element={<NotificationSystem />} />
        <Route path="/emp_reg" element={<Login />} />
        <Route path="/emp" element={<EmployeeDetailsForm />} />
        <Route path="/empdashboard" element={<EmployeeDashboard />} />
        <Route path="/empP" element={<EmployeeProfile />} />
        {/* <Route path="/modules" element={<TechnologyManagement />} /> */}

        <Route path="*" element={<NotFound />} />

        {/* Customer */}
        <Route path="/customer_sinup" element={<Signup />} />
        <Route path="/customer_login" element={<CustomerLogin />} />
        <Route path="/customer_dashboard" element={<CustomerDashboard />} />

        {/* admin */}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/All_Issue" element={<CompanyModuleManager />} />
        <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="/Dash" element={<TechNavigationSystem />} />
        <Route path="/Model" element={<Model />} />
        <Route path="/Admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
