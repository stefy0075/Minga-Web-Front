import React from 'react'
import FormEdit from '../../components/FormEdit/FormEdit'
import { useDispatch, useSelector } from "react-redux"
import { Link as Anchor } from 'react-router-dom'


export default function EditChapter() {
    const dispatch = useDispatch()
    const authorStore = useSelector((store) => store.author)
    const author = authorStore.author
    return (
        <>
        {
            author?.active ? <div>
            <FormEdit />
        </div> : <div className='noLogged'>
                    <Anchor to='/auth'>Please Register/Login</Anchor>
                    <p>Or</p>
                    <Anchor to='/author-form'>Become an Author</Anchor>
                </div>
        }
        </>
)
}