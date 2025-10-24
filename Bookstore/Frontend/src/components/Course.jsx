import React from 'react';
import list from "../../public/list.json";
// 1. Import the NAMED export { Card } (singular)
import { Card } from './Cards'; 
import { Link  } from 'react-router-dom';


function Course() {
  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24'>
        <div className='text-2xl font-semibold py-10 items-center justify-center text-center'>
          <h1 className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            We're delighted to have you here!
          </h1>
          <Link to='/'>
                   <button className='mt-12 text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                             hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                             focus:ring-cyan-300 dark:focus:ring-cyan-800 
                             font-medium rounded-lg text-sm px-4 py-2.5 text-centers'>
            Back
          </button>
          </Link>
 
        </div>
        
        {/* 2. Add the grid layout here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {
            list.map((item)=>(
              // 3. Use the <Card /> (singular) component
              <Card key = {item.id} item={item}/> 
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Course;