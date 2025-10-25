import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { CartProvider } from './contexts/CartProvider'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DarkModeProvider>
      <AuthProvider>
        <CartProvider>
          <App/>
        </CartProvider>
      </AuthProvider>
    </DarkModeProvider>
  </BrowserRouter>
)