import { useNavigate } from 'react-router-dom'

// components
import JobPendingAccept from '../job-pending-accept/job-pending-accept'

// css
import './job-list-pending-item.css'

// firebase
import { respondToAcceptReject } from '../../firebase/firebase.job'

export default function JobListPendingItem({job, refresh}){
    const {requestorsUID} = job
    const navigate = useNavigate()

    // gets triggered when the user clicks the Accept/Reject Button
    const decision = async ({decision, requestorUID}) => {
        if(decision == 'Accept'){
            
        }   
        else{
            // deleting the requestorUID from the requestorsUID array of the job
            await respondToAcceptReject(job.jobUID, requestorUID, decision)

            refresh()
        }     
    }

    return (
        <div className="job-list-item">
            <div className="job-list-general">
                <div className='job-list-left'>
                    <h3>{job.title}</h3>
                    <span>{job.category}</span>
                </div>
                <div className='job-list-right'>
                    <div className="job-cost">
                        <h4>Cost: {job.cost}</h4>
                    </div>
                </div>
            </div>
            <div>
            
            {
                requestorsUID.map((requestorUID) => (
                    <JobPendingAccept
                        requestorUID = {requestorUID}
                        decision={decision}
                        key={requestorUID}
                    />
                ))
            }
            </div>
        </div>
    )
}
