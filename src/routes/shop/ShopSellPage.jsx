import React from "react";

import ShopTile from "../../Components/shop-tile/ShopTile";

export default function ShopSellPage(){
    return (
        <div>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="$99" fiat="400"/>
                <ShopTile curr="$99" fiat="400"/>
                <ShopTile curr="$99" fiat="400"/>
                <ShopTile curr="$99" fiat="400"/>
                <ShopTile curr="$99" fiat="400"/>
            </div>
        </div>
    )
}