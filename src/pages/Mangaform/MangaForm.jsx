import React from 'react'
import "./mangaform.css"
import FormManga from '../../components/Formmanga/FormManga'
import { Link as Anchor } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"



export default function MangaForm() {
  const dispatch = useDispatch()  
  const authorStore = useSelector((store) => store.author)
  const author = authorStore.author
  return (
    <>
    {
      author?.active ? <FormManga/> : <div className='noLogged'>
      <Anchor to='/auth'>Please Register/Login</Anchor>
      <p>Or</p>
      <Anchor to='/author-form'>Become an Author</Anchor>
    </div>
    }
    </>
  )
}
