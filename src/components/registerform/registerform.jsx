/* eslint-disable no-unused-expressions */
import React from 'react'
import './registerform.css'
// import googleLogo from '../../images/Google.svg'
import RegisterFieldset from '../registerfieldset/registerfieldset'
import profile from '../../images/profile.svg'
import email from '../../images/@.svg'
import lock from '../../images/lock1.svg'
import Input from '../input/input'
import Camera from '../../images/camera.svg'
import { useRef, useEffect } from 'react'
import axios from 'axios'
import { Link as Anchor } from 'react-router-dom'
import { useNavigate } from "react-router"
import Swal from 'sweetalert2'
import apiUrl from '../../url'
import jwt_decode from 'jwt-decode'

export default function RegisterForm({renderLogin}) {
    let dataForm = useRef()
    const navigate = useNavigate()

    async function handleCallbackResponse(response){
        let url = `${apiUrl}auth/google`
        const user = jwt_decode(response.credential)
        const userData = {
            mail: user.email,
            name: user.given_name,
            last_name: user.family_name,
            photo: user.picture,
            password: user.sub
        }
        console.log(userData)
        try{ 
           const res = await axios.post(url, userData)
           console.log(res)
           localStorage.setItem('token', res.data.token)
           localStorage.setItem('user', JSON.stringify({
            id: res.data.user._id,
            name: res.data.user.name,
            last_name: res.data.user.last_name,
            mail: res.data.user.mail,
            photo: res.data.user.photo,
            is_author: res.data.user.is_author
          }))
            dataForm.current.reset()
            Swal.fire({
                title: 'Using Google Account Successful',
                icon: 'success'
            })
            navigate("/", { replace: true });
          }catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        //variable global de google
        /* global google */
        google.accounts.id.initialize({
            client_id: "630129650247-gkc9jouc4jgrg2sapdes4hucuc4jkp11.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(document.getElementById('google'), { theme: 'outline', size: 'large' } )
    },[]) 

    async function handleSubmit(e){
        e.preventDefault()

        let formInputs = []

        Object.values(dataForm.current).forEach(e => {
            if(e.name){
                formInputs.push(e)
            }
        })
        formInputs.pop()
        let data = {
            [formInputs[0].name]: formInputs[0].value,
            [formInputs[1].name]: formInputs[1].value,
            [formInputs[2].name]: formInputs[2].value,
            [formInputs[3].name]: formInputs[3].value
        }

        let url = `${apiUrl}auth/signup`
       
            try{
                await axios.post(url,data)
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'Please confirm your username using the link sent to your email.',
                    icon: 'success'
                })
                dataForm.current.reset()
                navigate("/", { replace: true });
              }catch (error) {
                if (typeof error.response.data.message === 'string') {
                    Swal.fire(error.response.data.message)
                } else {
                    error.response.data.message.forEach(err => Swal.fire(err))
                }
            }
        }

    return (
        <form className='form' id='form' onSubmit={handleSubmit} ref={dataForm}>
            <RegisterFieldset legendText='Name' inputType='text' inputName='name' inputId='name' imgSrc={profile} imgAlt='person' />
            <RegisterFieldset legendText='Email' inputType='email' inputName='mail' inputId='mail' imgSrc={email} imgAlt='@' />
            <RegisterFieldset legendText='Photo' inputType='photo' inputName='photo' inputId='photo' imgSrc={Camera} imgAlt='camera' />
            <RegisterFieldset legendText='Password' inputType='Password' inputName='password' inputId='password' imgSrc={lock} imgAlt='lock' />
            
            <fieldset className='notification-check'>
                <input type="checkbox" name='email-notification' id='email-notification' />
                <label htmlFor='email-notification'>Send notification to my email</label>
            </fieldset>

            <Input className='sign-up' type='submit' value="Sign up" />

            <div id='google'></div>

            <p>Already have an account? <Anchor onClick={renderLogin} className='link'>Log in</Anchor></p>
            <p>Go back to <Anchor to='/' className='link'>home page</Anchor></p> 
        </form>
    )
}
