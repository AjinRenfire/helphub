import React from "react";

import './shoptile.css';

import HexImage from "../../assets/hex.png";

export default function ShopTile (props) {
    return (
        <div className="tile-box">
            <div className="img-container">
                <img src={HexImage} alt="" height="150px" className="hex-logo"/>
            </div>
            
            <h1 className="currency">{props.curr}</h1>
            <p className="fiat">{props.fiat}</p>
        </div>
    )
}