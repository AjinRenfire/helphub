import React from "react";

import './shoptile.css';

import HexImage from "../../assets/hex.png";

export default function ShopTile (props) {
    return (
        <div className=" space-y-4 px-10 py-5 border border-black rounded-lg shadow hover:shadow-lg hover:shadow-violet-300">
            <div className="">
                <img src={HexImage} alt="" height="" className=" w-48"/>
            </div>
            <div className="flex justify-between items-center">
                <h1 className=" text-xl font-bold">{props.curr}</h1>
                <p className=" text-lg font-medium">{props.fiat}</p>
            </div>
            
        </div>
    )
}