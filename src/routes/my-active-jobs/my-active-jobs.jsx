import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

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
    const navigate = useNavigate()

    useEffect(() => {
        // check for some conditions
        // 1. creatorUID is equal to currentUserUID (already checked)
        // 2. status of the job is ACCEPTED
        // 3. private status is WORK_STILL_IN_PROGRESS
        // 4. helperUID is not null
        let dummy = []

        function check(d){
            if(d.status === JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB){
                if(d.privateJobStatus === JOB_PRIVATE_STATUS.WORK_STILL_IN_PROGRESS){
                    if(d.helperUID != null){
                        dummy.push(d)
                    }
                }
            }
        }

        data.map((d) => check(d))
        setActiveJobs(dummy)
    }, [data])

    // function is triggered when the user click on a job
    // navigating the user to the job details page
    const handler = (job) => {
        navigate('/app/job-details', {state: {job, from: '/app/my-jobs/active'}})
    }

    return (
        <>
        <main className="">
            {activeJobs.length > 0 && <h1>The helpers are working on the job you have posted</h1>}
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
                    <h1>None of the jobs you posted, are active at the moment</h1>
                )
            }
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
            
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aliquam dolorem velit ab est, tempora numquam! Magni neque accusamus rem consectetur pariatur, dolores excepturi eligendi, quibusdam fugit eveniet nisi non.</p>
        </main>
        </>
    )
}