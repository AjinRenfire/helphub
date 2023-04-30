import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

import { JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"

/**
 * 
 * Job Activities Page
 * 
 * The jobs I am currently working on
 * 
 * 
 */
export default function JobActivitiesActivePage(){
    const [activeJobs, setActiveJobs] = useState([])
    const {data} = useOutletContext()

    useEffect(() => {
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        // check for some conditions
        // 1. creatorUID is not equal to current user UID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. helperUID of the job is the currentUserUID
        function check (d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.helperUID === currentUserUID){
                    dummy.push(d)
                }
            }
        }

        data.map((d) => check(d))
        setActiveJobs(dummy)
    }, [data])

    return (
        <>
            {activeJobs.length > 0 && <h1>You are working on these jobs currently!</h1>}
            {
                activeJobs.length > 0 ? (
                    activeJobs.map((job) => (
                        <JobsListItem 
                            key={job.jobUID}
                            job={job}
                        />
                    ))
                ) : (
                    <h1>You are not working on any jobs currently!</h1>
                )
            }
        </>
    )
}