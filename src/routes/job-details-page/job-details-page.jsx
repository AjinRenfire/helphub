import {  redirect, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// components
import BackButton from "../../components/back-button-component/back-button"
import Button from "../../components/button-component/button-component"

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

    useEffect(() => {
        // listening to particular chat document in the Chats Collection
        // only if the the page is opened from '/app/my-jobs/active' or '/app/my-jobs/active'
        const unsubscribe = () => {
            onSnapshot(doc(database, FIREBASE_COLLECTION_CHAT_ROOM, job.chatRoomUID), (doc) => {
                setChat(doc.data())
            })
        }

        console.log("use effect runing")

        if(from === '/app/my-jobs/active' || '/app/job-activities/active') unsubscribe()
    }, [job])
    
    return (
        <div className="view">
            <BackButton 
                back={back}
            />
            <div className="job-detail">
                <div className="job-primary-detail">
                    <div className="job-primary-left">
                        <h3>{job.title}</h3>
                        <div className="job-category">{job.category}</div>
                    </div>
                    <div className="job-primary-right">
                        <p>Cost</p>
                        <h4>{job.cost}</h4>
                    </div>
                </div>
                <div className="job-secondary">
                    <h3>Job Description</h3>
                    <p>{job.description}</p>
                </div>
                <div className="job-secondary" style={{color: 'red'}}>
                    <h3>Deadline</h3>
                    <p>{job.deadline}</p>
                </div>
                

                {/** Should render only if opened from Job Listings Page */}
                {/** Here, the user has come to request for the job */}
                {
                    from === '/app/job-listing' && (
                        <Button
                            buttonOptions={{
                                className: 'login-button',
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
                        <div style={{diplay: 'flex'}}>
                            <button onClick={() => goToChatPage()} style={{marginRight: '10px'}}>Chat</button>
                            <button>Report</button>
                        </div>
                    ) 
                }

                {/** Should render if only opened from Job Activities/Active Jobs Page */}
                {/** Here, the one who opens this page is the helper of the job */}
                {
                    from === '/app/job-activities/active' && (
                        <div style={{diplay: 'flex'}}>
                            <button style={{marginRight: '10px'}}>Submit Work</button>
                            <button onClick={() => goToChatPage()} style={{marginRight: '10px'}}>Chat</button>
                            <button>Report</button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}