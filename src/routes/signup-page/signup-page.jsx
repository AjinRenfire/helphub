import { Form, Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'
import AlertBox from '../../components/alert-component/alert-box'

// constants
import { PASSWORD_MIN_LENGTH, PASSWORDS_DO_NOT_MATCH, PASSWORDS_MIN_LENGTH_TEXT, PLEASE_WAIT } from '../../utils/constants'

// css
import '../login-page/login-page.css'

// firebase
import { createUserAccount, createUserDocument } from '../../firebase/firebase.signup'

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: '',
}

export default function SignupPage(){
    const [signupData, setSignupData] = useState(defaultFormFields)
    const [alertBoxBehaviour, setAlertBoxBehaviour] = useState({
        alertBoxShown: false,
        alertBoxMessage: '',
        positive: false
    })

    const {email, password, confirmPassword} = signupData
    const {alertBoxShown, alertBoxMessage, positive} = alertBoxBehaviour
    const navigate = useNavigate()

    // function is triggered whenever the values in the inputs get changed
    const onChangeHandler = (event) => {
        const {value, name} = event.target

        // updating the state
        setSignupData({...signupData, [name]:value})
    }

    // function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault()

        // checking if the passwords are upto expectations
        if((password.length < PASSWORD_MIN_LENGTH) || (confirmPassword.length < PASSWORD_MIN_LENGTH)){
            // making the alert box visible 
            // also, displaying an alert message in the same
            setAlertBoxBehaviour({
                alertBoxShown: true,
                alertBoxMessage: PASSWORDS_MIN_LENGTH_TEXT,
                positive: false
            })
        }

        else if(! (password === confirmPassword)){
            setAlertBoxBehaviour({
                alertBoxShown: true,
                alertBoxMessage: PASSWORDS_DO_NOT_MATCH,
                positive: false
            })
        }

        else{
            // passwords are validated
            // creating an account for the user
            try{
                setAlertBoxBehaviour({
                    alertBoxShown: true,
                    alertBoxMessage: PLEASE_WAIT,
                    positive: true
                })

                const { user } = await createUserAccount(email, password)
                await createUserDocument(user)

                // navigating the user to the login page
                navigate('/login')
            }
            catch(error){
                const message = error.code

                setAlertBoxBehaviour({
                    alertBoxShown: true,
                    alertBoxMessage: message,
                    positive: false
                })

                console.log(error)
            }
        }
    }

    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Sign up</h2>

                <Form method='POST' onSubmit={handleSubmit}>
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'email',
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

                    {/* Confirm Password input */}
                    <FormInput 
                        label='Confirm Password'
                        inputOptions={{
                            type:'password',
                            name: 'confirmPassword',
                            placeholder:'Enter your password',
                            required:true,
                            value: confirmPassword,
                            onChange: onChangeHandler
                        }}
                    />

                    {/* Create Account Button */}
                    <Button
                        buttonOptions={{
                            className:'login-button',
                            type:'submit',
                            value:'Create Account',
                        }}
                    />
                </Form>

                <div className="input-container">
                    <span>Already have an account? <Link to={'/login'}>Login</Link></span>
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