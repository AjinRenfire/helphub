import { useEffect, useState } from 'react'

// firebase
import { getUserDocument } from '../../firebase/firebase.user'

export default function JobPendingAccept({requestorUID, decision}){
    const [requestor, setRequestor] = useState({})

    useEffect(() => {
        async function fetchUserData(){
            let userDocSnapshot = await getUserDocument(requestorUID)
            let user = userDocSnapshot.data()

            setRequestor(user)
        }

        fetchUserData()
    }, [])

    // function to handle the click of the buttons
    const clickHandler = (event) => {
        let x = {
            decision: event.target.value,
            requestorUID: requestorUID
        }

        decision(x)
    }

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
                        <button type='button' onClick={clickHandler} className='accept'value="Accept">Accept</button>
                        <button type='button' onClick={clickHandler} className='reject'value="Reject">Reject</button>
                    </div>
                </div>
            ) : <></>
        }
        </>
    )
}