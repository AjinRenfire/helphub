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
        // checking for some conditions
        // 1. creatorUID is equal to currentUserUID (already checked)
        // 2. status of the job is REQUESTS_ARRIVED
        // 3. requestorsUID should not be empty
        let dummy = []

        function check(d){
            if(d.status === JOB_PUBLIC_STATUS.REQUESTS_ARRIVED){
                if(d.requestorsUID.length > 0){
                    dummy.push(d)
                }
            }
        }

        data.map((d) => check(d))
        setPendingRequests(dummy)
    }, [data])

    return (
        <>  
        <main className="space-y-1">
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
                    <h1>U have no pending Requests</h1>
                )
            }
        </main>
            
        </>
    )
}