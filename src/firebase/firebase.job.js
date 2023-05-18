import { auth, database } from './firebase.config'
import { doc, getDoc, setDoc, getDocs, collection, updateDoc, onSnapshot, query, where } from 'firebase/firestore'

// uuid
import { v4 as uuidv4 } from 'uuid';

// constants
import { FIREBASE_COLLECTION_CHAT_ROOM, FIREBASE_COLLECTION_JOB_LISTINGS, FIREBASE_COLLECTION_USERS, SUCCESSFULLY_LOGGED_IN } from '../utils/constants'
import { JOB_PRIVATE_STATUS, JOB_PUBLIC_STATUS } from '../routes/posting-job/post-job-page';

// firebase
import { getUserDocument } from './firebase.user';

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
 * 
 * Function to create a new Chat document
 * 
 * 
 * 
 */
async function createNewChatDocument(chatRoomUID, jobUID, creatorUID, creatorUserName, helperUID, helperUserName) {
    if((! auth) || (! creatorUID) || (! helperUID) || (! jobUID) || (! chatRoomUID)) return

    // currentUserUID is the creatorUID 
    // already checked
    let chat = {
        chatRoomUID: chatRoomUID,
        jobUID: jobUID,
        creatorUID: creatorUID,
        creatorUserName: creatorUserName,
        helperUID: helperUID,
        helperUserName: helperUserName,
        messages: []
    }

    const currentChatDocReference = doc(database, FIREBASE_COLLECTION_CHAT_ROOM, chatRoomUID)

    // creating a new document for the chat at the current reference
    return await setDoc(currentChatDocReference, chat)
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
export const respondToAcceptReject = async (jobUID, requestorUID, decision) => {
    if((! auth) || (! jobUID) || (! requestorUID) || (! decision)) return

    // getting the current user ID
    const currentUserUID = auth.currentUser.uid

    // getting the reference for the current job document
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)

    // getting the job doc with the reference
    const job = (await getDoc(currentJobReference)).data()

    if(job.creatorUID === currentUserUID){
        // only the creator of the job has the right to accept/deny a request
        // so, a extra safety measure!

        if(decision == "Accept"){
            // if the creator accepts the request of a requestor

            // doing four things in job object
            // 1. changing the status of the job to Accepted
            // 2. changing the private status of the job to Work Still In Progress
            // 3. changing the helperUID of the job to requesterUID
            // 4. also, adding a chatRoomUID to the job
            let chatRoomUID = uuidv4()

            let data = {
                status: JOB_PUBLIC_STATUS.YOU_ACCEPTED_THE_JOB,
                privateJobStatus: JOB_PRIVATE_STATUS.WORK_STILL_IN_PROGRESS,
                helperUID: requestorUID,
                chatRoomUID: chatRoomUID
            }

            // updating the job document
            await updateDoc(currentJobReference, data)

            // getting the username of the helper and creator
            // unwanted, but hey let's get
            const creatorDocSnapshot = await getUserDocument(currentUserUID)
            const creatorUserName = creatorDocSnapshot.data().username

            const helperDocSnapshot = await getUserDocument(requestorUID)
            const helperUserName = helperDocSnapshot.data().username

            // creating new chat document
            await createNewChatDocument(
                chatRoomUID, 
                jobUID, 
                currentUserUID,
                creatorUserName,
                requestorUID,
                helperUserName,
            )

            return SUCCESSFULLY_LOGGED_IN
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

/**
 * 
 * 
 * 
 * Function to update the private status of the job to WORK_SUBMITTED
 * 
 * 
 * 
 */
export const updatePrivateStatusOfTheJob = async (jobUID, privateStatus) => {
    if((! auth) || (! jobUID)) return

    // getting the reference for the current job document
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)

    // updating the private status of the job
    let data = {
        privateJobStatus: privateStatus
    }

    return await updateDoc(currentJobReference, data)
}

/**
 * 
 * 
 * 
 * Function to update the rating of the job
 * 
 * 
 * 
 */
export const updateRating = async (jobUID, rating) => {
    if((! auth) || (! jobUID)) return

    // getting the reference for the current job document
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, jobUID)

    // updating the private status of the job
    let data = {
        rating: rating
    }

    return await updateDoc(currentJobReference, data)
}

/**
 * 
 * 
 * 
 * Function to handle the pay function
 * 
 * 1. First updating the private status of the job to Work Accepted
 * 2. Updating the rating of the job
 *
 * 
 * 
 * Other steps are done in the function right below
 * 
 */
export const PayFunction = async (job, rating) => {
    if((! auth) || (! job) || (! rating)) return

    console.log("Updating the job....")

    // getting the current reference of the job document
    const currentJobReference = doc(database, FIREBASE_COLLECTION_JOB_LISTINGS, job.jobUID)

    // 1 and 2
    let data = {
        privateJobStatus: JOB_PRIVATE_STATUS.WORK_ACCEPTED,
        rating: rating
    }

    // updating the job document
    return await updateDoc(currentJobReference, data)
}

/**
 * 
 * 
 * function to update the rating, balance of the poster and helper
 * 
 * 
 * 
 */
export const UpdateBalance = async (job, rating) => {
    if((! auth) || (! job) || (! rating)) return

    console.log("Updating the balance")

    // getting the UIDs of both helper and poster from the job
    const helperUID = job.helperUID
    const posterUID = job.creatorUID

    // For poster of the job....
    // 1. deduct the cost of the job from the balance

    // getting the reference of the poster's user document
    const posterUserDocReference = doc(database, FIREBASE_COLLECTION_USERS, posterUID)

    // getting the current balance of the poster
    let response = await getUserDocument(posterUID)
    let PosterBalance = parseInt(response.data().balance) - parseInt(job.cost)

    console.log(response.data().balance, job.cost, PosterBalance)

    // updating the poster doc with the updated balance
    let data = {
        balance: PosterBalance
    }
    await updateDoc(posterUserDocReference, data)

    // For the helper of the job...
    // Creding the job cost to the helper's balance

    // getting the reference of the helper's user document
    const helperUserDocReference = doc(database, FIREBASE_COLLECTION_USERS, helperUID)

    // getting the current balance of the helper
    response = await getUserDocument(helperUID)
    let HelperBalance = parseInt(response.data().balance) + parseInt(job.cost)

    // updating the helper doc with the updated balance
    data = {
        balance: HelperBalance
    }

    return await updateDoc(helperUserDocReference, data)
}
