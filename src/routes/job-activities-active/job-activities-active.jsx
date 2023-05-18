import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"
import ListMsg from "../../Components/ListMsg"


import SharkImg from "../../assets/imgs/list-imgs/shark.png"

import { JOB_PUBLIC_STATUS, JOB_PRIVATE_STATUS } from "../posting-job/post-job-page"



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
    const navigate = useNavigate()

    useEffect(() => {
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        // check for some conditions
        // 1. creatorUID is not equal to current user UID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. helperUID of the job is the currentUserUID
        // 4. private status of the job should not be equal to Work Completed
        function check (d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.helperUID === currentUserUID){
                    if(d.privateJobStatus == JOB_PRIVATE_STATUS.WORK_STILL_IN_PROGRESS || d.privateJobStatus == JOB_PRIVATE_STATUS.WORK_SUBMITTED){
                        dummy.push(d)
                    }
                }
            }
        }

        data.map((d) => check(d))
        setActiveJobs(dummy)
    }, [data])

    // function is called when the job is clicked
    function handle(job){
        navigate('/app/job-details', {state: {jobUID: job.jobUID, from: '/app/job-activities/active'}})
    }

    return (
        <main className="space-y-6">
            {activeJobs.length > 0 && <h1 className="text-center" >You are working on these jobs currently!</h1>}
            <div className="space-y-4">
                {
                    activeJobs.length > 0 ? (
                        activeJobs.map((job) => (
                            <JobsListItem 
                                key={job.jobUID}
                                job={job}
                                click={() => handle(job)}
                            />
                        ))
                    ) : (
                        <ListMsg image={SharkImg} message={"All caught up!!"}/>
                    )
                }
            </div>
            
        </main>
    )
}