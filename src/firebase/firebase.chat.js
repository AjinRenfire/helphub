// firebase
import { database, auth } from "./firebase.config"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

// constants
import { FIREBASE_COLLECTION_CHAT_ROOM } from "../utils/constants"

export const updateMessage = async (message, chatUID) => {
    if((! auth) || (! message) || (! chatUID)) return

    // getting the reference to the chat document, in which the message should be added
    const currentChatDocReference = doc(database, FIREBASE_COLLECTION_CHAT_ROOM, chatUID)

    // getting the chat document from the reference
    let {messages} = (await getDoc(currentChatDocReference)).data()

    // adding the current message to the messages array
    messages.push(message)
    let data = {
        messages: messages
    }

    // updating the chat document with the updated messages array
    return await updateDoc(currentChatDocReference, data)
}   