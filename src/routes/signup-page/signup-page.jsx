import { 
    Form,
    Link,
    redirect,
    useNavigation,
    useActionData
} from 'react-router-dom'

// components
import FormInput from '../../Components/input-component/input-component'
import Button from '../../Components/button-component/button-component'
import AlertBox from '../../Components/alert-component/alert-box'

// constants
import { FIREBASE_EMAIL_ALREADY_EXISTS, 
    FIREBASE_USER_EXISTS, 
    PASSWORD_MIN_LENGTH, 
    PWDS_NOT_MATCH 
} from '../../utils/constants'

// css
import '../login-page/login-page.css'

// firebase
import { createUserAccount, createUserDocument } from '../../firebase/firebase.signup'

export const DEFAULT_USER = {
    email: '',
    createdAt: '',
    UID: '',
    balance: 2000,
    userName: '',
    phoneNumber: '',
    hobbies: '',
    about: ''
}

export default function SignupPage(){
    const navigation = useNavigation()
    const actionData = useActionData()

    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen space-y-20'>
                <div className=' space-y-6 text-center'>
                    <h2 className=" text-4xl text-violet-600 font-extrabold">Sign up</h2>
                    <p className=' text-sm text-gray-400'>Welcome to Helphub</p>
                </div>
                
                
                <Form method='POST' action={'/signup'} className=' space-y-6' >
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'email',
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

                    {/* Confirm Password input */}
                    <FormInput 
                        label='Confirm Password'
                        inputOptions={{
                            type:'password',
                            name: 'confirmPassword',
                            placeholder:'Enter your password',
                            required:true,
                            minLength: PASSWORD_MIN_LENGTH,
                        }}
                    />

                    {/* Create Account Button */}
                    {
                        navigation.state === 'submitting' ? 
                        (
                            <Button
                                buttonOptions={{
                                    className:'bg-slate-200 px-6 rounded-full w-auto text-slate-600 py-2 mt-6',
                                    type:'button',
                                    value:'Please wait...',
                                    disabled: "disabled",
                                }}
                            />
                        ) : (
                            <Button
                                buttonOptions={{
                                    className:' bg-violet-500 px-6 rounded-full w-auto text-white py-2 hover:bg-violet-900 mt-6',
                                    type:'submit',
                                    value:'Sign up',
                                }}
                            />
                        )
                    }
                </Form>

                <div className="">
                    <span className=' text-grey-700'>Already have an account? <Link to={'/login'} className=' text-violet-700 hover:underline hover:font-bold'>Login</Link></span>
                </div>
            </div>

            {
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
export const SignUpAction = async ({request}) => {
    const formData = await request.formData()

    // getting the input data from formData
    let email = formData.get('email')
    let password = formData.get('password')
    let confirmPassword= formData.get('confirmPassword')

    // validating the inputs
    if(! (password === confirmPassword)){
        return {msg: PWDS_NOT_MATCH, status: 1000}
    }

    try{
        // creating an account for the user in the firebase
        const { user } = await createUserAccount(email, password)

        // creating the user document for the new user
        await createUserDocument(user)
        
        return redirect('/app')
    }
    catch(error){
        if(error.code === FIREBASE_EMAIL_ALREADY_EXISTS){
            return {msg: FIREBASE_USER_EXISTS, status: 1000}
        }

        throw error
    }
}