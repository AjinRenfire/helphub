import React from "react";

import { Link } from "react-router-dom";

import SharkImg from "../assets/imgs/list-imgs/shark-globe.png"

export default function NotFound() {
    return (
        <div className=" space-y-6 py-32">
            <img src={SharkImg} alt="" className=" w-64 mx-auto"/>
            <h1 className=" text-7xl text-center font-extrabold text-gray-400">404</h1>
            <p className=" text-center text-lg">Hi, you are in the forbidden land of <span className=" italic">"Not Found"</span>  . Travel back to <Link to="/app"><span className=" text-violet-700 hover:underline"> workspace</span></Link>  or <Link to="/"><span className=" text-violet-700 hover:underline"> homepage</span></Link></p>
        </div>
    )
}