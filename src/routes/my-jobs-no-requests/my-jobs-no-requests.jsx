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
    const {loaderData} = useOutletContext()
    const [noRequests, setNoRequests] = useState([])

    useEffect(() => {
        let dummy = []
        const currentUserUID = auth.currentUser.uid

        // loaderData contains the snapshots for all the documents
        // getting the data from all the snapshots
        // filtering out the jobs, for which I posted and no requests have been made
        loaderData.forEach((snapshot) => {
            let data = snapshot.data()

            if((currentUserUID === data.creatorUID) && (data.status === JOB_PUBLIC_STATUS.NO_REQUESTS_YET)){
                dummy.push(data)
            }
        });

        setNoRequests(dummy)
    }, [loaderData])

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
                    <h1>U have no active jobs</h1>
                )
            }
        </>
    )
}