// css
import './jobs-list-item.css'

import { JOB_PUBLIC_STATUS } from '../../routes/posting-job/post-job-page'

export default function JobsListItem({job, click}){
    return (
        <div className=" w-3/4 mx-auto px-6 py-4 border border-black shadow-sm rounded-sm first:rounded-t-lg last:rounded-b-lg only:rounded-lg" onClick={click}>
            <div className="job-list-general">
                <div className='job-list-left'>
                    <h3>{job.title}</h3>
                    <span className='job-category-mini'>{job.category}</span>
                    <p className='w-96 truncate'>{job.description}</p>
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