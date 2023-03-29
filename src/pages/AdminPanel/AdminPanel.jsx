import React from 'react'
import './adminpanel.css'
import TableRole from '../../components/TableRole/TableRole'
import { Link as Anchor } from 'react-router-dom'

export default function AdminPanel() {
    let user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
        {
            user?.admin ? <div className='contenedor-adminpanel'>
            <div id='profileBackground'>
                <h1>Panel</h1>
            </div>
            <div className='sectionAdminPanel'>
                <div>
                    <h1 className='title-adminPanel'>Entities</h1>
                </div>
                <div>
                    <TableRole />
                </div>
            </div>
        </div> : <div className='noLogged'><Anchor to='/'>You are not an admin</Anchor></div>
        }
        </>

    )
}