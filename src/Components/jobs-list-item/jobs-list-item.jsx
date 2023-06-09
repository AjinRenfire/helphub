// css
import './jobs-list-item.css'

import {FiMapPin} from 'react-icons/fi'

import { JOB_PUBLIC_STATUS } from '../../routes/posting-job/post-job-page'
// constants
import { FIREBASE_COLLECTION_CHAT_ROOM, FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants"
import { JOB_PRIVATE_STATUS } from "../../routes/posting-job/post-job-page"

export default function JobsListItem({job, click}){
    return (
        <div className={`w-3/4 mx-auto px-6 py-4 border ${(job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED)?"border-emerald-600":"border-black "} ${(job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED)?"bg-emerald-50":""} shadow-sm rounded-sm first:rounded-t-lg last:rounded-b-lg only:rounded-lg hover:shadow-md ${(job.privateJobStatus === JOB_PRIVATE_STATUS.WORK_SUBMITTED)?"hover:shadow-emerald-200":"hover:shadow-violet-300 "}`} onClick={click}>
            <div className=" flex justify-between items-center">
                <div className=' space-y-3'>
                    <div className='flex items-center space-x-2' >
                        <h3 className=' text-2xl font-bold'>{job.title}</h3>
                        <p className=' text-gray-300 '> • </p>
                        <span className=' text-gray-900 text-xs font-medium border-violet-500 border rounded-full px-2 py-1'>{job.category}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-sm text-gray-400'> <FiMapPin/> <p>{job.location}</p> </div>
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