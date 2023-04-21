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
import PostJobPage, { PostJobAction } from './routes/posting-job/post-job-page';
import MyJobsPage from './routes/my-jobs-page/my-jobs';
import MyActiveJobs from './routes/my-active-jobs/my-active-jobs';
import JobsListingPage from './routes/jobs-listing/jobs-listing-page';
import JobsDetailsPage from './routes/job-details-page/job-details-page';
import JobActivitesPage from './routes/jobactivities/JobActivitesPage';
import ShopPage from './routes/shop/ShopPage';

// contexts
import UserContextProvider from './contexts/user.context';

// firebase
import { allJobsPostedByTheUser } from './firebase/firebase.job';

// css
import './index.css'

// creating a router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      {/* Index Page */}
      <Route index element={<HomePage />} />

      {/* Login Page */}
      <Route 
        path='/login' 
        element={<LoginPage />} 
        action={LoginAction} 
      />

      {/* Signup Page */}
      <Route 
        path='/signup' 
        element={<SignupPage/>} 
        action={SignUpAction}
      />

      {/* Pages after the user logged in */}
      <Route path='/app' element={<SideNav/>}>
        {/* Dashboard page */}
        <Route index element={<DashboardPage/>} />

        {/* Posting job Page */}
        <Route 
          path='/app/post' 
          element={<PostJobPage/>}
          action={PostJobAction}
        />

        {/* My Jobs Page */}
        <Route 
          path='/app/my-jobs' 
          element={<MyJobsPage/>}
          loader={await allJobsPostedByTheUser}
        >
          {/* Active Jobs */}
          <Route index path='/app/my-jobs/active' element={<MyActiveJobs/>} />
        </Route>

        {/* Jobs listing Page */}
        <Route 
          path='/app/jobs-listing'
          element={<JobsListingPage/>} 
          loader={await allJobsPostedByTheUser}
        />

        {
        /* Jobs Details page - Multipurpose page*/
        /* Passing job object through navigate() and accessing the same using useLocation() hook */
        }
        <Route
          path='/app/job-details'
          element={<JobsDetailsPage />}
        />
        <Route path='shop' element={<ShopPage/>}/>
        <Route path='jobactivities' element={<JobActivitesPage/>} />
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
