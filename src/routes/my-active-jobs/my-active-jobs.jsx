import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

// firebase
import { auth } from "../../firebase/firebase.config"
import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"
import { JOB_PRIVATE_STATUS } from "../posting-job/post-job-page"

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
        // check for some conditions
        // 1. creatorUID is equal to currentUserUID
        // 2. status of the job is ACCEPTED
        // 3. private status is WORK_STILL_IN_PROGRESS
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        function check(d){
            if(d.creatorUID === currentUserUID){
                if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                    if(d.privateJobStatus === JOB_PRIVATE_STATUS.WORK_STILL_IN_PROGRESS){
                        dummy.push(d)
                    }
                }
            }
        }

        data.map((d) => check(d))
        setActiveJobs(dummy)
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
                    <h1>None of the jobs you posted, are active at the moment</h1>
                )
            }
        </>
    )
}