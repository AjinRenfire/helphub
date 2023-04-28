import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// firebase
import { auth } from "../../firebase/firebase.config"
import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"

// components
import JobListPendingItem from "../../components/job-list-pending-item/job-list-pending-item"

/**
 * 
 * My job pending requests
 * 
 * The jobs I have posted, for which some or many requests have come
 * 
 * Otherwise, 
 * 
 * status is REQUESTS_ARRIVED
 * 
 * 
 */
export default function MyJobsPendingRequestsPage (){
    const { data } = useOutletContext()
    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        setPendingRequests(data)
    }, [data])

    return (
        <>
            {
                
                pendingRequests.length > 0 ? (
                    pendingRequests.map((job) => 
                        (
                            <JobListPendingItem 
                                job={job} 
                                key={job.jobUID}
                            />
                        )
                    )
                ) : (
                    <h1>U have no pending jobs</h1>
                )
            }
        </>
    )
}