// css
import './jobs-list-item.css'

import { JOB_PUBLIC_STATUS } from '../../routes/posting-job/post-job-page'

export default function JobsListItem({job, click}){
    return (
        <div className=" w-3/4 mx-auto px-6 py-4 border border-black shadow-sm rounded-sm first:rounded-t-lg last:rounded-b-lg only:rounded-lg hover:shadow-md hover:shadow-violet-300" onClick={click}>
            <div className=" flex justify-between items-center">
                <div className=' space-y-3'>
                    <div className='flex items-center space-x-2' >
                        <h3 className=' text-2xl font-bold'>{job.title}</h3>
                        <p className=' text-gray-300 '> • </p>
                        <span className=' text-gray-900 text-xs font-medium border-violet-500 border rounded-full px-2 py-1'>{job.category}</span>
                    </div>
                    
                    <p className='w-96 truncate text-gray-700'>{job.description}</p>
                </div>
                <div className=' space-y-3'>
                    <div className="">
                        <h4 className=' text-lg font-semibold'> <span className=' text-gray-600 font-normal'> Cost: </span>{job.cost}</h4>
                    </div>
                    <div>
                        <p className=' text-sm text-gray-600'>Deadline</p>
                        <h4 className=' font-medium'>{job.deadline}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}