import { Form, Link, useNavigate, useNavigation, useActionData, redirect } from 'react-router-dom'
import {React, useEffect, useContext } from 'react'

// components
import FormInput from '../../Components/input-component/input-component'
import Button from '../../Components/button-component/button-component'
import AlertBox from '../../Components/alert-component/alert-box'

// css
import './login-page.css'

// firebase
import { loginUser } from '../../firebase/firebase.login'
import { auth } from '../../firebase/firebase.config'

// constants
import { 
    FIREBASE_ERROR_CODE_USER_NOT_EXISTS, 
    FIREBASE_ERROR_CODE_WRONG_PWD, 
    PASSWORD_MIN_LENGTH, 
    USER_NOT_FOUND_RESPONSE, 
    PASSWORD_IS_INCORRECT,
    FIREBASE_NETWORK_FAILED,
    NETWORK_RESPONSE,
    SUCCESSFULLY_LOGGED_IN,
} from '../../utils/constants'

export default function LoginPage(){ 
    const actionData = useActionData()
    const navigate = useNavigate()
    const navigation = useNavigation()  

    useEffect(() => {
        actionData && actionData.status === 1000 && actionData.msg === SUCCESSFULLY_LOGGED_IN && (
            localStorage.setItem("userUID", actionData.user.uid),
            navigate('/app')            
        )        
    }, [actionData])

    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen space-y-20'>
                <div className=' space-y-6 text-center'>
                    <h2 className=" text-4xl text-violet-600 font-extrabold">Login</h2>
                    <p className=' text-sm text-gray-400'>Welcome again to Helphub</p>
                </div>
                

                <Form method='post' action='/login/' className=' space-y-6 flex flex-col justify-center'>
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'text',
                            name: 'email',
                            placeholder:'Enter your Email',
                            required:true,
                            className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white"
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
                            className:"appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white"
                        }}
                    />

                    {/* Login button */}
                    {
                        navigation.state === 'submitting' ? (
                            <Button
                                buttonOptions={{
                                    className:' bg-slate-200 px-6 rounded-full w-auto text-slate-600 py-2 mt-6 cursor-wait',
                                    type:'submit',
                                    value:'Please wait...',
                                    disabled:"disabled"
                                }}
                            />
                        ) : (
                            <Button
                                buttonOptions={{
                                    className:'bg-violet-500 px-6 rounded-full w-auto text-white py-2 hover:bg-violet-900 mt-6',
                                    type:'submit',
                                    value:'Login',
                                }}
                            />
                        )
                    }
                </Form>

                <div className="">
                    <span className='text-grey-700'>Don't have an account? <Link to={'/signup'} className=' text-violet-700 hover:underline hover:font-bold'>Join us</Link></span>
                </div>
            </div>
            
            {
                // rendering the alert box component, only when actionData is of some value
                actionData && actionData.msg && actionData.status === 1000 && (
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
        const {user} = await loginUser(email, password)
        
        return {msg: SUCCESSFULLY_LOGGED_IN, status: 1000, user: user}
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