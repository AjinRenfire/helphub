import React, { useContext } from "react";

import ShopTile from "../../Components/shop-tile/ShopTile";

// firebase
import { updateUserBalance } from "../../firebase/firebase.user";

// context
import { UserContext } from '../../contexts/user.context';

export default function ShopBuyPage(){
    const { currentUserUID } = useContext(UserContext)

    // function to handle when the shop tile in the buy page is clicked
    const BuyCoins = async(amount) =>{
        let coin = parseInt(amount)

        await updateUserBalance(currentUserUID, coin, "Credit")
    }

    return (
        <div>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="100" fiat="₹9" buy={BuyCoins} />
                <ShopTile curr="200" fiat="₹49" buy={BuyCoins} />
                <ShopTile curr="500" fiat="₹99" buy={BuyCoins} />
                <ShopTile curr="1000" fiat="₹159" buy={BuyCoins} />
                <ShopTile curr="2000" fiat="₹249" buy={BuyCoins} />
            </div>
        </div>
    )
}