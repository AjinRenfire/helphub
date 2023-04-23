// components
import JobPendingAccept from '../job-pending-accept/job-pending-accept'

// css
import './job-list-pending-item.css'

export default function JobListPendingItem({job}){
    const {requestorsUID} = job

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
                    />
                ))
            }
            </div>
        </div>
    )
}
