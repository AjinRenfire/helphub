import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

// firebase
import { auth } from "../../firebase/firebase.config"

/**
 * 
 * Active Jobs
 * 
 * The job which has been ACCEPTED for someone to do, and is still in progress
 * 
 * Otherwise,
 * 
 *  status is ACCEPTED and
 *  privateStatus is WORK_STILL_IN_PROGRESS
 * 
 */
export default function MyActiveJobs(){
    const [activeJobs, setActiveJobs] = useState([])
    const { data } = useOutletContext()

    useEffect(() => {
        setActiveJobs(data)
    }, [data])

    console.log("Active jobs ....", data)

    return (
        <>
            {
                activeJobs.length > 0 ? (
                    activeJobs.map((job) => (
                        <JobsListItem 
                            job={job}
                            key={job.jobUID}
                        />
                    ))
                ) : (
                    <h1>Fuck</h1>
                )
            }
        </>
    )
}