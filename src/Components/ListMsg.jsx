import React from "react";

export default function ListMsg({image , message}){
    return (
        <div className=" py-12 ">
            <img src={image} alt="" className=" w-64 opacity-90 mx-auto"/>
            <p className=" text-center text-3xl font-medium text-slate-800">{message}</p>
        </div>
    )
}