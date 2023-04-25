import { auth, database } from './firebase.config'
import { doc, getDoc, setDoc, getDocs, collection, updateDoc } from 'firebase/firestore'

// uuid
import { v4 as uuidv4 } from 'uuid';

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from '../utils/constants'

import { JOB_PUBLIC_STATUS } from '../routes/posting-job/post-job-page';

/**
 * 
 * 
 * function to create a job document
 * 
 * 
 */
export const createJobDocument = async (job) => {
    if((! auth) || (! job)) return

    // unique id for the job
    const jobUID = uuidv4()

    // UID of the user
    const creatorUID = auth.currentUser.uid

    // adding jobUID, creatorID, createdAt to the job
    job = {...job, jobUID: jobUID, creatorUID: creatorUID, createdAt: new Date().toDateString()}

    // creating the reference for the current job
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)
    
    // creating the document for the job at the current reference
    return await setDoc(currentJobReference, job)
}

/**
 * 
 * Function to read all the jobs posted by the current user
 * 
 */
export const allJobsPostedByTheUser = async () => {
    if(! auth) return

    console.log("ALL JOBS POSTED BY THE")

    // userId of the user
    // fucked by the auth.currentUser = null, though auth is not null    
    
    // job listings collection reference
    const jobListingsCollection = collection(database, FIREBASE_COLLECTION_JOB_LISTINGS)

    // retrieving all the document snapshots from the job listings collection
    const allJobsSnapshots = await getDocs(jobListingsCollection)

    return allJobsSnapshots
}

/**
 * 
 * 
 * Function to add the current user's UID in the requestors UID of a job
 * 
 * 
 */
export const requestToDoTheJob = async (job) => {
    if((! auth) || (! job)) return

    // current user UID
    const currentUserUID = auth.currentUser.uid

    /**
     * 
     * adding this current user UID in the requestors ID array of the job
     * also, setting the status of the job to REQUESTS_ARRIVED
     * 
     * 
     * 1. getting the current requestors usersID array
     * 2. adding the current user UID to the same
     *     2.1 -> if and only if, current user UID is not in the requestors usersID array
     * 3. Updating the job document with the newly formed requestors array
     * 4. setting the status to REQUESTS_ARRIVED
     * 
     */
    let requestors = job.requestorsUID

    // extra safety measure
    if(! (requestors.indexOf(currentUserUID) > -1)){
        requestors.push(currentUserUID)

        // updating the document
        // creating the reference for the current job document
        const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, job.jobUID)  
        
        return await updateDoc(currentJobReference, {
            requestorsUID: requestors,
            status: JOB_PUBLIC_STATUS.REQUESTS_ARRIVED
        })
    }

    return false
}

/**
 * 
 * 
 * 
 * Function to respond to the Accept/Reject action by the creator of the job
 * 
 * 
 * 
 */
export const respondToAcceptReject = async (jobUID, requestorUID, descision) => {
    if((! auth) || (! jobUID) || (! requestorUID) || (! descision)) return

    // getting the current user ID
    const currentUserUID = auth.currentUser.uid

    // getting the reference for the current job document
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)

    // getting the job doc with the reference
    const job = (await getDoc(currentJobReference)).data()

    if(job.creatorUID === currentUserUID){
        // only the creator of the job has the right to accept/deny a request
        // so, a extra safety measure!

        if(descision == "Accept"){
            // if the creator accepts the request of a requestor
        }
        else{
            // creator rejects the request
            // then deleting the requestorUID from the array
            let requestors = job.requestorsUID

            requestors = requestors.filter((requestor) => {
                return requestor != requestorUID
            })
            
            // updating the doc with the new requestors array
            let data = {}
            if(requestors.length == 0){
                // no more requestors
                // so reverting the status of the job to 'No Requests Yet'
                data = {status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, requestorsUID: []}
            }
            else{
                data = {requestorsUID: requestors}
            }

            return await updateDoc(currentJobReference, data)
        }
    }
}