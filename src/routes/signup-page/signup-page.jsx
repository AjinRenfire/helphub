import { useEffect } from 'react'
import { 
    Form,
    Link,
    useNavigate, 
    useNavigation, 
    useActionData, 
} from 'react-router-dom'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'
import AlertBox from '../../components/alert-component/alert-box'

// constants
import { FIREBASE_EMAIL_ALREADY_EXISTS, 
    FIREBASE_USER_EXISTS, 
    PASSWORD_MIN_LENGTH, 
    PWDS_NOT_MATCH 
} from '../../utils/constants'

// css
import '../login-page/login-page.css'

// firebase
import { createUserAccount } from '../../firebase/firebase.signup'

export default function SignupPage(){
    const navigation = useNavigation()
    const navigate = useNavigate()
    const actionData = useActionData()

    useEffect(() => {
        actionData && 
            actionData.status === 1000 && 
                actionData.user && 
                    navigate('/login/')
    }, [actionData])

    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Sign up</h2>

                <Form method='POST' action={'/signup'}>
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
                                    className:'login-button',
                                    type:'button',
                                    value:'Please wait...',
                                    disabled: "disabled",
                                }}
                            />
                        ) : (
                            <Button
                                buttonOptions={{
                                    className:'login-button',
                                    type:'submit',
                                    value:'Create Account',
                                }}
                            />
                        )
                    }
                </Form>

                <div className="input-container">
                    <span>Already have an account? <Link to={'/login'}>Login</Link></span>
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
        
        return {user: user, status: 1000}
    }
    catch(error){
        if(error.code === FIREBASE_EMAIL_ALREADY_EXISTS){
            return {msg: FIREBASE_USER_EXISTS, status: 1000}
        }

        throw error
    }
}