import { Form, Link, useNavigate, useNavigation, useActionData } from 'react-router-dom'
import {React, useEffect, useContext } from 'react'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'
import AlertBox from '../../components/alert-component/alert-box'

// css
import './login-page.css'

// contexts
import { UserContext } from '../../contexts/user.context'

// firebase
import { loginUser } from '../../firebase/firebase.login'

// constants
import { 
    FIREBASE_ERROR_CODE_USER_NOT_EXISTS, 
    FIREBASE_ERROR_CODE_WRONG_PWD, 
    PASSWORD_MIN_LENGTH, 
    USER_NOT_FOUND_RESPONSE, 
    PASSWORD_IS_INCORRECT,
    FIREBASE_NETWORK_FAILED,
    NETWORK_RESPONSE,
} from '../../utils/constants'

export default function LoginPage(){ 
    const actionData = useActionData()
    const navigate = useNavigate()
    const navigation = useNavigation()  
    
    const { setCurrentUser } = useContext(UserContext)    

    useEffect(() => {
        actionData &&
            actionData.user &&
                actionData.status === 1000 && (
                    setCurrentUser(actionData.user),
                    navigate('/app')
                )
    }, [actionData])
    
    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Login</h2>

                <Form method='post' action='/login/'>
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'text',
                            name: 'email',
                            placeholder:'Enter your Email',
                            required:true,
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
                            minLength: PASSWORD_MIN_LENGTH,
                        }}
                    />

                    {/* Login button */}
                    {
                        navigation.state === 'submitting' ? (
                            <Button
                                buttonOptions={{
                                    className:'login-button',
                                    type:'submit',
                                    value:'Please wait...',
                                }}
                            />
                        ) : (
                            <Button
                                buttonOptions={{
                                    className:'login-button',
                                    type:'submit',
                                    value:'Login',
                                }}
                            />
                        )
                    }
                </Form>

                <div className="input-container">
                    <span>Don't have an account? <Link to={'/signup'}>Join us</Link></span>
                </div>
            </div>
            
            {
                actionData && 
                    actionData.msg &&
                        actionData.status === 1000 && (
                            <AlertBox
                                message={actionData.msg}
                                visibility={true}
                                positive={false}
                            />
                        )
            }
        </>
    )
}

// function to handle form submission
export const LoginAction = async ({request}) => {
    const formData = await request.formData()

    // getting the input data from formData
    let email = formData.get('email')
    let password = formData.get('password')

    // trying to sign in the user
    try{
        await loginUser(email, password)
        
        return {user: {email: email, password: password}, status: 1000}
    }
    catch(error){
        const msg = error.code

        if(msg == FIREBASE_ERROR_CODE_USER_NOT_EXISTS){
            return {msg: USER_NOT_FOUND_RESPONSE, status: 1000}
        }

        if(msg == FIREBASE_ERROR_CODE_WRONG_PWD){
            return {msg: PASSWORD_IS_INCORRECT, status: 1000}
        }

        if(msg == FIREBASE_NETWORK_FAILED){
            return {msg:  NETWORK_RESPONSE, status: 1000}
        }

        throw error
    }
}