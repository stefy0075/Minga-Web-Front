import React from 'react'
import './authForm.css'
import { useState } from 'react'
import Register from '../register/register'
import Login from '../LogIn/LogIn'
import { useEffect } from 'react'
import { Link as Anchor } from 'react-router-dom'

export default function Auth1({state}) {
  const [render, setRender] = useState(false)
  let token = localStorage.getItem('token')

  useEffect(() => {
    setRender(state)
  },[state])

  function renderRegister(){
    handleRender('register')
  }

  function renderLogin(){
    handleRender('login')
  }

  function handleRender(btn){
    setRender(btn)
  }

  return (
    <>
    {
      token ? <div className='noLogged'><Anchor to='/'>Already Logged in</Anchor></div> :  <div className='auth'>
      { !render ? <Register renderLogin={renderLogin} /> : "" }
      { render === 'register' ? <Register renderLogin={renderLogin}/> : "" }
      { render === 'login' ? <Login renderRegister={renderRegister} /> : "" }
    </div>
    }
    </>
  )
}
