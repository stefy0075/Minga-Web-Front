import React from 'react'
import email from '../../images/@.svg'
import lock from '../../images/lock1.svg'
import RegisterFieldset from '../registerfieldset/registerfieldset'
import Input from '../input/input'
// import googleLogo from '../../images/Google.svg'
import { Link as Anchor } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import apiUrl from '../../url'
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router"

export default function LoginForm({ renderRegister }) {
  let dataForm = useRef()
  const navigate = useNavigate()

      async function handleCallbackResponse(response){
        let url = `${apiUrl}auth/google`
        const user = jwt_decode(response.credential)
        console.log(user)
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
        google.accounts.id.renderButton(document.getElementById('google'), {  theme: 'outline', size: 'large'} )
    },[])

  async function handleSubmit(e) {
    e.preventDefault()

    let formInputs = []

    Object.values(dataForm.current).forEach(e => {
      if (e.name) {
        formInputs.push(e)
      }
    })

    let data = {
      [formInputs[0].name]: formInputs[0].value,
      [formInputs[1].name]: formInputs[1].value,
    }

    let url = `${apiUrl}auth/signin`
    let admin
    try {
      await axios.post(url, data)
        .then(res => {
          res.data.user.is_admin ? (admin = true) : (admin = false)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify({
            id: res.data.user._id,
            name: res.data.user.name,
            last_name: res.data.user.last_name,
            mail: res.data.user.mail,
            photo: res.data.user.photo,
            admin,
            is_author: res.data.user.is_author
          }))
          setInterval(() => window.location.href = '/', 1000)
        })
      Swal.fire("Login Successful")
      dataForm.current.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit} ref={dataForm}>
      <RegisterFieldset legendText='Email' inputType='email' inputName='mail' inputId='mail' imgSrc={email} imgAlt='@' />
      <RegisterFieldset id='field-password' legendText='Password' inputType='password' inputName='password' inputId='password' imgSrc={lock} imgAlt='lock' />

      <Input className='sign-up' type='submit' value="Sign up" />

      <div id='google'></div>

      <p>You don't have an account yet? <Anchor onClick={renderRegister} className='link'>Sign Up</Anchor></p>

      <p>Go back to <Anchor to='/' className='link'>home page</Anchor></p>
    </form>
  )
}
