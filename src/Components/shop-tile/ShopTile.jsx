import React from "react";

import './shoptile.css';

import HexImage from "../../assets/hex.png";

export default function ShopTile (props) {
    return (
        <div className=" space-y-4 px-10 py-5 border border-black rounded-lg shadow hover:shadow-lg hover:shadow-violet-300" 
         onClick={() => {props.act ? props.buy(props.fiat) : props.buy(props.curr)}}
        >
            <h1 className=" text-2xl font-bold text-center">{props.curr}</h1>

            
            <div className="">
                <img src={HexImage} alt="" height="" className=" w-40"/>
            </div>
            
           
            <p className=" text-lg font-medium text-center bg-slate-200 rounded-md text-gray-800">{props.fiat}</p>
           
            
            
        </div>
    )
}