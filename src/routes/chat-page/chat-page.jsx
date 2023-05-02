import { useEffect, useState,useRef } from "react"
import { useNavigate, Form, useLocation } from "react-router-dom"

// components
import BackButton from "../../components/back-button-component/back-button"

import {FiArrowLeft , FiSend} from "react-icons/fi"

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


    const scrollDown = useRef();

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


        scrollDown.current.scrollIntoView({behavior:'smooth'});
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
        <main className="mt-20 w-full block lg:ml-96 lg:w-2/3 h-screen">
            <div className="flex items-center space-x-3 fixed top-16 bg-white">
                    {/* <BackButton 
                        back={back}
                    /> */}
                    <button onClick={back} > <FiArrowLeft className=" text-3xl"/> </button>

                    {
                        // for creator, helper's user name should be shown
                        // and vice-versa
                        openedAs === 'Creator' ? (<h1 className=" text-2xl">{chat.helperUserName}</h1>) : (<h1 className=" text-2xl">{chat.creatorUserName}</h1>)
                    }
            </div>
            <div className="w-2/3 mx-auto h-full ">
                <div className="flex flex-col justify-between h-full ">
                    <div className="w-full flex flex-col justify-center space-y-1">
                        {
                            messages.map((message) => {
                                if(message.senderUID === localStorage.getItem("userUID")) {
                                    // message is sent
                                    return <p className=" bg-violet-400 text-black self-end rounded-full max-w-sm whitespace-normal break-normal px-6 py-2">{message.msg}</p>
                                }

                                // message is received
                                return <p className=" bg-slate-300 text-black self-start rounded-full max-w-sm whitespace-normal break-normal px-6 py-2">{message.msg}</p>
                            })
                        }
                        <div ref={scrollDown} className="mb-20 h-20"></div>
                    </div>


                    <div className="fixed bottom-0 right-0 left-0 mx-auto w-full ">
                        <Form 
                            className=" flex items-center px-4 py-2 space-x-2 justify-center "
                            onSubmit={(event) => sendMessage(event, message, localStorage.getItem("userUID"))} 
                        >
                            <div className="w-2/5 lg:ml-48">
                                <input 
                                    name="chat-input" 
                                    className="w-56 lg:w-full h-10 rounded px-4 bg-violet-200 shadow-lg" 
                                    value={message} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Enter your message" 
                                    required 
                                />
                            </div>
                            <div className="px-4 bg-white py-2 rounded shadow-lg">
                                
                                <button type="submit" value="send" className=""><FiSend className=" text-lg"/></button>
                                {/* <input 
                                    className="send" 
                                    value="send" 
                                    type="submit"
                                /> */}
                            </div>    
                        </Form> 
                    </div>
                    
                </div>
            </div>
            
        </main>
    )
}