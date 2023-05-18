import { Outlet } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

// components
import WhatsappTabs from "../../Components/tab-component/tab-component"

// css
import './my-jobs.css'

// firebase
import { database } from "../../firebase/firebase.config"
import { onSnapshot, query, collection, where, QuerySnapshot } from "firebase/firestore"

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants"
import { PayFunction } from "../../firebase/firebase.job"

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
        <main className="w-2/3 block mx-auto lg:ml-96 ">
            <WhatsappTabs
                firstText='Active Job'
                firstLink='/app/my-jobs/active'
                secondText='Pending Requests'
                secondLink='/app/my-jobs/pending-requests'
                thirdText='No requests yet'
                thirdLink='/app/my-jobs/no-requests'
                fourthText='Job History'
                fourthLink='/app/my-jobs/history'
            />

            <Outlet context={{data}} />
        </main>
    )
}