import React from 'react'
import Home from './home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Courses from './courses/Courses'
import Signup from './components/Signup'
import Contact from './components/Contact'
import About from './components/About'
import CartPage from './components/CartPage'
import GenreBooks from './components/GenreBooks'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './contexts/AuthProvider';

function App() {
  const { authUser, setAuthUser } = useAuth();
    console.log(authUser);
  
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/cart" 
            element={authUser ? <CartPage /> : <Navigate to="/signup" />} 
          />
          <Route 
            path="/genre/:genre" 
            element={authUser ? <GenreBooks /> : <Navigate to="/signup" />} 
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App