import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter, 
  createRoutesFromElements
} from 'react-router-dom'

// components
import Navbar from './components/Navbar'

// routes
import HomePage from './routes/home-page'
import LoginPage from './routes/login-page/login-page'
import SignupPage from './routes/signup-page/signup-page'

// css
import './index.css'

// creating a router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
      <Route index element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
