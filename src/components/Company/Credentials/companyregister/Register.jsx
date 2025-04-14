import { useState, useEffect } from "react";
import { Briefcase, ArrowLeft, ArrowRight, Check, Mail,UserPlus  } from "lucide-react";
import creg from "../../../../assets/c-reg/creg2.jpg";
import { Link } from "react-router-dom";

export default function CompanyRegistration() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    employees: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    requestedEmails: "5",
    phoneNumber: "",
    agreeTerms: false,
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpResendTimer, setOtpResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (otpResendTimer > 0) {
      timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpResendTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);
    
    // Auto focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.split("").slice(0, 6);
    const newOtp = [...otpValue];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtpValue(newOtp);
    
    // Focus on the input after the last pasted digit
    if (digits.length < 6) {
      const nextInput = document.getElementById(`otp-${digits.length}`);
      if (nextInput) nextInput.focus();
    }
  };

  const sendOtp = () => {
    setIsSubmitting(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsSubmitting(false);
      setOtpResendTimer(60); // 60-second cooldown
      setOtpError("");
    }, 1500);
  };

  const verifyOtp = () => {
    const otpString = otpValue.join("");
    
    // Check if OTP is complete
    if (otpString.length !== 6) {
      setOtpError("Please enter the complete 6-digit code");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, let's consider "123456" as the valid OTP
      if (otpString === "123456") {
        setIsSubmitting(false);
        setStep(3); // Move to final step (which was originally step 2)
      } else {
        setIsSubmitting(false);
        setOtpError("Invalid verification code. Please try again.");
      }
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationComplete(true);
    }, 1500);
  };

  const nextStep = () => {
    if (step === 1) {
      // When moving from step 1 to OTP verification
      sendOtp();
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const resendOtp = () => {
    if (otpResendTimer === 0) {
      setOtpValue(["", "", "", "", "", ""]);
      sendOtp();
    }
  };

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Construction",
    "Marketing",
    "Telecommunications",
    "Other",
  ];

  const employeeOptions = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];
  const emailRequestOptions = [
    "5",
    "10",
    "25",
    "50",
    "100",
    "Custom"
  ];

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Registration Complete!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Thank you for registering your company with IssueTrack
              </p>
              <div className="mt-6">
                <a
                  href="/dashboard"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Go to Dashboard
                </a>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-teal-600 hover:text-teal-500"
                >
                  Need help getting started?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                href="#"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Already have an account?{" "}
                <Link to="/clogin">
                <span className="text-teal-600">Sign in</span>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl leading-tight text-gray-900 md:text-6xl font-extrabold uppercase tracking-wide" style={{marginLeft:"10px",marginTop:"10px"}}>
              Register Your Company
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {/* Book-like layout with photo on one side and form on the other */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left side - Photo */}
                <div
                  className="w-full md:w-1/2 flex items-center justify-center p-8 "
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${creg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="relative z-10 text-center">
                    <h1 className="text-4xl text-white md:text-6xl font-extrabold uppercase tracking-wide">
                      Secure Your Spot Today!
                    </h1>
                    <p className="mt-4 text-lg md:text-xl font-medium text-white">
                      Register now and take the first step towards your future.
                    </p>
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="w-full md:w-1/2 p-8">
                  {/* Progress indicator */}
                  <div className="mb-8">
                    <div className="relative">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ 
                             width: step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%"
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <div
                          className={`flex flex-col items-center ${
                            step >= 1 ? "text-teal-600 font-semibold" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                              step >= 1
                                ? "bg-teal-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            1
                          </div>
                          <span>Company</span>
                        </div>
                        <div
                          className={`flex flex-col items-center ${
                            step >= 2 ? "text-teal-600 font-semibold" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                              step >= 2
                                ? "bg-teal-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            2
                          </div>
                          <span>Verify</span>
                        </div>
                        <div
                          className={`flex flex-col items-center ${
                            step >= 3 ? "text-teal-600 font-semibold" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                              step >= 3
                                ? "bg-teal-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            3
                          </div>
                          <span>Emails</span>
                        </div>
                        <div
                          className={`flex flex-col items-center ${
                            step >= 4 ? "text-teal-600 font-semibold" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                              step >= 3
                                ? "bg-teal-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            4
                          </div>
                          <span>Admin</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                          Company Information
                        </h2>
                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="companyName"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Company Name *
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              id="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              placeholder="Enter your company name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="industry"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Industry *
                            </label>
                            <div className="relative">
                              <select
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none"
                              >
                                <option value="">Select an industry</option>
                                {industryOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="employees"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Number of Employees *
                            </label>
                            <div className="relative">
                              <select
                                id="employees"
                                name="employees"
                                value={formData.employees}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none"
                              >
                                <option value="">Select company size</option>
                                {employeeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Company Email *
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              placeholder="company@example.com"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                              This will be used as your company's account email
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                          Verify Email
                        </h2>
                        
                        <div className="rounded-lg bg-blue-50 p-4 mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <Mail className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-blue-800">
                                A verification code has been sent to <span className="font-bold">{formData.email}</span>
                              </p>
                              <p className="mt-2 text-sm text-blue-700">
                                Please check your inbox and enter the 6-digit code below.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Verification Code *
                            </label>
                            <div className="flex justify-between gap-2">
                              {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                  key={index}
                                  id={`otp-${index}`}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={otpValue[index]}
                                  onChange={(e) => handleOtpChange(index, e.target.value)}
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  onPaste={index === 0 ? handlePaste : undefined}
                                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                  required
                                />
                              ))}
                            </div>
                            {otpError && (
                              <p className="mt-2 text-sm text-red-600">
                                {otpError}
                              </p>
                            )}
                          </div>

                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">
                              Didn't receive the code?
                            </p>
                            <button
                              type="button"
                              onClick={resendOtp}
                              disabled={otpResendTimer > 0}
                              className="text-sm font-medium text-teal-600 hover:text-teal-500 disabled:text-gray-400"
                            >
                              {otpResendTimer > 0
                                ? `Resend code in ${otpResendTimer}s`
                                : "Resend code"}
                            </button>
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <div className="text-sm text-gray-500">
                              <p>
                                For demo purposes, use code: <span className="font-bold">123456</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                     {step === 3 && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                          Confirm Email Access
                        </h2>
                        
                        <div className="rounded-lg bg-teal-50 p-4 mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <UserPlus className="h-5 w-5 text-teal-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-teal-800">
                                Request User Access
                              </p>
                              <p className="mt-2 text-sm text-teal-700">
                                How many additional email addresses would you like to add to your company account? These will be approved by an admin before they can be added.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="requestedEmails"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Number of Email Addresses *
                            </label>
                            <div className="relative">
                              <select
                                id="requestedEmails"
                                name="requestedEmails"
                                value={formData.requestedEmails}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none"
                              >
                                {emailRequestOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>

                          {formData.requestedEmails === "Custom" && (
                            <div>
                              <label
                                htmlFor="customEmailCount"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Custom Email Count *
                              </label>
                              <input
                                type="number"
                                name="customEmailCount"
                                id="customEmailCount"
                                min="1"
                                max="500"
                                placeholder="Enter number of emails"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                required
                              />
                            </div>
                          )}

                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-medium text-gray-800 mb-2">What happens next?</h3>
                            <ol className="text-sm text-gray-600 list-decimal pl-5 space-y-2">
                              <li>Your company registration will be submitted for review</li>
                              <li>Once approved, you'll receive confirmation via email</li>
                              <li>You'll be able to add the requested number of email addresses</li>
                              <li>Each user will receive an invitation to join your company workspace</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    )}


                    {step === 4 && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                          Admin Account
                        </h2>
                        <div className="space-y-6">
                          <div className="flex space-x-4">
                            <div className="w-1/2">
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                First Name *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="John"
                              />
                            </div>

                            <div className="w-1/2">
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Last Name *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Doe"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="jobTitle"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Job Title *
                            </label>
                            <input
                              type="text"
                              name="jobTitle"
                              id="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              placeholder="Product Manager"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              id="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div className="pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              Account Password
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Create a secure password for your admin account
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Password *
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              minLength="8"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                              Minimum 8 characters with at least one uppercase
                              letter, number, and special character
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Confirm Password *
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                          </div>

                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="agreeTerms"
                                name="agreeTerms"
                                type="checkbox"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                                className="focus:ring-teal-500 h-5 w-5 text-teal-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="agreeTerms"
                                className="font-medium text-gray-700"
                              >
                                I agree to the{" "}
                                <a
                                  href="#"
                                  className="text-teal-600 hover:text-teal-500"
                                >
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                  href="#"
                                  className="text-teal-600 hover:text-teal-500"
                                >
                                  Privacy Policy
                                </a>{" "}
                                *
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="inline-flex items-center justify-center py-3 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {step === 1 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.companyName || !formData.industry || !formData.employees || !formData.email}
                          className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                          {isSubmitting ? "Sending..." : "Next"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}

                      {step === 2 && (
                        <button
                          type="button"
                          onClick={verifyOtp}
                          disabled={isSubmitting || otpValue.join("").length !== 6}
                          className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                          {isSubmitting ? "Verifying..." : "Verify & Continue"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}
{step === 3 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.companyName || !formData.industry || !formData.employees || !formData.email}
                          className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                          {isSubmitting ? "Sending..." : "Next"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}

                      {step === 4 && (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                          {isSubmitting
                            ? "Registering..."
                            : "Complete Registration"}
                          {!isSubmitting && <Check className="ml-2 h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
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