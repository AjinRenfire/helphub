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
import Navbar from './Components/Navbar';
import SideNav from './Components/side-nav-component/SideNav';

// routes
import HomePage from './routes/home-page'
import LoginPage from './routes/login-page/login-page'
import SignupPage from './routes/signup-page/signup-page'
import DashboardPage from './routes/dashboard/DashboardPage';

// contexts
import UserContextProvider from './contexts/user.context'

// css
import './index.css'

// creating a router
const router = createBrowserRouter(
  createRoutesFromElements(
   
    <Route path='/' >
      <Route index element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='/app' element={<SideNav/>}>
        <Route index element={<DashboardPage/>} />
      </Route>
    </Route>
     
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
