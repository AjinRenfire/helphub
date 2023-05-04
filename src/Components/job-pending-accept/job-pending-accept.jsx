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
                <div className="flex bg-violet-200 px-6 py-4 justify-between items-center border hover:shadow-lg hover:bg-violet-300 border-b-violet-400 first:rounded-t-lg first:border-b-violet-400 last:rounded-b-lg last:border-b-violet-200 only:rounded-lg only:border-b-violet-200 ">
                    <div className="flex items-center space-x-8">
                        <p className=' text-lg font-semibold'>{requestor.username}</p>
                        <p className=' font-medium'>4</p>
                    </div>
                    <div className=" space-x-2">
                        <button type='button' onClick={clickHandler} className=' px-4 py-2 text-emerald-500 bg-white border  border-emerald-500 rounded-full hover:bg-emerald-500 hover:text-white' value="Accept">Accept</button>
                        <button type='button' onClick={clickHandler} className=' px-4 py-2 text-red-500 border bg-white border-red-500 rounded-full hover:bg-red-500 hover:text-white' value="Reject">Reject</button>
                    </div>
                </div>
            ) : <></>
        }
        </>
    )
}