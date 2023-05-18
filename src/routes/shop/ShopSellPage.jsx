import React from "react";

import ShopTile from "../../Components/shop-tile/ShopTile";

export default function ShopSellPage(){
    return (
        <div>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="₹9" fiat="100"/>
                <ShopTile curr="₹49" fiat="200"/>
                <ShopTile curr="₹99" fiat="500"/>
                <ShopTile curr="₹159" fiat="1000"/>
                <ShopTile curr="₹249" fiat="2000"/>
            </div>
        </div>
    )
}