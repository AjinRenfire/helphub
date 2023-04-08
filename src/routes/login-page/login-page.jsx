import { Form, Link, useNavigate } from 'react-router-dom'
import {React, useState, useContext} from 'react'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'
import AlertBox from '../../components/alert-component/alert-box'

// css
import './login-page.css'

// firebase
import { loginUser } from '../../firebase/firebase.login'

// contexts
import { UserContext } from '../../contexts/user.context'

// constants
import { FIREBASE_ERROR_CODE_USER_NOT_EXISTS, FIREBASE_ERROR_CODE_WRONG_PWD, PASSWORDS_MIN_LENGTH_TEXT, PASSWORD_MIN_LENGTH, SUCCESSFULLY_LOGGED_IN, USER_NOT_FOUND_RESPONSE, WRONG_PWD_RESPONSE } from '../../utils/constants'

export default function LoginPage(){ 
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [alertBoxBehaviour, setAlertBoxBehaviour] = useState({
        alertBoxShown: false,
        alertBoxMessage: '',
        positive: false
    })
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const {email, password} = loginData
    const {alertBoxMessage, alertBoxShown, positive} = alertBoxBehaviour
    const navigate = useNavigate()

    // function is triggered whenever the values in the inputs get changed
    const onChangeHandler = (event) => {
        const {value, name} = event.target
        
        // updating the state
        setLoginData({...loginData, [name]:value})
    }

    // function is triggered when the form is submitted
    const submitHandler = async (event) => {
        event.preventDefault()

        // validating the password
        if(password.length < PASSWORD_MIN_LENGTH){
            // showing the alert message to the user
            setAlertBoxBehaviour({
                alertBoxMessage: PASSWORDS_MIN_LENGTH_TEXT,
                alertBoxShown: true,
                positive: false
            })

            return
        }

        // logging in the user
        try{
            const {user} = await loginUser(email, password)
        
            // updating the user context
            setCurrentUser(user)

            console.log('user updated')

            // navigating the user to the home page
            navigate('/')
        }
        catch(error){
            let message = error.code
            console.log(error)

            if(message == FIREBASE_ERROR_CODE_WRONG_PWD){
                message = WRONG_PWD_RESPONSE
            }
            else if(message == FIREBASE_ERROR_CODE_USER_NOT_EXISTS){
                message = USER_NOT_FOUND_RESPONSE
            }

            setAlertBoxBehaviour({
                alertBoxMessage: message,
                alertBoxShown: true,
                positive: false
            })

            return
        }
    }
    
    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Login</h2>
                <Form onSubmit={submitHandler}>
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'text',
                            name: 'email',
                            placeholder:'Enter your Email',
                            required:true,
                            value: email,
                            onChange: onChangeHandler
                        }}
                    />

                    {/* Password input */}
                    <FormInput 
                        label='Password'
                        inputOptions={{
                            type:'password',
                            name: 'password',
                            placeholder:'Enter your Password',
                            required:true,
                            value: password,
                            onChange: onChangeHandler
                        }}
                    />

                    {/* Login button */}
                    <Button
                        buttonOptions={{
                            className:'login-button',
                            type:'submit',
                            value:'Login',
                        }}
                    />
                </Form>

                <div className="input-container">
                    <span>Don't have an account? <Link to={'/signup'}>Join us</Link></span>
                </div>
            </div>
            
            <AlertBox
                message={alertBoxMessage}
                visibility={alertBoxShown}
                positive={positive}
            />
        </>
    )
}