import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter, 
  createRoutesFromElements,
  defer
} from 'react-router-dom'

// components
import SideNav from './Components/side-nav-component/SideNav';

// routes
import HomePage from './routes/home-page'
import LoginPage, { LoginAction } from './routes/login-page/login-page'
import SignupPage, { SignUpAction } from './routes/signup-page/signup-page'

import DashboardPage from './routes/dashboard/DashboardPage';
import PostJobPage, { PostJobAction } from './routes/posting-job/post-job-page';
import JobsListingPage from './routes/jobs-listing/jobs-listing-page';
import JobsDetailsPage from './routes/job-details-page/job-details-page';
import ChatPage from './routes/chat-page/chat-page';

import MyJobsPage from './routes/my-jobs-page/my-jobs';
import MyActiveJobs from './routes/my-active-jobs/my-active-jobs';
import MyJobsPendingRequestsPage from './routes/my-jobs-pending-requests/my-jobs-pending-requests';
import MyJobsNoRequestsYetPage from './routes/my-jobs-no-requests/my-jobs-no-requests';

import JobActivitesPage from './routes/job-activities/JobActivitesPage';
import JobActivitiesActivePage from './routes/job-activities-active/job-activities-active';
import JobActivitiesPendingPage from './routes/job-activities-pending/job-activities-pending';
import JobActivitiesHistoryPage from './routes/job-activities-history/job-activities-history';

import ShopPage from './routes/shop/ShopPage';
import ShopBuyPage from './routes/shop/ShopBuyPage';
import ShopSellPage from './routes/shop/ShopSellPage';

// contexts
import UserContextProvider from './contexts/user.context';

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
        >
          {/* Active Jobs */}
          <Route path='/app/my-jobs/active' element={<MyActiveJobs/>} />

          {/* Pending requests for my job */}
          <Route path ='/app/my-jobs/pending-requests' element={<MyJobsPendingRequestsPage />} />

          {/* No requests for my job */}
          <Route path='/app/my-jobs/no-requests' element={<MyJobsNoRequestsYetPage />} />
        </Route>

        {/* Jobs listing Page */}
        <Route 
          path='/app/jobs-listing'
          element={<JobsListingPage/>} 
        />

        {/** Job Activities Page */}
        <Route
          path='/app/job-activities' 
          element={<JobActivitesPage/>} 
        >
          {/** Active Jobs */}
          <Route path='/app/job-activities/active' element={<JobActivitiesActivePage/>} />

          {/** Pending Jobs */}
          <Route path='/app/job-activities/pending' element={<JobActivitiesPendingPage/>} />

          {/** My activities history */}
          <Route path='/app/job-activities/history' element={<JobActivitiesHistoryPage/>} />
        </Route>

        {
        /* Jobs Details page - Multipurpose page*/
        /* Passing job object through navigate() and accessing the same using useLocation() hook */
        }
        <Route
          path='/app/job-details'
          element={<JobsDetailsPage />}
        />

        <Route path='shop' element={<ShopPage/>}>
          <Route
            path='buy'
            index
            element={<ShopBuyPage />}
          />
          <Route
            path='sell'
            element={<ShopSellPage />}
          />
        </Route>

        {/** Chat Page */}
        <Route path='/app/chat' element={<ChatPage/>} />
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
