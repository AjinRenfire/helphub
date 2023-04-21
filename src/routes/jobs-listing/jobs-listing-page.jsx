import { useEffect, useState } from "react"
import { useNavigate, useLoaderData } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

// firebase
import { auth } from "../../firebase/firebase.config"

export default function JobsListingPage(){
    const loaderData = useLoaderData()
    const [jobsPostedByOtherUsers, setJobsPostedByOtherUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let dummy = []
        const currentUserUID = auth.currentUser.uid

        // loaderData contains the snapshots all job documents
        // 1. going through each document snapshot and getting the data
        // 2. checking for some conditions
        //    2.1 -> if currentUserUID is not the creatorUID of the job
        //    2.2 -> status of the job is not ACCEPTED yet
        // 3. pushing the job to the dummy array, only if the conditions are met
        loaderData.forEach((snapshot) => {
            let data = snapshot.data()

            if((! (data.creatorUID === currentUserUID)) && (! (data.status === 'ACCEPTED'))) dummy.push(data)
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
            {
                jobsPostedByOtherUsers.map((job) => {
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