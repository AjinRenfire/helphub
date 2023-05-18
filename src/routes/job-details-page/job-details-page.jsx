import {  Form, redirect, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"

// components
import BackButton from "../../components/back-button-component/back-button"
import Button from "../../Components/button-component/button-component"
import RatingModal from "../../Components/RatingModal"

// css
import './job-details-page.css'

import { FiStar,FiX } from "react-icons/fi"

// firebase
import { requestToDoTheJob, updatePrivateStatusOfTheJob, updateRating, PayFunction, UpdateBalance } from "../../firebase/firebase.job"
import { onSnapshot, doc } from "firebase/firestore"
import { database } from "../../firebase/firebase.config"

// constants
import { FIREBASE_COLLECTION_CHAT_ROOM, FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants"
import { JOB_PRIVATE_STATUS } from "../posting-job/post-job-page"

export default function JobsDetailsPage(){
    const location = useLocation()
    const {jobUID, from} = location.state
    const navigate = useNavigate()
    
    const [chat, setChat] = useState({})
    const [job, setJob] = useState({})
    const [rating, setRating] = useState(0);

    // const cacheRating = useMemo(()=>
    //    {return rating;} 
    // ,[rating]);

    // setRating(cacheRating);

    const [ isModalOpen , setIsModalOpen] = useState(false);

    // function to navigate to the previous page
    const back = () => {
        navigate(-1)
    }

    // function is called when the request to do the job button is clicked
    const request = async () => {
        try{
            const response = await requestToDoTheJob(job)
            if(! response){
                navigate('/app/jobs-listing')
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // function is called when the creator of the job clicks the Chat button
    function goToChatPage(){
        const currentUserUID = localStorage.getItem("userUID")
        
        let openedAs = currentUserUID === job.creatorUID ? 'Creator' : 'Helper'
        navigate('/app/chat', {state: {chat, openedAs: openedAs}})
    }

    // this useEffect() is listening to changes in the job document
    useEffect(() => {
        const unsubscribe = () => {
            const jobDocReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)
            onSnapshot(jobDocReference, (doc) => {
                setJob(doc.data())
            })
        }

        return unsubscribe()
    }, [jobUID])

    // this useEffect() or rather the function unsubscribe is executed, only when this page is opened from two routes
    // 1. '/app/my-jobs/active'
    //     -> If thie page is opened from the above link, then the creator of the job has opened the page
    // 2. '/app/job-activities/active'
    //     -> If thie page is opened from the above link, then the helper of the job has opened the page
    useEffect(() => {
        if('jobUID' in job){
            // listening to particular chat document in the Chats Collection
            // only if the the page is opened from '/app/my-jobs/active' or '/app/my-jobs/active'
            const unsubscribe = () => {
                const chatDocReference = doc(database, FIREBASE_COLLECTION_CHAT_ROOM, job.chatRoomUID)
                onSnapshot(chatDocReference, (doc) => {
                    setChat(doc.data())
                })
            }

            if((from === '/app/my-jobs/active') || (from === '/app/job-activities/active')) {
                return unsubscribe()
            }
        }
    }, [job])

    /**
     * 
     * 
     * Function to handle when the helper submits the work
     * 
     * changing the private status of the job to Work Submitted
     * 
     * 
     * 
     */
    async function HandleSubmit(){
        // setting the private status of the job to WORK_SUBMITTED
        try{
            await updatePrivateStatusOfTheJob(job.jobUID, JOB_PRIVATE_STATUS.WORK_SUBMITTED)
        }
        catch(error){
            console.log('error')
        }
    }

    function HandleAccept(){
        setIsModalOpen(true)
    }

    function HandleModalClose() {
        setIsModalOpen(false)
    }

    function HandlesetRating(rat){
        setRating(rat)
        console.log(rat)
    }

    // function to execute when the poster clicks the Pay Button in the Rating Modal
    async function HandlePay(){
        // only editing the rating and updating the status of the job
        await PayFunction(job, rating)

        await UpdateBalance(job, updateRating)

        // doing the rest in the my job/job history route
        navigate('/app/my-jobs/history')
    }

    return (
        <div className="mt-20 w-2/3 block mx-auto lg:ml-96 ">
            <BackButton 
                back={back}
            />
            <div className="w-2/3 mx-auto space-y-16">
                <div className="flex justify-between">
                    <div className=" flex flex-col items-start space-y-6">
                        <h3 className="text-3xl font-bold">{job.title}</h3>
                        <p className="text-gray-900 text-s font-medium border-violet-500 border rounded-full px-4 py-1">{job.category}</p>
                        <div className="">
                            <h3 className="text-gray-700 font-bold text-lg">Job Description</h3>
                            <p className="w-96 whitespace-normal break-normal text-gray-900">{job.description}</p>
                        </div>
                        <div className="" >
                            <h3 className="text-gray-700 font-semibold">Deadline</h3>
                            <p className=" text-red-500 font-bold text-lg">{job.deadline}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold">Location</h3>
                            <p className=" text-gray-900 font-medium text-lg">{job.location}</p>
                        </div>
                    </div>
                    
                    <div className="">
                            <p className="text-lg text-gray-700">Cost</p>
                            <h4 className="text-gray-900 text-center text-xl font-bold">{job.cost}</h4>
                    </div>
                    
                </div>
                

                <div className=" space-x-4">
                    {/** Should render only if opened from Job Listings Page */}
                    {/** Here, the user has come to request for the job */}
                    {
                        from === '/app/job-listing' && (
                            <Button
                                buttonOptions={{
                                    className: 'bg-violet-500 px-6 rounded-full w-auto text-white py-2 hover:bg-violet-900',
                                    value: 'Request to do the job...',
                                    onClick: request
                                }}
                            />
                        )
                    }

                    {/** Should render if only opened from My Jobs/Active Jobs Page */}
                    {/** Here, the one who opens this page is the creator of the job */}
                    {
                        from === '/app/my-jobs/active' && (
                            <div className="space-x-4 flex justify-center items-center">
                                {
                                    // if the helper submitted the work.....
                                    // Ajin style paniru...
                                    ((job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED) || (job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_ACCEPTED)) ? (
                                        <div>
                                           {
                                            // if job private status is Work Submitted
                                            // showing the button to accept the work
                                                job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED ? (
                                                    <div>
                                                        {/* <p>The user has submitted the work</p>   */}
                                                        <button 
                                                            type="button" 
                                                            onClick={HandleAccept} 
                                                            title="The user has submitted the work"
                                                            className="border-2 border-emerald-600 px-6 rounded-full w-auto text-emerald-600 py-2 hover:bg-emerald-600 hover:text-white"
                                                        >Accept the work</button>
                                                    </div>
                                                    ) : (
                                                    <div className="">
                                                        
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ):(
                                        // the user has not submitted the work yet
                                        // so, disabling the Accept the work button
                                        <div className="">
                                            <button 
                                                disabled
                                                type="button" 
                                                title="The user has not submitted the work"
                                                className="border-2 border-slate-300 px-6 rounded-full w-auto bg-slate-300 text-slate-600 py-2 hover:cursor-not-allowed"
                                            >Accept the work</button>         
                                        </div>    
                                    )
                                }
                                <button onClick={() => goToChatPage()} className="border-2 border-violet-600 px-6 rounded-full w-auto text-violet-600 py-2 hover:bg-violet-600 hover:text-white">Chat</button>
                                <button className=" border-2 border-red-600 px-6 rounded-full w-auto text-red-700 py-2 hover:bg-red-600 hover:text-white">Report</button>
                            </div>
                        ) 
                    }

                    

                    {/** Should render if only opened from Job Activities/Active Jobs Page */}
                    {/** Here, the one who opens this page is the helper of the job */}
                    {
                        from === '/app/job-activities/active' && (
                            <>
                                <div className="space-x-4 flex justify-center items-center">
                                    {
                                        // not showing the submit work button, if the private status of the job is Work Submitted
                                        job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_STILL_IN_PROGRESS && (
                                            <button 
                                                className="bg-violet-500 border-2 border-violet-500 px-6 rounded-full w-auto text-white py-2 hover:bg-violet-900 hover:border-violet-900" 
                                                onClick={HandleSubmit}
                                            >Submit Work</button>
                                        )
                                    }
                                    <button onClick={() => goToChatPage()} className="border-2 border-violet-600 px-6 rounded-full w-auto text-violet-600 py-2 hover:bg-violet-600 hover:text-white" >Chat</button>
                                    <button className=" border-2 border-red-600 px-6 rounded-full w-auto text-red-700 py-2 hover:bg-red-600 hover:text-white">Report</button>
                                </div>
                                <div className=" px-6 py-4 ">
                                        {job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED && <p className="text-center px-6 py-4 bg-emerald-200 rounded-lg">You have submitted the work,wait for acceptance</p>}
                                </div>
                            </>
                            
                        ) 
                    }
                    
                    
                </div>
            </div>
            {/* <RatingModal  open={open}/> */}
            <RatingModal isOpen={isModalOpen} handleModalClose={HandleModalClose} rating={rating} setRating={HandlesetRating} handlePay={HandlePay} cost={job.cost} />
            
        </div>
    )
}
