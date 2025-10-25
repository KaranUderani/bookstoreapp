import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    let newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let hasError = false;

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      hasError = true;
    }

    // Validate Email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        hasError = true;
      }
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);

    // If there are errors, stop submission
    if (hasError) {
      return;
    }

    // Prepare data for backend
    const userInfo = {
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    // Send to backend
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(res.data);
      
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        
        // Clear the form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Navigate to home or previous page
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4 pt-24">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`input input-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 ${
                errors.fullName ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 ${
                errors.email ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 ${
                errors.password ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 ${
                errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                       hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                       focus:ring-cyan-300 dark:focus:ring-cyan-800 
                       font-medium rounded-lg text-sm px-4 py-2.5 text-center mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text font-semibold hover:underline"
            onClick={() => document.getElementById("my_modal_3")?.showModal()}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;