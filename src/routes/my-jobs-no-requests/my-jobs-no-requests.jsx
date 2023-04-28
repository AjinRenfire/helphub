import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

// firebase
import { auth } from "../../firebase/firebase.config"

import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"

/**
 * 
 * No requests yet
 * 
 * The job I posted, for which the status is NO_REQUESTS_YET
 * 
 */
export default function MyJobsNoRequestsYetPage(){
    const {data} = useOutletContext()
    const [noRequests, setNoRequests] = useState([])

    useEffect(() => {
        setNoRequests(data)
    }, [data])

    return (
        <>
            {
                noRequests.length > 0 ? (
                    noRequests.map((job) => (
                        <JobsListItem 
                            job={job} 
                            key={job.jobUID}
                                    
                        />
                    ))
                ) : (
                    <h1>U have no requests</h1>
                )
            }
        </>
    )
}