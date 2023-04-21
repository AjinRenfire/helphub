import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from './firebase.config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// constants
import { FIREBASE_COLLECTION_USERS } from '../utils/constants'

import { DEFAULT_USER } from '../routes/signup-page/signup-page'

/**
 * 
 * Function to create a user account for the given email
 * 
 */
export const createUserAccount = async(email, password) => {
  if((! email) || (! password)) return

  console.log('function called')

  return await createUserWithEmailAndPassword(auth, email, password)
}

/**
 * 
 * 
 * Function to create a user document
 * 
 * 
 */
export const createUserDocument = async (user) => {
  if(! user) return

  // getting the reference for the document 
  const userDocumentReference = doc(database, FIREBASE_COLLECTION_USERS, user.uid)
  
  // checking if the particular referenced document has any data?
  const userDocumentSnapshot = (await getDoc(userDocumentReference)).exists()

  if(! userDocumentSnapshot){
    // no data in the document
    // rather, no document at all!
    const {email, uid} = user
    const createdAt = new Date()

    let newUser = {...DEFAULT_USER, email: email, createdAt: createdAt, UID: uid}

    try{
      await setDoc(userDocumentReference, newUser)
    }
    catch(error) {console.log(error)}
  }

  return userDocumentReference
}