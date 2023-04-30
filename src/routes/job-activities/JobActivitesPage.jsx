import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import WhatsappTabs from "../../Components/tab-component/tab-component"

// css
import "./jobactivities.css"

// firebase
import { database } from "../../firebase/firebase.config"
import { onSnapshot, query, collection, where, QuerySnapshot } from "firebase/firestore"

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from "../../utils/constants"

export default function JobActivitesPage(){
    const [data, setData] = useState([])
    
    useEffect(() => {
        const currentUserUID = localStorage.getItem("userUID")

        const unsubscribe = () => {
            // listening to data changes in Job Listings Collection
            onSnapshot(collection(database, FIREBASE_COLLECTION_JOB_LISTINGS), (snapshot) => {
                let dummy = []
                snapshot.docs.forEach((doc) => {
                    // adding only the jobs that are not created by the current user
                    doc.data().creatorUID != currentUserUID && dummy.push(doc.data())
                })

                setData(dummy)
            })
        }

        return unsubscribe
    }, [])

    console.log("Job Activities : ", data)

    return (
        <div className="w-2/3 block mx-auto lg:ml-96">
            <WhatsappTabs
                firstText='Active Job'
                firstLink='/app/job-activities/active'
                secondText='Pending Requests'
                secondLink='/app/job-activities/pending'
                thirdText='Job History'
                thirdLink='/app/job-activities/history'
            />

            <Outlet context={{data}} />
        </div>
    )
}