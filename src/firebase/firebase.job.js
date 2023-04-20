import { auth, database } from './firebase.config'
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'

// uuid
import { v4 as uuidv4 } from 'uuid';

// constants
import { FIREBASE_COLLECTION_JOB_LISTINGS } from '../utils/constants'

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

    // userId of the user
    // fucked by the auth.currentUser = null, though auth is not null    
    
    // job listings collection reference
    const jobListingsCollection = collection(database, FIREBASE_COLLECTION_JOB_LISTINGS)

    // retrieving all the document snapshots from the job listings collection
    const allJobsSnapshots = await getDocs(jobListingsCollection)

    return allJobsSnapshots
}