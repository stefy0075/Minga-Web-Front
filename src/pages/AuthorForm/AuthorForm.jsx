import React from 'react'
import AuthorForm from '../../components/AuthorForm/authorform'
import { Link as Anchor } from 'react-router-dom'

function FormAuthor() {
  let token = localStorage.getItem('token')
  return (
    <>
    {
      token ? <AuthorForm/> : <div className='noLogged'>
      <Anchor to='/auth'>Please Register/Login</Anchor>
      <p>Or</p>
      <Anchor to='/author-form'>Become an Author</Anchor>
  </div>
    }
    </>
    
  )
}

export default FormAuthor
