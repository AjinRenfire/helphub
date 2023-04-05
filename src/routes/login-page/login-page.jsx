import { Form, Link } from 'react-router-dom'
import {React, useState} from 'react'

// components
import FormInput from '../../components/input-component/input-component'
import Button from '../../components/button-component/button-component'

// css
import './login-page.css'

export default function LoginPage(){    
    return (
        <>
            <div className='login-page-container'>
                <h2 className="app-themed-heading">Login</h2>
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
        </>
    )
}