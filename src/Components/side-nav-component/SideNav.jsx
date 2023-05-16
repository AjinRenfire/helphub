import React,{useEffect} from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';

//icons
import ConfigIcon from "../ConfigIconContext";
import {FiBell,FiGithub,FiUser,FiUserCheck,FiTarget,FiShoppingBag,FiList} from "react-icons/fi"

import { FiHexagon } from "react-icons/fi"

// firebase
import { signoutUser } from '../../firebase/firebase.login';

export default function SideNav(){
   const username = localStorage.getItem("user");
   const balance = localStorage.getItem("balance");
   const navigate = useNavigate()

    const signOutHandler = async (event) => {
        event.preventDefault()
        await signoutUser()

        // also navigating the user to the home page after signing the user out
        navigate('/')
    }

    return ( 
        <>
            <aside className='hidden fixed top-0 left-0 flex-col flex-shrink-0 pt-16 w-80 h-full lg:flex'>
                <nav className="flex relative flex-col flex-1 pt-0 min-h-0  ">
                    <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4 justify-between items-end ">
                    
                        <ul className="flex flex-1 flex-col px-3 items-stretch start space-y-8 w-56">
                        
                            
                            <NavLink to={'/app/my-jobs/active'} className={
                                ({isActive})=>{
                                    return isActive ? "font-bold text-xl px-6":"text-xl px-6 text-gray-800 hover:font-extrabold"
                                }
                            }> 
                                <div className="flex items-center space-x-4">
                                    <FiUserCheck />
                                    <p>My Jobs</p>
                                </div> 
                            </NavLink>
                            <NavLink to={'/app/jobs-listing'} className={
                                ({isActive})=>{
                                    return isActive ? "font-bold text-xl px-6":"text-xl px-6 text-gray-800 hover:font-extrabold"
                                }
                            }>
                                <div className="flex items-center space-x-4">
                                    <FiList />
                                    <p>Jobs listing</p> 
                                </div>
                                
                            </NavLink>
                            <NavLink to={'/app/job-activities/active'} className={
                                ({isActive})=>{
                                    return isActive ? "font-bold text-xl px-6":"text-xl px-6 text-gray-800 hover:font-extrabold"
                                }
                            }>
                                <div className="flex items-center space-x-4">
                                    <FiTarget />
                                    <p>Working</p> 
                                </div>
                                
                            </NavLink>
                            <NavLink to={'/app/shop/'} className={
                                ({isActive})=>{
                                    return isActive ? " font-bold text-xl px-6":"text-xl px-6  text-gray-800 hover:font-extrabold"
                                }
                            }>
                                <div className="flex items-center space-x-4">
                                    <FiShoppingBag />
                                    <p>Shop</p> 
                                </div>
                               
                            </NavLink>

                            <NavLink to={'/app/post'} className={
                                ({isActive})=>{
                                    return isActive ? "bg-violet-600 text-white text-xl px-6 rounded-full py-3 text-center":
                                    " border-violet-600 text-violet-600 text-xl px-6 rounded-full py-3 border-2 text-center hover:bg-violet-600 hover:text-white"
                                }
                            }>Post a Job</NavLink>
                        </ul>

                        <Link to={"/app"} className='w-full'>
                            <div className=" mb-10 flex flex-col items-center ">
                                <div className=' space-y-1  px-6 py-8 rounded-lg'>
                                    <div className='flex justify-center items-center space-x-4 '>
                                        <FiUser className=' text-xl font-medium'/>
                                        <h3 className='text-lg font-medium'>{username}</h3>
                                    </div>


                                    <div className=' shadow-inner px-4 py-2 rounded-full text-center shadow-purple-100 flex items-center justify-center space-x-1'>
                                        <FiHexagon  />
                                        <p >{balance}</p>
                                    </div>
                                    
                                </div>
                               
                            </div>
                            
                        </Link>
                       
                    </div>
                    
                </nav>
            </aside> 
            <header className=' top-0 w-full fixed bg-white'>
                <nav className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'>
                    <h2 className="text-violet-600 font-extrabold text-2xl">HelpHub</h2>
                    <div className='flex items-center space-x-5'>
                        <ConfigIcon>
                            {/* <FiBell /> */}
                            <a href='https://github.com/AjinRenfire/helphub' target='_blank'><FiGithub className=''/></a>
                        </ConfigIcon>
                        
                        <button type='button' onClick={(event) => signOutHandler(event)} className="rounded-full bg-red-200 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2">Log Out</button>
                    </div>
                    
                </nav>
               
            </header>
            
            
            <Outlet/>
        </>
    );
}