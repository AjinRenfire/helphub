import { useEffect, useState } from "react"
import { useNavigate, Form, useLocation } from "react-router-dom"

// components
import BackButton from "../../components/back-button-component/back-button"

// css
import './chat-page.css'

// firebase
import { onSnapshot, doc } from "firebase/firestore"
import { database } from "../../firebase/firebase.config"
import { updateMessage } from "../../firebase/firebase.chat"

// constants
import { FIREBASE_COLLECTION_CHAT_ROOM } from "../../utils/constants"

export default function ChatPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const {chat, openedAs} = location.state

    // message - typed in the input box
    const [message, setMessage] = useState('') 
    
    // messages array - fetched from the firestore
    const [messages, setMessages] = useState([])

    // function to go back
    function back(){
        navigate(-1)
    }

    // function to handle the change in the form input
    function handleChange(event) {
        setMessage(event.target.value)
    }

    // function to send messages
    // also, update the same in the firestore
    const sendMessage = async(event, inputMessage, senderUID) => {
        event.preventDefault()

        // resetting the form input
        setMessage('')
        
        // adding the new message in the messages array of the chat document
        console.log(inputMessage)

        let message = {
            msg: inputMessage,
            senderUID: senderUID
        }

        // updating the chat document with the new message
        await updateMessage(message, chat.chatRoomUID)
    }

    useEffect(() => {
       // listening to the messages in the chat document in the database
       const unsubscribe = () => {
            onSnapshot(doc(database, FIREBASE_COLLECTION_CHAT_ROOM, chat.chatRoomUID), (doc) => {
                setMessages(doc.data().messages)
            })
       }

       return unsubscribe()
    }, [chat])

    return (
        <div className="view">
            <div className="chat-bar">
                <BackButton 
                    back={back}
                />

                {
                    // for creator, helper's user name should be shown
                    // and vice-versa
                    openedAs === 'Creator' ? (<h1>{chat.helperUserName}</h1>) : (<h1>{chat.creatorUserName}</h1>)
                }
            </div>

            <div className="chat-box">
                <div className="messages">
                    {
                        messages.map((message) => {
                            if(message.senderUID === localStorage.getItem("userUID")) {
                                // message is sent
                                return <h1 style={{color: 'white', fontSize: '30px'}}>{message.msg}</h1>
                            }

                            // message is received
                            return <h1 style={{color: 'white', fontSize: '20px'}}>{message.msg}</h1>
                        })
                    }
                </div>
                
                <Form 
                    className="chat-input"
                    onSubmit={(event) => sendMessage(event, message, localStorage.getItem("userUID"))} 
                >
                    <div className="fuck">
                        <input 
                            name="chat-input" 
                            className="chat" 
                            value={message} 
                            onChange={handleChange} 
                            type="text" 
                            placeholder="Enter your message" 
                            required 
                        />
                    </div>
                    <div className="fuck1">
                        <input 
                            className="send" 
                            value="send" 
                            type="submit"
                        />
                    </div>    
                </Form> 
            </div>
        </div>
    )
}