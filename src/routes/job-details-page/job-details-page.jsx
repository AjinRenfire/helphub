import {  redirect, useLocation } from "react-router-dom"

// components
import BackButton from "../../components/back-button-component/back-button"
import Button from "../../components/button-component/button-component"

// css
import './job-details-page.css'

// firebase
import { requestToDoTheJob } from "../../firebase/firebase.job"

export default function JobsDetailsPage(){
    const location = useLocation()
    const {job} = location.state

    // function to navigate to the previous page
    const back = () => {
        console.log('clicked')
        return redirect(location.state.link)
    }

    // function is called when the request to do the job button is clicked
    const request = async () => {
        try{
            const response = await requestToDoTheJob(job)
            if(! response){
                console.log('successfully updated...')

                return redirect('/app/job-listing')
            }
        }
        catch(error) {
            console.log(error)
        }
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
                        <div>{job.category}</div>
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

                <Button
                    buttonOptions={{
                        className: 'login-button',
                        value: 'Request to do the job...',
                        onClick: request
                    }}
                />
            </div>
        </div>
    )
}