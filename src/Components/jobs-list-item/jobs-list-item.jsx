// css
import './jobs-list-item.css'

import { JOB_PUBLIC_STATUS } from '../../routes/posting-job/post-job-page'

export default function JobsListItem({job, click}){
    return (
        <div className="job-list-item" onClick={click}>
            <div className="job-list-general">
                <div className='job-list-left'>
                    <h3>{job.title}</h3>
                    <span>{job.category}</span>
                    <p>{job.description}</p>
                </div>
                <div className='job-list-right'>
                    <div className="job-cost">
                        <h4>Cost: {job.cost}</h4>
                    </div>
                    <div>
                        <p>Deadline</p>
                        <h4>{job.deadline}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}