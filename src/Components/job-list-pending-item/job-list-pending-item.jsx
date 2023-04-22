import { useEffect, useState } from 'react'

// css
import './job-list-pending-item.css'

// firebase
import { getUserDocument } from '../../firebase/firebase.user'

export default function JobListPendingItem({job}){
    const {requestorsUID} = job
    const [requestors, setRequestors] = useState([]);
    let reqqq = [];
    
    useEffect(() => {
        // getting all the user details of the requestors
        let dummy = []

        requestorsUID.forEach(async (requestorUID) => {
            let user = (await getUserDocument(requestorUID)).data()
            dummy.push(user)
        });

        //console.log(dummy)

        setRequestors(dummy)
        reqqq = dummy;
        
        
    }, [])

    
    
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
                requestors.map((requestor) => (
                    <div className="list-pending-item">
                        
                        <p>{requestor.email}</p>
                    </div>
                ))
            }
            </div>
            
        </div>
    )
}
