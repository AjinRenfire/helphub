import React from "react";

import ShopTile from "../../Components/shop-tile/ShopTile";

export default function ShopBuyPage(){
    return (
        <div>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="100" fiat="₹9"/>
                <ShopTile curr="200" fiat="₹49"/>
                <ShopTile curr="500" fiat="₹99"/>
                <ShopTile curr="1000" fiat="₹159"/>
                <ShopTile curr="2000" fiat="₹249"/>
            </div>
        </div>
    )
}