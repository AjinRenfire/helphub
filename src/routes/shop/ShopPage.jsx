import React from "react";

//components
import ShopTile from "../../Components/shop-tile/ShopTile";

import "./shop.css";


export default function ShopPage(){
    return (
        <div className="mt-20 w-2/3 block mx-auto lg:ml-96 space-y-4 mb-10">
            <h1 >Shop</h1>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
                <ShopTile curr="400" fiat="$99"/>
            </div>
            
        </div>
    )
}