import { auth, database } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";

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