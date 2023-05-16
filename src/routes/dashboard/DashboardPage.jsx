import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from 'react-router-dom'

// component
import DetailComponent from "../../Components/detail-component/DetailComponent";
import FormInput from "../../Components/input-component/input-component";
import TextArea from "../../components/text-area-component/TextArea";

import {FiEdit3 , FiHeart ,FiMapPin,FiStar,FiHexagon,FiCheck,FiGift} from "react-icons/fi"

// css
import './dashboard.css'

// firebase
import { database } from "../../firebase/firebase.config";
import { onSnapshot, query, collection, where, QuerySnapshot, doc } from "firebase/firestore"
import { getUserDocument, updateUserDocument }  from "../../firebase/firebase.user.js";

// constants
import { FIREBASE_COLLECTION_USERS } from '../../utils/constants'

export default function DashboardPage(){
    const [isEditing, setIsEditing] = useState(false);
    const [userData,setUserData] = useState({});
    const [editingUserData, setEditingUserData] = useState(userData); // currently edited user data is stored here 
    const {username, phoneNumber, email, hobbies, about, location, balance, rating, createdAt, UID} = userData;
    
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [joinedDate, setJoinedDate] = useState("");

    // state for reloading the useEffect()
    const [reload, setReload] = useState(false)
      
    useEffect(()=>{
          navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            }
        )

        const unsubscribe = () => {
            onSnapshot(collection(database, FIREBASE_COLLECTION_USERS), (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    doc.data().UID === localStorage.getItem("userUID") && (
                        setUserData(doc.data()),
                        setEditingUserData(doc.data()),
                        localStorage.setItem("user",doc.data().username),
                        localStorage.setItem("balance",doc.data().balance),
                
                        setJoinedDate(new Date(doc.data().createdAt.seconds*1000).toDateString())
                    )
                })
            })
        }

        return unsubscribe
    }, [reload])
   
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
    
    // function to handle the changes in inputs while the user is editing the data
    function handlechange(e){
        setEditingUserData(
             (prevValue)=>{
                 return {...prevValue, [e.target.name]: e.target.value}
             }
         )
    }    

    // function to update the user document in the firebase
    const editUserDocument = async() => {
        setIsEditing(! isEditing)

        try{
            await updateUserDocument(UID, editingUserData)

            // setting this edited to ! edited so that the useEffect() can run once again
            setReload(! reload)
        }
        catch(error) {
            console.log("User document not updated...", error)
        }
    }   
    
    
  
    async function HandleLocationClick (){

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            }
        )

        const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=4921796711cdf71e1e0b21591032991c`);
        const locationJson = await locationResponse.json(); 
        
        setEditingUserData(
            (prevValue)=>{
                return {...prevValue , location:locationJson[0].name}
            }
        )
    }

    return ( 
        <main className="mt-20 w-2/3 block mx-auto lg:ml-96 ">
            
            <section className="grid grid-rows-2 grid-cols-2 lg:w-3/4 mx-auto gap-4 " style={{ gridTemplateColumns: "320px 1fr",gridTemplateRows: "1fr 200px" }} >
                <div className={`p-4 ${isEditing?"bg-white":"bg-violet-50"} row-start-1 row-end-2 col-start-1 col-end-3 rounded-lg` }>
                    <div className=" flex items-center justify-end w-full ">
                        {
                            isEditing ? (
                                <button onClick={() => editUserDocument()} className=""><FiCheck className=" text-xl font-black stroke-black"/></button>
                            ) : (
                                <button onClick={()=>setIsEditing(!isEditing)} className=""><FiEdit3 className=" text-lg font-black "/></button>
                            )
                        }
                    </div>
                    <div className=" space-y-6 ">
                        {
                            !isEditing ? (
                                <>
                                    {/** User is not editing anything, so just displaying all the info */}
                                    <h3 className=" text-4xl font-bold">{userData.username}</h3>

                                    <div className="flex items-center space-x-2 text-gray-500 ">
                                        <div className="flex items-center space-x-1">
                                            <FiHeart className=" text-sm"/> <p>{(hobbies !== "")?hobbies:"add your hobbies here"}</p>
                                        </div>
                                        <p>•</p>
                                        <div className="flex items-center space-x-1">
                                            <FiMapPin className=" text-sm"/><p>  {(location !== "")?location:"add your location here"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="  text-gray-900">
                                        {/* <h3>About me</h3> */}
                                        <p className="leading-relaxed">
                                            {(about !=="")?about:"Add something about yourself here"}
                                        </p>
                                    </div>

                                    <div className="flex items-center ">
                                        <p className=" text-gray-600 font-bold text-sm">{email} , {(phoneNumber !=="")?phoneNumber:"add your phone number"}</p>
                                    </div>
                                </>
                            ):(
                                <>
                                    {/** User clicked the edit option */}
                                    {/** Changing all the headings and para into inputs */}
                                    <FormInput 
                                        label='Username'
                                        inputOptions={{
                                            type:'name',
                                            name: 'username',
                                            placeholder:'Enter your Username',
                                            required:true,
                                            minLength: 6,
                                            maxLength: 12,
                                            className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white px-2 py-4 rounded",
                                            value:editingUserData.username,
                                            
                                        }}
                                        handleChange={handlechange}
                                    />
                                    <div className="flex items-center space-x-3">
                                        <FormInput 
                                            label='Hobbies'
                                            inputOptions={{
                                                type:'name',
                                                name: 'hobbies',
                                                placeholder:'Enter your Hobbies ',
                                                required:true,
                                                className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white px-2 py-4 rounded",
                                                value:editingUserData.hobbies
                                            }}
                                            handleChange={handlechange}
                                        />
                                        <div className="flex relative">
                                            <FormInput 
                                                label='Location'
                                                inputOptions={{
                                                    type:'name',
                                                    name: 'location',
                                                    placeholder:'Enter your location',
                                                    required:true,
                                                    className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white px-2 py-4 rounded",
                                                    value:editingUserData.location
                                                }}
                                                handleChange={handlechange}
                                            />
                                            <FiMapPin 
                                                className="absolute top-8 left-48 bg-violet-300 px-1 py-1 rounded-full text-2xl cursor-pointer"
                                                onClick={HandleLocationClick} title="click to get from your current area"
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FormInput 
                                            label='Email'
                                            inputOptions={{
                                                type:'email',
                                                name: 'email',
                                                placeholder:'Enter your Email',
                                                required:true,
                                                className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white px-2 py-4 rounded",
                                                value:editingUserData.email
                                            }}
                                            handleChange={handlechange}
                                        />
                                         <FormInput 
                                            label='Phone number'
                                            inputOptions={{
                                                type:'number',
                                                name: 'phoneNumber',
                                                placeholder:'Enter your mobile number',
                                                required:true,
                                                minLength: 10,
                                                maxLength: 10,
                                                className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white px-2 py-4 rounded",
                                                value:editingUserData.phoneNumber,
                                            }}
                                            handleChange={handlechange}
                                        />
                                    </div>
                                   
                                    <TextArea
                                        label='About you'
                                        inputOptions={{
                                            className: ' appearance-none border-b-2 focus:border-violet-600 focus:outline-none px-2 py-4 rounded',
                                            type: 'text',
                                            name: 'about',
                                            placeholder: 'Say anything about you',
                                            required: true,
                                            rows: 5,
                                            cols: 50,
                                            minLength: 10,
                                            maxLength: 1000,
                                            value:editingUserData.about,

                                        }}
                                        handleChange={handlechange}
                                    />
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
                    <h3 className=" font-medium">Started at</h3>

                    <div className=" flex items-center justify-center h-full space-x-1">
                        <FiGift className="mb-10 text-5xl font-extrabold" /> 
                        <p className="mb-10 text-5xl font-extrabold"> {joinedDate.substring(joinedDate.indexOf(" "))} </p>
                    </div>
                    
                </div>
            </section>
           
        </main> 
    );
}