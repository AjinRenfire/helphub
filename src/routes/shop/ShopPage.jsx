import React from "react";

//components
import ShopTile from "../../Components/shop-tile/ShopTile";

import "./shop.css";


export default function ShopPage(){
    return (
        <div className="view">
            <h1>Shop</h1>
            <ShopTile curr="400" fiat="$99"/>
        </div>
    )
}