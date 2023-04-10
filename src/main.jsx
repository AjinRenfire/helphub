import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter, 
  createRoutesFromElements
} from 'react-router-dom'

// components
import SideNav from './Components/side-nav-component/SideNav';

// routes
import HomePage from './routes/home-page'
import LoginPage, { LoginAction } from './routes/login-page/login-page'
import SignupPage, { SignUpAction } from './routes/signup-page/signup-page'
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
      <Route path='/login' element={<LoginPage />} action={LoginAction} >
        <Route path='/login/:user'  />
      </Route>
      <Route 
        path='/signup' 
        element={<SignupPage/>} 
        action={SignUpAction}/>
      <Route path='/app' element={<SideNav/>}>
        <Route index element={<DashboardPage/>} />
        <Route />
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
