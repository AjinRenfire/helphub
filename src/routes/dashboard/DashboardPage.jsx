import React, { useContext, useEffect, useState } from "react";

// component
import DetailComponent from "../../Components/detail-component/DetailComponent";

// css
import './dashboard.css'

// firebase
import { getUserDocument }  from "../../firebase/firebase.user.js";

export default function DashboardPage(){
    const fakeValues = {
        Name:"Ramu",
        Hobbies:"Reading,More reading",
        Email:"homelander@vought.com",
        Location:"Chennai",
        Phone:"+91 78430 23785"
    }
    const [isEditing , setIsEditing] = useState(false);
    const [userData,setUserData] = useState({});
    
    useEffect(()=>{
        async function gett(){
            let userDocSnapshot = await getUserDocument(localStorage.getItem("userUID"))
            setUserData(userDocSnapshot.data())
        }
        
        gett();
    },[])

    console.log(userData);
   
    return ( 
        <div className="view">
            <div className="">
                <button onClick={()=>setIsEditing(!isEditing)}>edit</button>   
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
                       Ramu Sonu are twins. They are the sons of Tinku and Mintu. They have two two twin-sisters. They are Dholu Bolu
                    </p>
                </div>
            </section>
           
        </div> 
    );
}