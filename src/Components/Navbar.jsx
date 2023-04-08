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
            <header>
                <nav className="nav-bar">
                    <h2><Link to={'/'} className="nav-title">HelpHub</Link></h2>
                    <div className="nav-elements">
                        <ul className="nav-list">
                            <li>Store</li>
                            <li>About Us</li>
                            <li>Support</li>
                        </ul>
                        {
                            // if current user is not null, showing log out button
                            // else, showing login button
                            currentUser ? (
                                <button onClick={logoutHandler} className="login">Logout</button>
                            ) : (
                                <Link to={'/login'}>
                                    <button className="login">Log In</button>
                                </Link>
                            )
                        }
                    </div>
                </nav>
            </header>

            <Outlet />
        </>        
    )
}