import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"
import ListMsg from "../../Components/ListMsg";

import SharkImg from "../../assets/imgs/list-imgs/shark-coffee.png"

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
            <main className="space-y-4">
            {noRequests.length > 0 && <h1 className="text-center">No requests for these helps</h1>}
            <div className="space-y-4">
            {
                noRequests.length > 0 ? (
                    noRequests.map((job) => (
                        <JobsListItem 
                            job={job} 
                            key={job.jobUID}
                        />
                    ))
                ) : (
                    <ListMsg image={SharkImg} message={"Nothing to do ,huh?!"}/>
                    
                )
            }
            </div>
            
            </main>
            {/* {noRequests.length > 0 && <h1>Helpers are yet to request to your job</h1>} */}
            
        </>
    )
}