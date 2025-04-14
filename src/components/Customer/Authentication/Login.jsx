import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate=useNavigate()
    // const history=

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
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
            console.log("Login successful:", formData);
            navigate('/customer_dashboard')

            // Add your login logic here
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Image or Text */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center">
                <div className="text-center text-white px-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg">
                        Manage your issues efficiently with our system. Log in to access your dashboard and stay updated.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800">Log In</h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Please log in to your account
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
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
                                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
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
                                    errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                                placeholder="Enter your password"
                                aria-invalid={!!errors.password}
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <a href="/customer_sinup" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
