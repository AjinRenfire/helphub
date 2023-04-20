import React from 'react';
import { Outlet, Link } from 'react-router-dom';

// css
import './side-nav.css';

export default function SideNav(){
    return ( 
        <header className='app-container'>
            <nav className="side-nav">
                <div className="side">
                    <h2>HelpHub</h2>
                    <ul className="menu-items">
                        <Link to={'/app/post'}>Post a Job</Link>
                        <li><h4>My job</h4></li>
                        <li><h4>Job Activities</h4></li>
                        <li><h4>Job listings</h4></li>
                        <li><h4>Shop</h4></li>
                        <li><h4>signOut</h4></li>
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