import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item";
import FilterBar from "../../Components/filter-bar/FilterBar";

// firebase
import { onSnapshot, collection } from "firebase/firestore";
import { database } from "../../firebase/firebase.config";

// css
import "./job-listing.css";

import {FiMapPin} from 'react-icons/fi'

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants";
import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page";

export default function JobsListingPage(){
    const [jobsPostedByOtherUsers, setJobsPostedByOtherUsers] = useState([])
    const navigate = useNavigate()

    //variables or functions related to filtering 
    const VARIOUS_CATEGORIES = [
        'Shopping',
        'Medical',
        'Event Organising',
        'Education',
        'Others'
    ]

    const [selectedCategory,setSelectedCategory] = useState("");
    const [searchLocation , setSearchLocation] = useState("");

    const [currentLocation , setCurrentLocation] = useState("Your Area");
    const [lat , setLat] = useState("");
    const [long, setLong] = useState("");


    useEffect(
        ()=>{
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                }
            )
        },[]
    )

    async function HandleLocationClick (){

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            }
        )

        const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=4921796711cdf71e1e0b21591032991c`);
        const locationJson = await locationResponse.json();
        setSearchLocation(locationJson[0].name)
        
        
        
    }

    function handleSearch(e){
        setSearchLocation(e.target.value);
    }

    useEffect(() => {
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        function check (data){
            // Checking for some conditions
            //  -> if currentUserUID is not the creatorUID of the job
            //  -> status of the job is not ACCEPTED yet
            //  -> currentUser has not requested for the job yet
            //  -> deadline of the job is not over
            if(! (data.creatorUID === currentUserUID)){
                if(! (data.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB)){
                    if(! (data.requestorsUID.indexOf(currentUserUID) > -1)){
                        dummy.push(data)
                    }
                }
            }
        }

        const unsubscribe = () =>{
            onSnapshot(collection(database, FIREBASE_COLLECTION_JOB_LISTINGS), (snapshot) => {
                snapshot.docs.forEach((doc) => check(doc.data()))
                setJobsPostedByOtherUsers(dummy)
            })
        } 

        return unsubscribe()
    }, [database])

    // function to handle the click of the job list item
    const handler = (job) => {
        console.log(job.title)

        navigate('/app/job-details', {state: {job, from: '/app/job-listing'}})
    }

    return (
        <div className="mt-20  w-2/3 block mx-auto lg:ml-96">

            {/* Filter bar component start*/}
           
            <div className="  mt-2 fixed top-12 bg-white w-full pb-5 ">
                <h4>Filter</h4>
                <div className="flex py-4 items-center space-x-4">
                    <div className=" w-fit relative" >
                        <input 
                            type="search" 
                            name="search" 
                            id="" 
                            value={searchLocation} 
                            placeholder="Search location"
                            onChange={handleSearch}
                            className="w-96 h-10 bg-violet-100 rounded-md px-4"
                        />

                        <FiMapPin onClick={HandleLocationClick} title="click to get from your current area" className="absolute bottom-2 left-80 bg-violet-300 px-1 py-1 rounded-full text-2xl cursor-pointer"/>

                    </div>
                   


                    <div className="">
                        <div className="border-2 border-gray-300 px-4 py-2 rounded-md hover:border-violet-300">
                            <select 
                                defaultValue="" 
                                name="category" 
                                id="category" 
                                value={selectedCategory} 
                                onChange={(e)=>setSelectedCategory(e.target.value)}
                                className=""
                            >
                                    <option value="" disabled selected hidden className=" ">category</option>
                                    <option value="" className=" ">All</option>
                                    <option value={VARIOUS_CATEGORIES[0]}>{VARIOUS_CATEGORIES[0]}</option>
                                    <option value={VARIOUS_CATEGORIES[1]}>{VARIOUS_CATEGORIES[1]}</option>
                                    <option value={VARIOUS_CATEGORIES[2]}>{VARIOUS_CATEGORIES[2]}</option>
                                    <option value={VARIOUS_CATEGORIES[3]}>{VARIOUS_CATEGORIES[3]}</option>
                                    <option value={VARIOUS_CATEGORIES[4]}>{VARIOUS_CATEGORIES[4]}</option>
                            </select>
                            
                        </div>
                    </div>
                </div>
                


               
            </div>
            {/* Filter bar component end */}
            <div className=" space-y-4 mt-44">
            {
                jobsPostedByOtherUsers.filter(
                    (job)=>{
                        var query = job.location;
                        query = new String(query);
                        if(query.toLowerCase().includes(searchLocation.toLowerCase())|| searchLocation===""){
                            return true;
                        }
                    }

                ).filter(job =>{
                    return ((job.category===selectedCategory)|| (selectedCategory===""));
                }).map((job) => {
                        return (
                            <JobsListItem 
                                job={job} 
                                key={job.UID} 
                                click={() => handler(job)}
                            />
                        )
                })
            }
            </div>
            
        </div>
    )
}