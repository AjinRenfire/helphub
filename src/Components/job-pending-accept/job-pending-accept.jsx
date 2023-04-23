import { useEffect, useState } from 'react'

// firebase
import { getUserDocument } from '../../firebase/firebase.user'

export default function JobPendingAccept({requestorUID, accept, reject}){
    const [requestor, setRequestor] = useState({})

    useEffect(() => {
        async function fetchUserData(){
            let userDocSnapshot = await getUserDocument(requestorUID)
            let user = userDocSnapshot.data()

            setRequestor(user)
        }

        fetchUserData()
    }, [])

    return (
        <>
        {
            requestor.email ? (
                <div className="list-pending-item">
                    <div className="pending-name">
                        <p className='margin-p'>{requestor.email}</p>
                        <p className='margin-p'>4</p>
                    </div>
                    <div className="pending-accept">
                        <p onClick={accept(event)} className='accept'>Accept</p>
                        <p className='reject'>Reject</p>
                    </div>
                </div>
            ) : <></>
        }
        </>
    )
}