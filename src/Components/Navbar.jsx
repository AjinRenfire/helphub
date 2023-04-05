import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <header>
                <nav className="nav-bar">
                    <h2><Link to={'/'} className="nav-title">HelpHub</Link></h2>
                    <div className="nav-elements">
                        <ul className="nav-list">
                            <li>Store</li>
                            <li>About Us</li>
                            <li>Support</li>
                        </ul>
                        <Link to={'/login'}>
                            <button className="login">Login</button>
                        </Link>
                    </div>
                </nav>
            </header>

            <Outlet />
        </>        
    )
}