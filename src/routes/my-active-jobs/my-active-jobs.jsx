import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"
import ListMsg from "../../Components/ListMsg"


import SharkImg from "../../assets/imgs/list-imgs/shark.png"

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
    const navigate = useNavigate()

    useEffect(() => {
        // check for some conditions
        // 1. creatorUID is equal to currentUserUID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. helperUID is not null
        let dummy = []

        function check(d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.helperUID != null){
                    dummy.push(d)
                }
            }
        }

        data.map((d) => check(d))
        setActiveJobs(dummy)
    }, [data])

    // function is triggered when the user click on a job
    // navigating the user to the job details page
    const handler = (job) => {
        navigate('/app/job-details', {state: {jobUID: job.jobUID, from: '/app/my-jobs/active'}})
    }

    return (
        <>
        <main className="space-y-4">
            {activeJobs.length > 0 && <h1 className="text-center">The helpers are working on the job you have posted</h1>}
            <div className="space-y-4">
                {
                    activeJobs.length > 0 ? (
                        activeJobs.map((job) => (
                            <JobsListItem 
                                job={job}
                                key={job.jobUID}
                                click={() => handler(job)}
                            />
                        ))
                    ) : (
                        <ListMsg image={SharkImg} message={"All caught up!!"}/>
                    )
                }
            </div>
            
            
        </main>
        </>
    )
}