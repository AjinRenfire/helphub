import { auth } from "./firebase.config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut  } from 'firebase/auth'

/**
 * 
 * 
 * Function to login the current user with the email and password
 * 
 */
export const loginUser = async (email, password) => {
    if((! email) || (! password)) return

    return await signInWithEmailAndPassword(auth, email, password)
}

/**
 * 
 * Function to sign out the current user
 * 
 */
export const signoutUser = async() => {
    // also setting the cuser context to null while signing out
    return await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
    if(! callback) return 

    onAuthStateChanged(auth, callback)
}