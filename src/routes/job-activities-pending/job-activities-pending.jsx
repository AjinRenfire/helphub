import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"

// constants
import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

import ListMsg from "../../Components/ListMsg";

import SharkImg from "../../assets/imgs/list-imgs/shark-sleep.png"
/**
 * 
 * Job Activities Pending
 * 
 * 
 * Means, I have requested to do for someone's job and the requestor is yet to accept my request
 * 
 * 
 */
export default function JobActivitiesPendingPage(){
    const {data} = useOutletContext()
    const [pendingRequests, setPendingRequests] = useState([])

    useEffect(() => {
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        function check(d){
            // check for some conditions
            // 1. creatorUID is not equal to currentUserUID (already checked)
            // 2. status of the job is REQUESTS_ARRIVED
            // 3. requestorsUID array of the job should include the current user UID
            //    -> means the user has requested for the job already
            if(d.status === JOB_PUBLIC_STATUS.REQUESTS_ARRIVED){
                if(d.requestorsUID.indexOf(currentUserUID) > -1){
                    dummy.push(d)
                }
            }
        }

        data.map((d) => check(d))
        setPendingRequests(dummy)
    }, [])

    console.log("Pending Requests : ", pendingRequests)

    return (
        <main className="space-y-6">
            {pendingRequests.length > 0 && <h1 className="text-center" >The creator of the job is yet to accept your requests</h1>}
            <div className="space-y-4">
                {
                    pendingRequests.length > 0 ? (
                        pendingRequests.map((job) => {
                            return <JobsListItem
                                key={job.jobUID}
                                job={job}
                            />
                        })
                    ) : (
                        <ListMsg image={SharkImg} message={"So empty, come back later"}/>
                    )
                }
            </div>
            
        </main>
    )
}