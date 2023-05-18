import { createContext, useEffect, useState } from "react";

// firebase
import { database } from "../firebase/firebase.config";
import { collection, onSnapshot, doc } from 'firebase/firestore'

// constants
import { FIREBASE_COLLECTION_USERS } from "../utils/constants";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    currentUserUID: null,
    setCurrentUserUID: () => ''
})

// actual component
export default function UserContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentUserUID, setCurrentUserUID] = useState(null)

    const value = {currentUser, setCurrentUser, currentUserUID, setCurrentUserUID}

    useEffect(() => {
        if(currentUserUID != null){
            const unsubscribe = () => {
                const currentUserDocReference = doc(database, FIREBASE_COLLECTION_USERS, currentUserUID)
                onSnapshot(currentUserDocReference, (doc) => {
                    setCurrentUser(doc.data())
                })
            }

            return unsubscribe()
        }
    }, [currentUserUID])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}