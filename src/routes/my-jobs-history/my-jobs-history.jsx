import { useEffect, useState } from "react"
import { useLocation, useOutletContext } from "react-router-dom"

// firebase
import { UpdateBalance } from "../../firebase/firebase.job"

// components
import ListMsg from "../../Components/ListMsg"
import JobsListItem from "../../components/jobs-list-item/jobs-list-item"

import SharkImg from "../../assets/imgs/list-imgs/shark-lazy.png"

// constants
import { JOB_PRIVATE_STATUS, JOB_PUBLIC_STATUS } from "../posting-job/post-job-page"

/**
 * 
 * 
 * 
 * 
 * My Job History Page
 * 
 * 
 * Jobs posted by me, which are either completed  
 * 
 * 
 * 
 */
export default function MyJobsHistory(){
    const location = useLocation()
    const { data } = useOutletContext()
    const [historyJobs, setHistoryJobs] = useState([])

    useEffect(()=> {
       const summa = async () => {
            if(location.state != null){
                if('rating' in location.state){
                    const {job, rating} = location.state
    
                    await UpdateBalance(job, rating)
                }
            }
       }

       summa()
    })

    useEffect(() => {
        // check for some conditions
        // 1. creatorUID is equal to currentUserUID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. private status of the job is WORK_COMPLETED or deadline over aairukanum
        let dummy = []

        function check(d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.helperUID != null){
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
        <>
        <main className="space-y-4">
            {historyJobs.length > 0 && <h1 className="text-center">The completed and deadline over jobs are shown here..</h1>}
            <div className="space-y-4">
                {
                    historyJobs.length > 0 ? (
                        historyJobs.map((job) => (
                            <JobsListItem 
                                job={job}
                                key={job.jobUID}
                            />
                        ))
                    ) : (
                        <ListMsg image={SharkImg} message={"Nothing to show here...."}/>
                    )
                }
            </div>
            
            
        </main>
        </>
    )
}