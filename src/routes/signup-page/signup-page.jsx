import { Form, Link } from 'react-router-dom'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'

// css
import '../login-page/login-page.css'

export default function SignupPage(){
    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Sign up</h2>
                <Form>
                    {/* Email input */}
                    <FormInput 
                        label='Email'
                        inputOptions={{
                            type:'text',
                            placeholder:'Enter your Email',
                            required:true
                        }}
                    />

                    {/* Password input */}
                    <FormInput 
                        label='Password'
                        inputOptions={{
                            type:'password',
                            placeholder:'Enter your Password',
                            required:true
                        }}
                    />

                    {/* Confirm Password input */}
                    <FormInput 
                        label='Password'
                        inputOptions={{
                            type:'password',
                            placeholder:'Confirm Password',
                            required:true
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
        </>
    )
}