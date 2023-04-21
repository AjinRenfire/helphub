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
    const {loaderData} = useOutletContext()
    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        let dummy = []
        const currentUserUID = auth.currentUser.uid
        
        // loaderData contains the snapshots all job documents
        // 1. going through each document snapshot and getting the data
        // 2. consitions:
        //      2.1 -> creatorUID should be === currentUserUID
        //      2.2 -> status is REQUESTS_ARRIVED
        //      2.3 -> requestors UID array is not empty 
        // 3. if and only if the conditions are met, pushing the data to the array
        loaderData.forEach((snapshot) => {
            let data = snapshot.data()

            if((data.creatorUID === currentUserUID) &&
                (data.status === JOB_PUBLIC_STATUS.REQUESTS_ARRIVED) &&
                    (data.requestorsUID.length > 0)){
                        dummy.push(data)
            }
        });

        setPendingRequests(dummy)
    }, [loaderData])

    return (
        <>
            {
                pendingRequests.length > 0 ? (
                    pendingRequests.map((job) => (
                        <JobListPendingItem 
                            job={job} 
                            key={job.jobUID}
                        />
                    ))
                ) : (
                    <h1>U have no active jobs</h1>
                )
            }
        </>
    )
}