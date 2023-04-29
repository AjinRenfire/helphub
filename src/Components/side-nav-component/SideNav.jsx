import React from 'react';
import { Outlet, Link,NavLink } from 'react-router-dom';

// css
import './side-nav.css';

export default function SideNav(){
    return ( 
        <header className='app-container'>
            <nav className="side-nav">
                <div className="side">
                    <h2 className='brand'>HelpHub</h2>
                    <ul className="menu-items">
                    
                        <NavLink to={'/app/post'} className={
                            ({isActive})=>{
                                return isActive ? "active-item":"non-active-item"
                            }
                        }>Post a Job</NavLink>
                        <NavLink to={'/app/my-jobs/active'} className={
                            ({isActive})=>{
                                return isActive ? "active-item":"non-active-item"
                            }
                        }>My Jobs</NavLink>
                        <NavLink to={'/app/jobs-listing'} className={
                            ({isActive})=>{
                                return isActive ? "active-item":"non-active-item"
                            }
                        }>Jobs listing</NavLink>
                        <NavLink to={'/app/job-activities/active'} className={
                            ({isActive})=>{
                                return isActive ? "active-item":"non-active-item"
                            }
                        }>Job Activities</NavLink>
                        <NavLink to={'/app/shop'} className={
                            ({isActive})=>{
                                return isActive ? "active-item":"non-active-item"
                            }
                        }>Shop</NavLink>
                    </ul>
                    <div className="user-profile">
                        <h3>USERNAME</h3>
                    </div>
                </div>
                
            </nav>
            <Outlet/>
        </header> 
        
    );
}