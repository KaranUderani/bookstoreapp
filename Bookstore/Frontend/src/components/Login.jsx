import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    let newErrors = { email: '', password: '' };
    let hasError = false;

    // Check if fields are not empty
    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email';
        hasError = true;
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    setErrors(newErrors);

    // If there are errors, stop submission
    if (hasError) {
      return;
    }

    // Prepare data for backend
    const userInfo = {
      email: email,
      password: password,
    };

    // Send to backend
    try {
      const res = await axios.post("https://bookstoreapp-01kq.onrender.com/user/login", userInfo);
      console.log(res.data);
      
      if (res.data) {
        toast.success("Logged in Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        
        // Clear the form
        setEmail('');
        setPassword('');
        setErrors({ email: '', password: '' });
        
        // Close modal
        document.getElementById("my_modal_3").close();
        
        // Reload page after 1 second to update UI
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
        <h3 className="font-bold text-lg">Login</h3>
        <p className="py-4 text-gray-700 dark:text-gray-300">
          Please enter your details below:
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`input input-bordered w-full bg-white dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                errors.email ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              className={`input input-bordered w-full bg-white dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                errors.password ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                      hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                      focus:ring-cyan-300 dark:focus:ring-cyan-800 
                      font-medium rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Not registered?{" "}
          <Link to="/signup" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text font-semibold cursor-pointer hover:underline">
            Sign up
          </Link>
        </p>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn dark:bg-slate-800 dark:text-white dark:border-gray-600">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Login;