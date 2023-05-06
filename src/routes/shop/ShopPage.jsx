import React from "react";

//components
import ShopTile from "../../Components/shop-tile/ShopTile";
import WhatsappTabs from "../../Components/tab-component/tab-component";

import "./shop.css";
import { Outlet } from "react-router-dom";


export default function ShopPage(){
    return (
        <div className="mt-20 w-2/3 block mx-auto lg:ml-96 space-y-4 mb-10">
            <h1 >Shop</h1>
            <WhatsappTabs 
                firstText='Buy'
                firstLink='/app/shop/'
                secondText='Sell'
                secondLink='/app/shop/sell'
            />
            <Outlet />
            
        </div>
    )
}