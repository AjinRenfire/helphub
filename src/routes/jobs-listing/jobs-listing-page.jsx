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
            <div className="filter-bar">
                <h4>Filter</h4>
                <div className="filters">
                    <div className="filter">
                        <select 
                            defaultValue="" 
                            name="category" 
                            id="category" 
                            value={selectedCategory} 
                            onChange={(e)=>setSelectedCategory(e.target.value)}
                            className="filter-selection"
                        >
                                <option value="" disabled selected hidden>category</option>
                                <option value="">All</option>
                                <option value={VARIOUS_CATEGORIES[0]}>{VARIOUS_CATEGORIES[0]}</option>
                                <option value={VARIOUS_CATEGORIES[1]}>{VARIOUS_CATEGORIES[1]}</option>
                                <option value={VARIOUS_CATEGORIES[2]}>{VARIOUS_CATEGORIES[2]}</option>
                                <option value={VARIOUS_CATEGORIES[3]}>{VARIOUS_CATEGORIES[3]}</option>
                                <option value={VARIOUS_CATEGORIES[4]}>{VARIOUS_CATEGORIES[4]}</option>
                        </select>
                        
                    </div>
                </div>
            </div>
            {/* Filter bar component end */}
            <div className=" space-y-4">
            {
                jobsPostedByOtherUsers.filter(job =>{
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