

import React from 'react';
import { Outlet } from 'react-router-dom';
import './side-nav.css';

export default function SideNav(){
    return ( 
        
        <header className='app-container'>
            <nav className="side-nav">
                <div className="side">
                    <h2>HelpHub</h2>
                    <ul className="menu-items">
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