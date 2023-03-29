import React from 'react'
import './navBody.css'
import { useNavigate } from "react-router"
import { Link as Anchor } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import apiUrl from '../../url'

const User = {
    is_author: false,
    name: "",
    mail: "",
    photo: ""
}

export default function NavBody({handleRender}) {
    let token = localStorage.getItem('token')
    let headers = {headers:{'Authorization':`Bearer ${token}`}}
    let url = 'http://localhost:8080/api/auth/signout'
    const navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem('user')) ?? User
    
    async function handleLogout(){
        try{
            await axios.post(url,"",headers)
            Swal.fire("Logout Successful")
            localStorage.setItem('token', "")
            localStorage.setItem('user',JSON.stringify( User ))
            navigate("/", { replace: true });
            handleRender()
          }catch(error){
            Swal.fire(error)
        } 
    }

    return (
        <div className='navBody'>
            <Anchor to='/'>Home</Anchor>
            { token && user?.is_author ? <Anchor to='/profile'>Author Profile</Anchor> : ""}
            { token ? <Anchor to='/author-form'>New Author</Anchor> : "" }
            { token ? <Anchor to='/company-form'>New Company</Anchor> : "" }
            { token ? <Anchor to='/mangas/1'>Mangas</Anchor> : "" }
            { token ? <Anchor to='/mymangas/1'>My Mangas</Anchor> : "" }
            { token ? <Anchor to='/manga-form'>New Manga</Anchor> : "" }
            { token ? "" : <Anchor to='/register' onClick={handleRender}>Register</Anchor> }
            { token ? "" : <Anchor to='/signin' onClick={handleRender}>Login</Anchor> }
            {token ? <Anchor to='/new-role'>New Role</Anchor> : ''}
            { token ? <Anchor onClick={handleLogout}>Logout</Anchor>: "" }
        </div>
    )
}
