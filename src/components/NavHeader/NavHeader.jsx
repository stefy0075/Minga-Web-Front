import React from 'react'
import './navHeader.css'
import Goback from "../../images/goback.svg"
import axios from 'axios'
import { useEffect } from 'react'
import apiUrl from '../../url'
export default function NavHeader({handleRender}) {
    let token = localStorage.getItem('token')
    
    if(!token){
        localStorage.setItem('user',JSON.stringify({
            is_author: false,
            name: "",
            last_name: "",
            mail: "",
            photo: ""
        }))
    }
    
    let user = JSON.parse(localStorage.getItem('user'))
    let name = user.name
    let last_name = user.last_name
    let mail = user.mail
    let photo = user.photo

    useEffect(() => {
        let url = `${apiUrl}auth/token`
        if (token) {
            let headers = {headers:{'Authorization':`Bearer ${token}`}}
            axios.post(url,null,headers)
        }
    })
    return (
        <div className='navHeader'>
            {
                token ? <div className='picAndText'>
                        <img className='profilePic' src={photo} alt='profile' />
                        <div className='nameAndMail'>
                            <h2>{name} {last_name}</h2>
                            <p> {mail} </p>
                        </div>
                        </div>
                        : ""
            }
            <div onClick={handleRender} className='closeBtn'>
                <img src={Goback} alt="cierre" />
            </div>
        </div>
    )
}
