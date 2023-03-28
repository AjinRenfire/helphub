import React from "react";

export default function Navbar(){
    return (
        <header>
            <nav className="nav-bar">
                <h2 className="nav-title">HelpHub</h2>
                <div className="nav-elements">
                <ul className="nav-list">
                    <li>Store</li>
                    <li>About Us</li>
                    <li>Support</li>
                </ul>
                <button className="login">Login</button>
                </div>
                
            </nav>
        </header>
        
    )
}