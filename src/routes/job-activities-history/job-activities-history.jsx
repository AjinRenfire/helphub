import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

// components
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"
import ListMsg from "../../Components/ListMsg"

import SharkImg from "../../assets/imgs/list-imgs/shark-lazy.png"

import { JOB_PUBLIC_STATUS, JOB_PRIVATE_STATUS } from "../posting-job/post-job-page"

/**
 * 
 * 
 * 
 * Job Activities History Page
 * 
 * 
 * The jobs I have done and the poster has accepted the work
 * 
 * 
 * 
 * 
 */
export default function JobActivitiesHistoryPage(){
    const [historyJobs, setHistoryJobs] = useState([])
    const {data} = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        let dummy = []
        const currentUserUID = localStorage.getItem("userUID")

        // check for some conditions
        // 1. creatorUID is not equal to current user UID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. helperUID of the job is the currentUserUID
        // 4. private status of the job is Work Completed
        function check (d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.helperUID === currentUserUID){
                    if(d.privateJobStatus === JOB_PRIVATE_STATUS.WORK_ACCEPTED){
                        dummy.push(d)
                    }
                }
            }
        }

        data.map((d) => check(d))
        setHistoryJobs(dummy)
    }, [data])

    return (
        <main className="space-y-6">
            {historyJobs.length > 0 && <h1 className="text-center" >You have worked on these jobs in the past</h1>}
            <div className="space-y-4">
                {
                    historyJobs.length > 0 ? (
                        historyJobs.map((job) => (
                            <JobsListItem 
                                key={job.jobUID}
                                job={job}
                            />
                        ))
                    ) : (
                        <ListMsg image={SharkImg} message={"You are yet to do a work..."}/>
                    )
                }
            </div>
            
        </main>
    )
}