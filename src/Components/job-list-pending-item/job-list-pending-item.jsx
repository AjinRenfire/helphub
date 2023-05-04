import { useNavigate } from 'react-router-dom'

// components
import JobPendingAccept from "../job-pending-accept/job-pending-accept.jsx";

// css
import './job-list-pending-item.css'

// firebase
import { respondToAcceptReject } from '../../firebase/firebase.job'

export default function JobListPendingItem({job}){
    const {requestorsUID} = job
    const navigate = useNavigate()

    // gets triggered when the user clicks the Accept/Reject Button
    const decision = async ({decision, requestorUID}) => {
        const res = await respondToAcceptReject(job.jobUID, requestorUID, decision)

        console.log(res)
    }

    return (
        <div className=" w-3/4 mx-auto px-6 py-4 border border-black shadow-sm space-y-5 first:rounded-t-lg last:rounded-b-lg only:rounded-lg hover:shadow-md hover:shadow-violet-300">
            <div className="flex justify-between">
                <div className=' justify-self-start flex items-center space-x-2'>
                    <h3 className='text-2xl font-bold'>{job.title}</h3>
                    <p className=' text-gray-300 '> • </p>
                    <p className=' text-gray-900 text-xs font-medium border-violet-500 border rounded-full px-2 py-1'> {job.category}</p>
                </div>
                <div className=''>
                    <div className="">
                        <h4 className='text-lg font-semibold'> <span className='text-gray-600 font-normal'> Cost:</span> {job.cost}</h4>
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
