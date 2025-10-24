import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 px-4 pt-24 pb-12">
      <div className="max-w-screen-2xl container mx-auto md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-6">
            About Bookbazaar
          </h1>
          
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
            Your trusted destination for discovering and exploring books online
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to Bookbazaar, where the love of reading meets the convenience of modern technology. Founded with a passion for literature and a vision to make books accessible to everyone, we've built a platform that connects readers with their next great read.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              In today's digital age, we believe that discovering and enjoying books should be easier than ever. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems across various genres, Bookbazaar is your one-stop destination for all things books.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our mission is simple: to foster a community of readers and make quality literature accessible to all. We're constantly updating our library and improving our platform to provide you with the best possible reading experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Vast Collection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Thousands of books across all genres, from classics to contemporary bestsellers
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Easy Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find your next favorite book with our intuitive search and recommendation features
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Join a thriving community of book lovers sharing reviews and recommendations
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Reading Community</h2>
            <p className="text-lg mb-6 opacity-90">
              Start your literary journey with Bookbazaar today. Explore, discover, and immerse yourself in the world of books.
            </p>
            <button className="bg-white text-cyan-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Browse Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;