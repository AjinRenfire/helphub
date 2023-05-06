import {  redirect, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

// components
import BackButton from "../../components/back-button-component/back-button"
import Button from "../../Components/button-component/button-component"

// css
import './job-details-page.css'

// firebase
import { requestToDoTheJob } from "../../firebase/firebase.job"
import { onSnapshot, doc } from "firebase/firestore"
import { database } from "../../firebase/firebase.config"

// constants
import { FIREBASE_COLLECTION_CHAT_ROOM } from "../../utils/constants"

export default function JobsDetailsPage(){
    const location = useLocation()
    const {job, from} = location.state
    const navigate = useNavigate()
    const [chat, setChat] = useState({})

   

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

    

    // this useEffect() or rather the function unsubscribe is executed, only when this page is opened from two routes
    // 1. '/app/my-jobs/active'
    //     -> If thie page is opened from the above link, then the creator of the job has opened the page
    // 2. '/app/job-activities/active'
    //     -> If thie page is opened from the above link, then the helper of the job has opened the page
    useEffect(() => {
        // listening to particular chat document in the Chats Collection
        // only if the the page is opened from '/app/my-jobs/active' or '/app/my-jobs/active'
        const unsubscribe = () => {
            const chatDocReference = doc(database, FIREBASE_COLLECTION_CHAT_ROOM, job.chatRoomUID)
            onSnapshot(chatDocReference, (doc) => {
                setChat(doc.data())
            })
        }

        if((from === '/app/my-jobs/active') || (from === '/app/job-activities/active')) {
            unsubscribe()
        }
    }, [job])


    
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
                                <button onClick={() => goToChatPage()} className="border-2 border-violet-600 px-6 rounded-full w-auto text-violet-600 py-2 hover:bg-violet-600 hover:text-white">Chat</button>
                                <button className=" border-2 border-red-600 px-6 rounded-full w-auto text-red-700 py-2 hover:bg-red-600 hover:text-white">Report</button>
                            </div>
                        ) 
                    }

                    {/** Should render if only opened from Job Activities/Active Jobs Page */}
                    {/** Here, the one who opens this page is the helper of the job */}
                    {
                        from === '/app/job-activities/active' && (
                            <div className="space-x-4 flex justify-center items-center">
                                <button className="bg-violet-500 border-2 border-violet-500 px-6 rounded-full w-auto text-white py-2 hover:bg-violet-900 hover:border-violet-900" >Submit Work</button>
                                <button onClick={() => goToChatPage()} className="border-2 border-violet-600 px-6 rounded-full w-auto text-violet-600 py-2 hover:bg-violet-600 hover:text-white" >Chat</button>
                                <button className=" border-2 border-red-600 px-6 rounded-full w-auto text-red-700 py-2 hover:bg-red-600 hover:text-white">Report</button>
                            </div>
                        ) 
                    }

                    
                </div>
            </div>
            
        </div>
    )
}