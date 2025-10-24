import React from 'react'
import banner from "../../public/Banner.jpg.jpg"

function Banner() {
  return (
       <>
   <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row bg-white dark:bg-slate-900 min-h-screen">
    <div className="w-full md:w-1/2 mt-20"> 
    <div className='space-y-6'>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
    The door creaks open.    
    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        stories sense your arrival
    </span>
    </h1>
    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
    Step closer,every page holds a secret waiting to be found.
    </p>
    
    <label className="input input-bordered bg-white dark:bg-slate-800 dark:border-gray-600 dark:text-white">
    <svg className="h-[1em] opacity-50 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
        >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </g>
    </svg>
    <input type="email" placeholder="mail@site.com" required className="bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400" />
    </label>
    <div className="validator-hint hidden text-gray-500 dark:text-gray-400">Enter valid email address</div>   
    </div>

    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 
                    hover:from-cyan-600 hover:to-blue-600 
                    text-white font-medium rounded-lg px-5 py-2.5 
                    focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800">
    Secondary
    </button>

    </div>
    <div className="w-full md:w-1/2 mt-20">
      <img src={banner} className='w-145 h-110 rounded-lg shadow-lg' alt='Bookstore banner'/>
    </div>
   </div>
   
   </>
  )
}

export default Banner