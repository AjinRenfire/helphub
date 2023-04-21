import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

// firebase
import { auth } from "../../firebase/firebase.config"

export default function MyActiveJobs(){
    const [activeJobs, setActiveJobs] = useState([])
    const { loaderData } = useOutletContext()

    useEffect(() => {
        let dummy = []
        let currentUserID = auth.currentUser.uid
        
        // loaderData contains the snapshots all job documents
        // 1. going through each document snapshot and getting the data
        // 2. checking if the current user ID is the creator UID
        //      if both are same, pushing the job to the array
        loaderData.forEach((snapshot) => {
            let data = snapshot.data()

            if(data.creatorUID === currentUserID) dummy.push(data)
        });

        setActiveJobs(dummy)
    }, [loaderData])

    return (
        <>
        {
            activeJobs.length > 0 ? (
                activeJobs.map((job) => (<JobsListItem job={job} key={job.jobUID}/>))
            ) : (
                <h1>U have no active jobs</h1>
            )
        }
        </>
    )
}