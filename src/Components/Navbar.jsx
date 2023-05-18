import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <header className="bg-white top-0 w-full fixed ">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 ">
                    <Link to={'/'}><h2 className="text-violet-600 font-extrabold text-2xl"> HelpHub </h2></Link>
                    
                        <ul className=" inline-flex items-center space-x-12">
                            <li className="text-sm font-semibold leading-6 text-gray-900"> <a href="#how" className="hover:text-violet-700">How</a> </li>
                            <li className="text-sm font-semibold leading-6 text-gray-900"> <a href="#contact" className="hover:text-violet-700">Contact Us</a> </li>
                            <li className="text-sm font-semibold leading-6 text-gray-900"> <a href="#support" className="hover:text-violet-700">Support</a> </li>
                            
                        </ul>
                        <Link to={'/login'}>
                            <button className="rounded-full bg-violet-600 text-white px-4 py-2">Log In</button>
                        </Link>
                </nav>
            </header>

            <Outlet />
        </>        
    )
}