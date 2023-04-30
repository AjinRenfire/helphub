import React from "react";

//components
import ShopTile from "../../Components/shop-tile/ShopTile";

import "./shop.css";


export default function ShopPage(){
    return (
        <div className="mt-20 w-2/3 block mx-auto lg:ml-96">
            <h1 style={{color:"#A494FF",marginBottom:"20px"}}>Shop</h1>
            <div className="shop-grid">
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
            </div>
            
        </div>
    )
}