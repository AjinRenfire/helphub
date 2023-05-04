import React, { useContext, useEffect, useState } from "react";

// component
import DetailComponent from "../../Components/detail-component/DetailComponent";
import FormInput from "../../components/input-component/input-component";

// css
import './dashboard.css'

// firebase
import { getUserDocument }  from "../../firebase/firebase.user.js";

export default function DashboardPage(){
    // const fakeValues = {
    //     Name:"Ramu",
    //     Hobbies:"Reading,More reading",
    //     Email:"homelander@vought.com",
    //     Location:"Chennai",
    //     Phone:"+91 78430 23785"
    // }
    const [isEditing , setIsEditing] = useState(false);
    const [userData,setUserData] = useState({});
    const [editingUserData , setEditingUserData] = useState({});
    
    useEffect(()=>{
        async function gett(){
            let userDocSnapshot = await getUserDocument(localStorage.getItem("userUID"))
            setUserData(userDocSnapshot.data());
            setEditingUserData(userDocSnapshot.data());
            localStorage.setItem("user",userDocSnapshot.data().username);
            localStorage.setItem("balance",userDocSnapshot.data().balance);
        }
        
        gett();
    },[])
    
    // console.log(editingUserData)
    const {username , phoneNumber , email , hobbies , about} = userData;
    function handlechange(e){
        setEditingUserData(
            (prevValue)=>{
                return {...prevValue , [e.target.name]:e.target.value}
            }
        )
    }

    useEffect(()=>{
        //update the firebase document 
    },[editingUserData]);


    return ( 
        <main className="mt-20 w-2/3 block mx-auto lg:ml-96 ">
            <div className="">
                <button onClick={()=>setIsEditing(!isEditing)}>edit</button>   
            </div>
            <section>
                <div className="card">

                    {
                        !isEditing ? (<>
                            <DetailComponent objKey={"Name"} value={username}/>
                            <DetailComponent objKey={"Hobbies"} value={hobbies}/>
                            <DetailComponent objKey={"Email"} value={email}/>
                            <DetailComponent objKey={"Phone Number"} value={phoneNumber}/>
                        </>
                            
                        ):(
                            <>
                                <input type="text" value={editingUserData.username} name="username" onChange={handlechange} />
                                <input type="text" value={editingUserData.hobbies} name="hobbies" onChange={handlechange} />
                                <input type="email" value={editingUserData.email} name="email" onChange={handlechange} />
                                <input type="text" value={editingUserData.phoneNumber} name="phoneNumber" onChange={handlechange} />
                            </>
                        )
                    }
                    
                    
                    
                </div>
                <div className="card">
                    <h3>stats</h3>
                </div>
                <div className="card">
                    <h3>About me</h3>
                    <p>
                       {about}
                    </p>
                </div>
            </section>
           
        </main> 
    );
}