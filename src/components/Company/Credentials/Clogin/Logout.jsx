import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (Example: remove token, user info, etc.)
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");

    // Redirect to login page after logout
    navigate("/clogin");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-700">Logging out...</h2>
        <p className="text-gray-500">You are being redirected to the login page.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
