import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate=useNavigate()

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Signup successful:", formData);
            navigate('/customer_login')
            // Add your signup logic here
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Side - Welcome Message */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-green-500 to-teal-600 items-center justify-center shadow-lg">
                <div className="text-center text-white px-12">
                    <h1 className="text-5xl font-bold mb-6">Join Us!</h1>
                    <p className="text-lg leading-relaxed">
                        Create an account to start managing your issues efficiently. Stay organized and track your progress effortlessly.
                    </p>
                    <div className="mt-8">
                        <img
                            src="https://readytrainingonline.com/wp-content/uploads/2015/04/03.05.24-LEAST-Customer-Service-v2.jpg"
                            alt="Signup Illustration"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-white shadow-lg">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800">Sign Up</h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Create your account to get started.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
                                }`}
                                placeholder="Enter your name"
                                aria-invalid={!!errors.name}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
                                }`}
                                placeholder="Enter your email"
                                aria-invalid={!!errors.email}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
                                }`}
                                placeholder="Enter your password"
                                aria-invalid={!!errors.password}
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
                                }`}
                                placeholder="Confirm your password"
                                aria-invalid={!!errors.confirmPassword}
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <a href="/customer_login" className="text-green-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignup;