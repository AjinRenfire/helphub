import React, { useContext } from "react";

import ShopTile from "../../Components/shop-tile/ShopTile";

// firebase
import { updateUserBalance } from "../../firebase/firebase.user";

// context
import { UserContext } from '../../contexts/user.context';

export default function ShopSellPage(){
    const { currentUserUID, currentUser } = useContext(UserContext)

    // function to handle when the shop tile in the sell page is clicked
    const BuyCoins = async(amount) =>{
        let coin = parseInt(amount)

        if(currentUser.balance > 0){
            console.log(amount)

            await updateUserBalance(currentUserUID, coin, "Debit")
        }
    }

    return (
        <div>
            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 place-content-center place-items-center gap-y-8">
                <ShopTile curr="₹9" fiat="100" buy={BuyCoins} act="Debit"/>
                <ShopTile curr="₹49" fiat="200" buy={BuyCoins} act="Debit"/>
                <ShopTile curr="₹99" fiat="500" buy={BuyCoins} act="Debit"/>
                <ShopTile curr="₹159" fiat="1000" buy={BuyCoins} act="Debit"/>
                <ShopTile curr="₹249" fiat="2000" buy={BuyCoins} act="Debit"/>
            </div>
        </div>
    )
}