import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

// contexts
import { UserContext } from "../contexts/user.context";

// firebase
import { signoutUser } from "../firebase/firebase.login";

export default function Navbar(){
    const { currentUser, setCurrentUser } = useContext(UserContext)
    console.log("Current user: ", currentUser)

    // logout handler
    const logoutHandler = async () => {
        await signoutUser();

        // also, setting the current user to null
        setCurrentUser(null)
    }

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
                        {
                            // if current user is not null, showing log out button
                            // else, showing login button
                            currentUser ? (
                                <button onClick={logoutHandler} className="rounded-full bg-violet-600 text-white px-4 py-2 hover:bg-red-600">Logout</button>
                            ) : (
                                <Link to={'/login'}>
                                    <button className="rounded-full bg-violet-600 text-white px-4 py-2">Log In</button>
                                </Link>
                            )
                        }
                   
                </nav>
            </header>

            <Outlet />
        </>        
    )
}