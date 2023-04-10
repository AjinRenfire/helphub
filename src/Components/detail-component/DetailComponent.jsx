import React from "react";

export default function DetailComponent(props){
    return (
        <div className="detail">
            <h3>{props.objKey}</h3>
            <p>{props.value}</p>
        </div>
    )
}