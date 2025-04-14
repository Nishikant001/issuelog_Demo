import { useState } from "react";
import { Briefcase, Eye, EyeOff, Mail, Lock } from "lucide-react";
import loginBg from "../../../../assets/c-login/clogin.jpg"; // You'll need to add this image
import { Link } from "react-router-dom";

export default function CompanyLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // For demo purposes - validate credentials here
      if (formData.email === "admin@example.com" && formData.password === "password") {
        // Successful login would redirect
        window.location.href = "/dashboard";
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0 flex items-center">
                <Briefcase className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  IssueTrack
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <a
                href="/cregistration"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Don't have an account?{" "}
                
                <span className="text-teal-600">Register</span>
                
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full space-y-8">
          {/* Card container */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Left side - Image and text */}
            <div
              className="w-full md:w-1/2 p-8 flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center">
                <h1 className="text-4xl text-white md:text-5xl font-extrabold uppercase tracking-wide">
                  Welcome Back
                </h1>
                <p className="mt-4 text-lg md:text-xl font-medium text-white">
                  Log in to access your IssueTrack dashboard
                </p>
              </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>

              {loginError && (
                <div className="mb-6 bg-red-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {loginError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-teal-600 hover:text-teal-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1C5.03 1 1 5.03 1 10c0 3.97 2.58 7.35 6.16 8.54.45.08.62-.2.62-.44v-1.54c-2.5.55-3.03-1.06-3.03-1.06-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.11-1-4.11-4.44 0-.98.35-1.78.93-2.41-.09-.23-.4-1.15.09-2.4 0 0 .76-.24 2.5.93A8.74 8.74 0 0110 5.24c.85 0 1.7.11 2.5.33 1.74-1.17 2.5-.93 2.5-.93.5 1.25.18 2.17.09 2.4.58.63.93 1.43.93 2.41 0 3.45-2.1 4.21-4.11 4.44.32.28.61.82.61 1.66v2.46c0 .24.16.52.62.44C16.42 17.35 19 13.97 19 10c0-4.97-4.03-9-9-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <div className="mb-2">
                  For demo purposes, use:
                </div>
                <div className="font-mono bg-gray-100 p-2 rounded-lg inline-block">
                  Email: admin@example.com
                  <br />
                  Password: password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Briefcase className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-sm font-semibold text-gray-500">
                IssueTrack
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-xs">
              © 2025 IssueTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}