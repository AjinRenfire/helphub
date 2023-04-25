import { useEffect, useState } from "react"
import { useNavigate, useLoaderData } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item";
import FilterBar from "../../Components/filter-bar/FilterBar";

// firebase
import { auth } from "../../firebase/firebase.config"

export default function JobsListingPage(){
    const loaderData = useLoaderData()
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
    console.log(selectedCategory);



    useEffect(() => {
        let dummy = []
        const currentUserUID = auth.currentUser.uid

        // loaderData contains the snapshots all job documents
        // 1. going through each document snapshot and getting the data
        // 2. checking for some conditions
        //    2.1 -> if currentUserUID is not the creatorUID of the job
        //    2.2 -> status of the job is not ACCEPTED yet
        //    2.3 -> currentUser has not requested for the job yet
        //    2.4 -> deadline of the job is not over
        // 3. pushing the job to the dummy array, only if the conditions are met
        loaderData.forEach((snapshot) => {
            let data = snapshot.data()

            if((! (data.creatorUID === currentUserUID)) && 
                (! (data.status === 'ACCEPTED')) && 
                    (! (data.requestorsUID.indexOf(currentUserUID) > -1))) {
                        console.log(data.deadline)
                        dummy.push(data)
            }
        });

        setJobsPostedByOtherUsers(dummy)
    }, [loaderData])

    // function to handle the click of the job list item
    const handler = (job) => {
        console.log(job.title)

        navigate('/app/job-details', {state: {job, link: '/app/job-details'}})
    }

    return (
        <div className="view">

            {/* Filter bar component start*/}
            <div className="filter-bar">
                <h4>Filter</h4>
                <div className="filters">
                    <div className="category-filter">
                        <select 
                            defaultValue="" 
                            name="category" 
                            id="category" 
                            value={selectedCategory} 
                            onChange={(e)=>setSelectedCategory(e.target.value)}>
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
    )
}