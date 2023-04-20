// css
import './jobs-list-item.css'

export default function JobsListItem({job}){
    return (
        <div className="job-list-item">
            <div className='job-list-left'>
                <h3>{job.title}</h3>
                <span>{job.category}</span>
                <p>{job.description}</p>
            </div>
            <div className='job-list-right'>
                
            </div>
        </div>
    )
}