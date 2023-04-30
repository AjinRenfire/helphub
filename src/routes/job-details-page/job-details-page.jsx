import {  redirect, useLocation, useNavigate } from "react-router-dom"

// components
import BackButton from "../../components/back-button-component/back-button"
import Button from "../../components/button-component/button-component"

// css
import './job-details-page.css'

// firebase
import { requestToDoTheJob } from "../../firebase/firebase.job"

export default function JobsDetailsPage(){
    const location = useLocation()
    const {job, from} = location.state
    const navigate = useNavigate()

    // function to navigate to the previous page
    const back = () => {
        navigate(-1)
    }

    // function is called when the request to do the job button is clicked
    const request = async () => {
        try{
            const response = await requestToDoTheJob(job)
            if(! response){
                navigate('/app/job-activities/pending')
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // function is called when the user clicks the Chat button
    function chat(){
        navigate('/app/chat')
    }
    
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
                

                {/** Should render if only opened from Job Listings Page */}
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
                            <button onClick={() => chat()} style={{marginRight: '10px'}}>Chat</button>
                            <button>Report</button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}