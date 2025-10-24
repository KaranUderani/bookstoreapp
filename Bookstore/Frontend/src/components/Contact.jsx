import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    let newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let hasError = false;

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      hasError = true;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      hasError = true;
    }

    setErrors(newErrors);

    // If there are errors, stop submission
    if (hasError) {
      return;
    }

    // Log the information to console
    console.log('Contact Form Submitted:');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Message:', formData.message);
    console.log('-------------------');

    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setErrors({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 px-4 pt-24 pb-12">
      <div className="max-w-screen-2xl container mx-auto md:px-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input input-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 ${
                    errors.name ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                  Email Address
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
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`textarea textarea-bordered w-full bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-white placeholder-gray-400 resize-none ${
                    errors.message ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                           hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                           focus:ring-cyan-300 dark:focus:ring-cyan-800 
                           font-medium rounded-lg text-sm px-4 py-3 text-center"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-cyan-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">support@bookbazaar.com</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-cyan-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-cyan-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;