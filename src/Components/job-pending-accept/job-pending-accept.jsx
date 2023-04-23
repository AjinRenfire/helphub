import { useEffect, useState } from 'react'

// firebase
import { getUserDocument } from '../../firebase/firebase.user'

export default function JobPendingAccept({requestorUID}){
    const [requestor, setRequestor] = useState({})

    useEffect(() => {
        async function fetchUserData(){
            let userDocSnapshot = await getUserDocument(requestorUID)
            let user = userDocSnapshot.data()

            console.log("User snapshot : ", userDocSnapshot)
            console.log("User : ", user)

            setRequestor(user)
        }

        fetchUserData()
    }, [])

    return (
        <>
            {
                <p>{requestor.email}</p>
            }
        </>
    )
}