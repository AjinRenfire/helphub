import React from "react";

import DetailComponent from "../../Components/detail-component/DetailComponent";

import './dashboard.css'

export default function DashboardPage(){

    const fakeValues = {
        Name:"Homelander",
        Hobbies:"killing,More killing",
        Email:"homelander@vought.com",
        Location:"Chennai",
        Phone:"+91 78430 23785"
    }

    return ( 
        <div className="view">
            <div className="options">          
                <span>edit</span>   
            </div>
            <section>
                <div className="card details">
                    {
                        Object.entries(fakeValues).map(pair=>{
                            return (<DetailComponent objKey={pair[0]} value={pair[1]}/>)
                        })
                    }
                </div>
                <div className="card">
                    <h3>stats</h3>
                </div>
                <div className="card">
                    <h3>About me</h3>
                    <p>
                        Homelander is the leader of The Seven, the strongest Supe in the world, and the archenemy of Billy Butcher, the leader of The Boys. With the face of a movie star and the power of a god, Homelander is considered the greatest superhero alive. Not only can he fly, but he possesses super hearing, super strength and super durability far beyond most supes, and can see through anything except for zinc with his X-ray vision, as well as being able to burn and cut through things by shooting a red-colored beam of heat energy from out of his eyes.
                    </p>
                </div>
            </section>
        </div> 
    );
}