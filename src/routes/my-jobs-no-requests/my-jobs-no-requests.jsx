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
        // checking for some conditions
        // 1. creatorUID is equal to currentUserUID (already checked)
        // 2. status of the job is NO_REQUESTS_YET
        let dummy = []

        function check(d){
            if(d.status === JOB_PUBLIC_STATUS.NO_REQUESTS_YET){
                dummy.push(d)
            }
        }

        data.map((d) => check(d))
        setNoRequests(dummy)
    }, [data])

    return (
        <>
            {noRequests.length > 0 && <h1>Helpers are yet to request to your job</h1>}
            {
                noRequests.length > 0 ? (
                    noRequests.map((job) => (
                        <JobsListItem 
                            job={job} 
                            key={job.jobUID}
                        />
                    ))
                ) : (
                    <h1>Helpers are yet to request to your job</h1>
                )
            }
        </>
    )
}