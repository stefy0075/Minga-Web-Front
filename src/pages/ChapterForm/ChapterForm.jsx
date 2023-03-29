import React from "react";
import './chapterForm.css'
import Input from "../../components/input/input";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../url"
import { Link as Anchor } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

export default function ChaptherForm() {
    let dataForm = useRef()
    let {manga_id} = useParams()
    const authorStore = useSelector((store) => store.author)
    const author = authorStore.author
    const dispatch = useDispatch()   

    async function handleSubmit(e){
        e.preventDefault()

        let formInputs = []
        Object.values(dataForm.current).forEach(e => {
            if(e.name){
                formInputs.push(e.value)
            }
        })
        let data = {
            title : formInputs[0],
            order: formInputs[1],
            pages: formInputs[2].split(','),
            manga_id,
        }
        console.log(data)
        let url = `${apiUrl}chapters`
        let token = localStorage.getItem('token')
        let headers = {headers:{'Authorization':`Bearer ${token}`}}
        try{
            await axios.post(url,data,headers)
            alert('Chapther created')
            dataForm.current.reset()
          }catch(error){
            console.log(error)
            
            if (error.response.data === 'Unauthorized') {
                alert('You need to Login')
            }
            if(typeof error.response.data.message === 'string'){
                alert(error.response.data.message)
               }else{
                error.response.data.message.forEach(err => alert(err))
               }
          }
    }


    return(
        <>
        {
            author?.active ? <div id="chapterbox">
            <div id="chaptercontent">
                <section id="newchapter" >
                    <h2>New Chapter</h2>
                </section>
                <form id="chaptherform" ref={dataForm} onSubmit={handleSubmit}>
                    <Input className='chaptherinput' type='text' name='title' placeholder='Insert Title'/>
                    <Input className='chaptherinput' type='text' name='order' placeholder='Insert order'/>
                    <Input className='chaptherinput' type='text' name='pages' placeholder='Insert pages'/>
                    <Input id='send' type='submit' value='Send'/>
                </form>
            </div>
        </div> : <div className='noLogged'>
                    <Anchor to='/auth'>Please Register/Login</Anchor>
                    <p>Or</p>
                    <Anchor to='/author-form'>Become an Author</Anchor>
                </div>
        }
        </>
    )

}
