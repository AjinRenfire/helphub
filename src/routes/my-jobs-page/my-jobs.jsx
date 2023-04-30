import { Outlet } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

// components
import WhatsappTabs from "../../components/tab-component/tab-component"

// css
import './my-jobs.css'

// firebase
import { database } from "../../firebase/firebase.config"
import { onSnapshot, query, collection, where, QuerySnapshot } from "firebase/firestore"

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants"

export default function MyJobsPage(){
    const [data, setData] = useState([])
    
    useEffect(() => {
        const currentUserUID = localStorage.getItem("userUID")

        // listening to data changes in Job Listings Collection
        const unsubscribe = () => {
            onSnapshot(collection(database, FIREBASE_COLLECTION_JOB_LISTINGS), (snapshot) => {
                let dummy = []
                snapshot.docs.forEach((doc) => {
                    // adding only the jobs that are created by the current user to the dummy array
                    doc.data().creatorUID === currentUserUID && dummy.push(doc.data())
                })
    
                setData(dummy)
            })
        }

        return () => (unsubscribe())
    }, [])

    return (
        <div className="view">
            <WhatsappTabs
                firstText='Active Job'
                firstLink='/app/my-jobs/active'
                secondText='Pending Requests'
                secondLink='/app/my-jobs/pending-requests'
                thirdText='No requests yet'
                thirdLink='/app/my-jobs/no-requests'
                fourthText='Job History'
                fourthLink=''
            />

            <Outlet context={{data}} />
        </div>
    )
}