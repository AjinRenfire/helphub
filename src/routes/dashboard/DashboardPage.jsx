import React, { useContext, useEffect, useState } from "react";

// component
import DetailComponent from "../../Components/detail-component/DetailComponent";
import FormInput from "../../Components/input-component/input-component";

import {FiEdit3 , FiHeart ,FiMapPin,FiStar,FiHexagon} from "react-icons/fi"

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
    const {username , phoneNumber , email , hobbies , about ,location , balance ,rating} = userData;
    function handlechange(e){
        setEditingUserData(
            (prevValue)=>{
                return {...prevValue , [e.target.name]:e.target.value}
            }
        )
    }

    //dynamic gradient to rating card according to the grading
    let fromBgColor = "" ;
    let toBgColor = "";
    let ratingInt = parseInt(rating);

    // ratingInt = 4;

    if(ratingInt <= 1){
        fromBgColor = "from-rose-50";
        toBgColor = "to-red-200";
    }
    else if(ratingInt === 2 || ratingInt === 3){
        fromBgColor = "from-yellow-50";
        toBgColor = "to-amber-200"
    }
    else if(ratingInt >=4) {
        fromBgColor = "from-green-50";
        toBgColor = "to-emerald-200"
    }
    /*** End to dynamic gradient color section ** */
    

    useEffect(()=>{
        //update the firebase document 
    },[editingUserData]);


    return ( 
        <main className="mt-20 w-2/3 block mx-auto lg:ml-96 ">
            
            <section className="grid grid-rows-2 grid-cols-2 lg:w-3/4 mx-auto gap-4 " style={{ gridTemplateColumns: "320px 1fr",gridTemplateRows: "1fr 200px" }} >
                <div className="p-4 bg-purple-50 row-start-1 row-end-2 col-start-1 col-end-3 rounded-lg ">
                    <div className=" mr-auto ">
                        <button onClick={()=>setIsEditing(!isEditing)} className="mr-auto"><FiEdit3 /></button>   
                    </div>
                    <div className=" space-y-6 ">
                        {
                            !isEditing ? (<>
                                {/* <DetailComponent objKey={"Name"} value={username}/>
                                <DetailComponent objKey={"Hobbies"} value={hobbies}/>
                                <DetailComponent objKey={"Email"} value={email}/>
                                <DetailComponent objKey={"Phone Number"} value={phoneNumber}/>
                                <DetailComponent objKey={"location"} value={location}/> */}
                                <h3 className=" text-4xl font-bold">{username}</h3>

                                <div className="flex items-center space-x-2 text-gray-500 ">
                                    <div className="flex items-center space-x-1">
                                        <FiHeart className=" text-sm"/> <p>{hobbies}</p>
                                    </div>
                                    <p>•</p>
                                    <div className="flex items-center space-x-1">
                                        <FiMapPin className=" text-sm"/><p>  {location}</p>
                                    </div>
                                    
                                    
                                </div>
                                
                                <div className="  text-gray-900">
                                    {/* <h3>About me</h3> */}
                                    <p className="leading-relaxed">
                                        {about}
                                    </p>
                                </div>

                                <div className="flex items-center ">
                                    
                                    <p className=" text-gray-600 font-bold text-sm">{email} , {phoneNumber}</p>
                                    
                                </div>
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
                    
                    
                    
                    
                </div>
                <div className={`bg-gradient-to-br ${fromBgColor} ${toBgColor} row-start-2 row-end-3 col-start-1 col-end-2 rounded-lg p-4` }>
                    <h3 className=" font-medium">Rating</h3>
                    <div className=" flex items-center justify-center h-full space-x-1 ">
                        <p className="mb-10 text-6xl font-extrabold line">{rating}</p>
                         <FiStar  className="mb-10 text-5xl font-extrabold stroke-orange-600 fill-orange-600" />
                    </div>
                </div>
                <div className="  row-start-2 row-end-3 col-start-2 col-end-3 bg-blue-50 rounded-lg p-4 ">
                    <h3 className=" font-medium">Balance</h3>

                    <div className=" flex items-center justify-center h-full space-x-1 ">
                        <FiHexagon className="mb-10 text-6xl font-extrabold" /> 
                        <p className="mb-10 text-6xl font-extrabold"> {balance} </p>
                    </div>
                    
                </div>
            </section>
           
        </main> 
    );
}