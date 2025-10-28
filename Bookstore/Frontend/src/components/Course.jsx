import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './Cards'; 
import { Link } from 'react-router-dom';

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://bookstoreapp-01kq.onrender.com/api/books");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

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
                      font-medium rounded-lg text-sm px-4 py-2.5 text-center'>
              Back
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {book.length > 0 ? (
            book.map((item) => (
              <Card key={item._id} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
              No books available. Please add some books!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
