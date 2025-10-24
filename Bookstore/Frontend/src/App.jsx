import React from 'react'
import Home from './home/Home'
import { Routes, Route } from "react-router-dom"
import Courses from './courses/Courses'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Signup from './components/Signup'
import Contact from './components/Contact'  // Add this
import About from './components/About' // Add this

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/contact" element={<Contact/>} />  {/* Add this */}
        <Route path="/about" element={<About/>} />      {/* Add this */}
      </Routes>
    </DarkModeProvider>
  )
}

export default App