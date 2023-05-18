import { auth, database } from "./firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// constants
import { FIREBASE_COLLECTION_USERS } from "../utils/constants";

/**
 * 
 * 
 * Function to fetch the user document's data if user's UID is given
 * 
 * 
 */
export const getUserDocument = async (userUID) => {
    if((! auth) || (! userUID)) return

    // reference for the User's document
    const usersDocumentReference = doc(database, FIREBASE_COLLECTION_USERS, userUID)

    return await getDoc(usersDocumentReference)
}

/**
 * 
 * 
 * Function to update the user document in the firebase
 * 
 * 
 */
export const updateUserDocument = async (userUID, updatedDetails) => {
    if((! auth) || (! userUID) || (! updatedDetails)) return
    
    // getting the reference for the user document
    const userDocumentReference = doc(database, FIREBASE_COLLECTION_USERS, userUID)

    let data = {
        ...updatedDetails
    }

    return await updateDoc(userDocumentReference, data)
}

/**
 * 
 * 
 * Updating the balance of the user document in the firebase
 * 
 * 
 * 
 */
export const updateUserBalance = async (userUID, amount, type) => {
    if((! auth) || (! userUID) || (! amount)) return

    // getting the current balance of the user
    let response = await getUserDocument(userUID)
    let balance = response.data().balance

    if(type == "Credit"){
        balance = balance + amount
    }
    else{
        balance = balance - amount
    }

    let data = {
        balance: balance
    }

    return await updateUserDocument(userUID, data)
}