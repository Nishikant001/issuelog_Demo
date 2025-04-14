import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Smartphone,
  Globe,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Demo data - simulating database
const DEMO_USERS = {
  "user@example.com": { otp: "123456", name: "Demo User" },
  "test@example.com": { otp: "654321", name: "Test User" },
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [otpRequested, setOtpRequested] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);

  // Initialize Toastify
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Completely replaced with demo implementation - no more fetch call
  const requestOTP = () => {
    if (!formData.email || !isValidEmail(formData.email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    // Simulate API call delay
    setIsOtpSending(true);
    setTimeout(() => {
      if (DEMO_USERS[formData.email] || formData.email.includes("@")) {
        setOtpRequested(true);
        notifySuccess("OTP has been sent to your email");
        
        // For demo purposes, show OTP in console for testing
        if (DEMO_USERS[formData.email]) {
          console.log(`Demo OTP for ${formData.email}: ${DEMO_USERS[formData.email].otp}`);
        } else {
          console.log("Demo mode: Use '123456' as OTP for this email");
        }
      } else {
        notifyError("Email not found in our system");
      }
      setIsOtpSending(false);
    }, 1500);
  };

  // Also completely replaced with demo implementation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.otp || formData.otp.length !== 6) {
      notifyError("Please enter a valid 6-digit OTP");
      return;
    }

    // Simulate API verification delay
    setTimeout(() => {
      // Check if user exists and OTP matches
      if (DEMO_USERS[formData.email] && DEMO_USERS[formData.email].otp === formData.otp) {
        notifySuccess(`Welcome back, ${DEMO_USERS[formData.email].name}!`);
        // Simulate redirect to dashboard
        console.log("Redirecting to dashboard...");
      } else if (!DEMO_USERS[formData.email] && formData.otp === "123456") {
        // For non-registered emails, use default OTP
        notifySuccess("Login Successful!");
        console.log("Demo login successful");
      } else {
        notifyError("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // For demo purposes, display available test accounts
  useEffect(() => {
    console.log("Demo accounts available:");
    Object.keys(DEMO_USERS).forEach(email => {
      console.log(`Email: ${email}, OTP: ${DEMO_USERS[email].otp}`);
    });
    console.log("For any other email, use OTP: 123456");
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 bg-teal-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="z-10 text-white text-center relative">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-xl mb-10 max-w-md mx-auto opacity-90">
            {isLogin
              ? "Seamlessly connect to your workspace and continue your productivity journey."
              : "Create your account and unlock a world of collaborative possibilities."}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {isLogin ? "Login to Excelligent" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Join our platform in just a few steps"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Demo mode: Try with user@example.com (OTP: 123456) or any email (OTP: 123456)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                required
                disabled={otpRequested}
              />
              {!otpRequested && (
                <button
                  type="button"
                  onClick={requestOTP}
                  disabled={isOtpSending}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors"
                >
                  {isOtpSending ? "Sending..." : "Request OTP"}
                </button>
              )}
            </div>

            {otpRequested && (
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full tracking-widest text-center text-lg font-semibold uppercase px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
            )}

            {otpRequested && (
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 text-white rounded-lg hover:bg-blue-700 transition-colors group"
                style={{ backgroundColor: "#0E6775" }}
              >
                Verify OTP
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;